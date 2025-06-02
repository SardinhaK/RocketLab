export class ResponseUserDto {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(partial: Partial<ResponseUserDto>) {
    Object.assign(this, partial);
  }
}
