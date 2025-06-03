import { ApiProperty } from '@nestjs/swagger';

export class ResponseUserDto {
  /**
   * Identificador único do usuário
   * @example 1
   */
  id: number;
  /**
   * Nome do usuário
   * @example "João da Silva"
   */
  name: string;
  /**
   * Email do usuário
   * @example "joao@email.com"
   */
  email: string;
  /**
   * Data de criação
   * @example "2024-06-01T12:00:00.000Z"
   */
  createdAt: Date;
  /**
   * Data de atualização
   * @example "2024-06-01T12:00:00.000Z"
   */
  updatedAt: Date;

  constructor(partial: Partial<ResponseUserDto>) {
    Object.assign(this, partial);
  }
}
