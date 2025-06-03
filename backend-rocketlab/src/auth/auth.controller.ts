import { Controller, Request, Post, UseGuards, Get, Body, HttpCode, HttpStatus, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UsersService } from '../users/users.service';
import { LoginDto } from './dto/login.dto';
import { ResponseUserDto } from '../users/dto/response-user.dto';
import {
  ApiTags,
  ApiOperation,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiBadRequestResponse,
  ApiUnauthorizedResponse,
  ApiConflictResponse,
  ApiBearerAuth,
  ApiBody,
} from '@nestjs/swagger';
import { LoginResponseDto } from './dto/login-response.dto'; // Importar DTO de resposta do login
import { ErrorResponseDto } from '../common/dto/error-response.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
  ) {}

  @Post('register')
  @ApiOperation({ summary: 'Registra um novo usuário.', description: 'Cria uma nova conta de usuário no sistema.' })
  @ApiCreatedResponse({ description: 'Usuário registrado com sucesso.', type: ResponseUserDto })
  @ApiBadRequestResponse({ description: 'Dados inválidos para registro.', type: ErrorResponseDto })
  @ApiConflictResponse({ description: 'Já existe um usuário com o e-mail fornecido.', type: ErrorResponseDto })
  @ApiBody({ type: CreateUserDto,
    examples: {
        valid: {
            summary: 'Exemplo de payload válido para registro',
            value: { name: 'Ana Paula', email: 'ana.paula@example.com', password: 'passwordSegura123' } as CreateUserDto
        }
    }
  })
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true, transform: true }))
  async register(@Body() createUserDto: CreateUserDto): Promise<ResponseUserDto> {
    return this.usersService.create(createUserDto);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Autentica um usuário.', description: 'Realiza o login do usuário e retorna um token JWT.' })
  @ApiBody({ type: LoginDto,
     examples: {
        valid: {
            summary: 'Exemplo de credenciais válidas',
            value: { email: 'ana.paula@example.com', password: 'passwordSegura123' } as LoginDto
        },
        invalid: {
            summary: 'Exemplo de credenciais inválidas (para ilustrar o payload)',
            value: { email: 'usuario.inexistente@example.com', password: 'senhaErrada' } as LoginDto
        }
     }
  })
  @ApiOkResponse({ description: 'Login bem-sucedido.', type: LoginResponseDto })
  @ApiUnauthorizedResponse({ description: 'Credenciais inválidas.', type: ErrorResponseDto })
  @ApiBadRequestResponse({ description: 'Dados de login inválidos (formato).', type: ErrorResponseDto })
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true, transform: true }))
  async login(@Request() req: { user: Omit<any, 'password'> }, @Body() loginDto: LoginDto): Promise<LoginResponseDto> {
    // req.user é populado pela LocalStrategy
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Obtém o perfil do usuário logado.', description: 'Retorna os dados do usuário autenticado via token JWT.' })
  @ApiOkResponse({ description: 'Perfil do usuário retornado com sucesso.', type: ResponseUserDto })
  @ApiUnauthorizedResponse({ description: 'Não autorizado (token inválido ou ausente).', type: ErrorResponseDto })
  async getProfile(@Request() req: { user: ResponseUserDto }): Promise<ResponseUserDto> {
    return this.authService.getProfile(req.user);
  }
}