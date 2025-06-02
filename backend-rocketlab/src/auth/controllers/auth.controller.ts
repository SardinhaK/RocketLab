import { Controller, Request, Post, UseGuards, Get, Body, HttpCode, HttpStatus, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { LocalAuthGuard } from '../guards/local-auth.guard'; // Será criado depois
import { JwtAuthGuard } from '../guards/jwt-auth.guard'; // Será criado depois
import { CreateUserDto } from '../../users/dto/create-user.dto';
import { UsersService } from '../../users/users.service';
import { LoginDto } from '../dto/login.dto';
import { ResponseUserDto } from '../../users/dto/response-user.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService, // Para o endpoint de registro
  ) {}

  @Post('register')
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true, transform: true }))
  async register(@Body() createUserDto: CreateUserDto): Promise<ResponseUserDto> {
    // Este método pode ser movido para UsersController se preferir,
    // mas muitas vezes o registro é considerado parte do fluxo de autenticação.
    return this.usersService.create(createUserDto);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @HttpCode(HttpStatus.OK)
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true, transform: true }))
  // O corpo da requisição será validado pelo LoginDto, mas o LocalAuthGuard usa 'email' e 'password' diretamente.
  // O DTO aqui é mais para documentação e validação se o guard não estivesse presente.
  async login(@Request() req: { user: any }, @Body() loginDto: LoginDto): Promise<{ access_token: string; user: ResponseUserDto }> {
    // req.user é populado pela LocalStrategy após a validação bem-sucedida
    // A LocalStrategy já retornou o usuário sem a senha.
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Request() req: { user: any }): Promise<ResponseUserDto> {
    // req.user é populado pela JwtStrategy
    // A JwtStrategy já retorna um ResponseUserDto (usuário sem senha)
    return req.user as ResponseUserDto; // Apenas para garantir a tipagem, já deve ser ResponseUserDto
  }
}