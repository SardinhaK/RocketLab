import { Injectable, NotFoundException, ConflictException, InternalServerErrorException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ResponseUserDto } from './dto/response-user.dto';

const prisma = new PrismaClient();

@Injectable()
export class UsersService {
  async create(createUserDto: CreateUserDto): Promise<ResponseUserDto> {
    try {
      const existingUser = await prisma.user.findUnique({ where: { email: createUserDto.email } });
      if (existingUser) {
        throw new ConflictException('Já existe um usuário com este email.');
      }
      // A senha será hasheada pelo hook @BeforeInsert na entidade User
      const user = await prisma.user.create({ data: createUserDto });
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user; // Exclui a senha da resposta
      return new ResponseUserDto(result);
    } catch (error) {
      if (error instanceof ConflictException) {
        throw error;
      }
      throw new InternalServerErrorException('Erro ao criar usuário.');
    }
  }

  async findAll(): Promise<ResponseUserDto[]> {
    const users = await prisma.user.findMany();
    return users.map(user => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password, ...result } = user;
        return new ResponseUserDto(result);
    });
  }

  async findOne(id: string): Promise<ResponseUserDto> {
    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) {
      throw new NotFoundException(`Usuário com ID "${id}" não encontrado.`);
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...result } = user;
    return new ResponseUserDto(result);
  }

  async findOneByEmail(email: string): Promise<User | undefined> {
    // Este método retorna a entidade User completa, incluindo a senha (necessário para login)
    // Cuidado ao expor este método diretamente em um controller sem proteção adequada
    return prisma.user.findUnique({ where: { email }, select: { id: true, name: true, email: true, password: true, createdAt: true, updatedAt: true } });
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<ResponseUserDto> {
    const user = await prisma.user.update({
      where: { id },
      data: updateUserDto,
    });

    if (!user) {
      throw new NotFoundException(`Usuário com ID "${id}" não encontrado.`);
    }

    // Se uma nova senha for fornecida, ela será hasheada pelo hook @BeforeUpdate
    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      return new ResponseUserDto(result);
    } catch (error) {
        // Tratamento de erro para violação de constraint unique (ex: email duplicado)
        if (error.code === 'P2002') { // Código para violação de unique constraint no Prisma
            throw new ConflictException('O email fornecido já está em uso por outro usuário.');
        }
      throw new InternalServerErrorException('Erro ao atualizar usuário.');
    }
  }

  async remove(id: string): Promise<void> {
    const result = await prisma.user.deleteMany({ where: { id } });
    if (result.count === 0) {
      throw new NotFoundException(`Usuário com ID "${id}" não encontrado.`);
    }
  }
}
