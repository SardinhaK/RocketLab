export interface JwtPayload {
  /**
   * ID do usuário (sub = subject)
   * @example 1
   */
  sub: number;
  /**
   * Email do usuário
   * @example "joao@email.com"
   */
  email: string;
}
