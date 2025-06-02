import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const password = 'admin123'; // Troque para um hash seguro em produção
  await prisma.user.create({
    data: {
      email: 'admin@admin.com',
      password: password, // Em produção, use bcrypt para hashear
      name: 'Admin',
    },
  });
  console.log('Usuário admin criado!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
