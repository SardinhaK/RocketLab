export const jwtConstants = {
  secret: process.env.JWT_SECRET || 'SUA_CHAVE_SECRETA_SUPER_FORTE_AQUI', // Mude isso e use .env!
  expiresIn: process.env.JWT_EXPIRES_IN || '3600s', // Tempo de expiração do token
};
