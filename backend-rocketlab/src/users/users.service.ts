import { Injectable, NotFoundException, ConflictException, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ResponseUserDto } from './dto/response-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto): Promise<ResponseUserDto> {
    try {
      const existingUser = await this.prisma.user.findUnique({ where: { email: createUserDto.email } });
      if (existingUser) {
        throw new ConflictException('Já existe um usuário com este email.');
      }
      // A senha deve ser hasheada antes de salvar (implemente se necessário)
      const user = await this.prisma.user.create({ data: createUserDto });
      const { password, ...result } = user;
      return new ResponseUserDto(result);
    } catch (error) {
      if (error instanceof ConflictException) {
        throw error;
      }
      throw new InternalServerErrorException('Erro ao criar usuário.');
    }
  }

  async findAll(): Promise<ResponseUserDto[]> {
    const users = await this.prisma.user.findMany();
    return users.map(({ password, ...result }) => new ResponseUserDto(result));
  }

  async findOne(id: number): Promise<any | null> {
    return this.prisma.user.findUnique({ where: { id } });
  }

  async findOneByEmail(email: string): Promise<any | undefined> {
    return this.prisma.user.findUnique({ where: { email } });
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<ResponseUserDto> {
    try {
      const user = await this.prisma.user.update({
        where: { id },
        data: updateUserDto,
      });
      const { password, ...result } = user;
      return new ResponseUserDto(result);
    } catch (error) {
      if (error.code === 'P2002') {
        throw new ConflictException('O email fornecido já está em uso por outro usuário.');
      }
      if (error.code === 'P2025') {
        throw new NotFoundException(`Usuário com ID "${id}" não encontrado.`);
      }
      throw new InternalServerErrorException('Erro ao atualizar usuário.');
    }
  }

  async remove(id: number): Promise<void> {
    try {
      await this.prisma.user.delete({ where: { id } });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException(`Usuário com ID "${id}" não encontrado.`);
      }
      throw new InternalServerErrorException('Erro ao remover usuário.');
    }
  }
}
