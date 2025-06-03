import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe, ParseIntPipe, UseGuards, HttpCode, HttpStatus } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ResponseUserDto } from './dto/response-user.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import {
  ApiTags,
  ApiOperation,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiConflictResponse,
  ApiBearerAuth,
  ApiParam,
  ApiBody,
  ApiNoContentResponse,
} from '@nestjs/swagger';
import { ErrorResponseDto } from '../common/dto/error-response.dto'; // Importar DTO de erro

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({ summary: 'Cria um novo usuário.', description: 'Registra um novo usuário no sistema. O e-mail deve ser único.' })
  @ApiCreatedResponse({ description: 'Usuário criado com sucesso.', type: ResponseUserDto })
  @ApiBadRequestResponse({ description: 'Dados inválidos para criação do usuário.', type: ErrorResponseDto })
  @ApiConflictResponse({ description: 'Já existe um usuário com o e-mail fornecido.', type: ErrorResponseDto })
  @ApiBody({ type: CreateUserDto,
    examples: {
        valid: {
            summary: 'Exemplo de payload válido',
            value: { name: 'Carlos Alberto', email: 'carlos.alberto@example.com', password: 'password123' } as CreateUserDto
        }
    }
  })
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true, transform: true }))
  async create(@Body() createUserDto: CreateUserDto): Promise<ResponseUserDto> {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @ApiBearerAuth() // Indica que esta rota requer autenticação JWT
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Lista todos os usuários.', description: 'Retorna uma lista de todos os usuários cadastrados. Requer autenticação.' })
  @ApiOkResponse({ description: 'Lista de usuários retornada com sucesso.', type: [ResponseUserDto] })
  @ApiBadRequestResponse({ description: 'Requisição inválida.', type: ErrorResponseDto })
  async findAll(): Promise<ResponseUserDto[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Busca um usuário pelo ID.', description: 'Retorna os detalhes de um usuário específico. Requer autenticação.' })
  @ApiParam({ name: 'id', description: 'ID do usuário (number)', type: 'number', example: 1 })
  @ApiOkResponse({ description: 'Usuário encontrado.', type: ResponseUserDto })
  @ApiNotFoundResponse({ description: 'Usuário não encontrado.', type: ErrorResponseDto })
  @ApiBadRequestResponse({ description: 'ID inválido.', type: ErrorResponseDto })
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<ResponseUserDto> {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Atualiza um usuário existente.', description: 'Atualiza parcialmente os dados de um usuário. Requer autenticação.' })
  @ApiParam({ name: 'id', description: 'ID do usuário a ser atualizado (number)', type: 'number', example: 1 })
  @ApiBody({ type: UpdateUserDto,
    examples: {
        updateName: {
            summary: 'Exemplo atualizando nome',
            value: { name: 'Carlos Alberto Nobrega' } as UpdateUserDto
        },
        updateEmail: {
            summary: 'Exemplo atualizando email',
            value: { email: 'carlos.nobrega@example.com' } as UpdateUserDto
        }
    }
  })
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateUserDto: UpdateUserDto): Promise<ResponseUserDto> {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Remove um usuário.', description: 'Remove um usuário do sistema. Requer autenticação.' })
  @ApiParam({ name: 'id', description: 'ID do usuário a ser removido (number)', type: 'number', example: 1 })
  @ApiNoContentResponse({ description: 'Usuário removido com sucesso.' })
  @ApiNotFoundResponse({ description: 'Usuário não encontrado.', type: ErrorResponseDto })
  @ApiBadRequestResponse({ description: 'ID inválido.', type: ErrorResponseDto })
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.usersService.remove(id);
  }
}