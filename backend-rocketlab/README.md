<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

# Shopping Cart Backend - RocketLab

Um sistema de backend para um carrinho de compras online, desenvolvido com NestJS, TypeScript, Prisma e SQLite. Permite gerenciar usuários, produtos, carrinhos e pedidos, oferecendo endpoints REST documentados via Swagger.

## 🚀 Tecnologias Utilizadas
- **Framework:** NestJS
- **Linguagem:** TypeScript
- **ORM:** Prisma
- **Banco de Dados:** SQLite (arquivo local)
- **Documentação de API:** Swagger (via @nestjs/swagger)
- **Validação de DTOs:** class-validator e class-transformer
- **Gerenciador de Pacotes:** pnpm
- **Seed de dados iniciais:** script TypeScript em `prisma/seed.ts`

## Como Rodar o Projeto

### 1. Clonar o repositório

```powershell
git clone https://github.com/SardinhaK/RocketLab
cd Rocketlab/backend-rocketlab
```

### 2. Criar arquivo de ambiente

Copie o arquivo de exemplo e ajuste se necessário:
```powershell
cp .env.example .env
```
No `.env`, defina a variável de conexão:
```
DATABASE_URL="file:./dev.db"
```

### 3. Executar o setup do projeto

```powershell
pnpm install
npx prisma generate
npx prisma db seed
```
Isso irá rodar o seed e popular o banco com usuários, produtos, carrinhos e pedidos de exemplo.

### 4. Iniciar a aplicação

```powershell
pnpm run start:dev
```
O servidor ficará disponível em http://localhost:3000/api-docs.

### 5. Acessar a documentação no Swagger
Abra no navegador:
```
http://localhost:3000/api-docs
```
A partir daí, você pode testar todos os endpoints de usuários, produtos, carrinho e pedidos.

---

## Funcionalidades
- CRUD de produtos (criar, listar, buscar, atualizar, remover)
- CRUD de usuários
- Carrinho de compras (adicionar, remover, atualizar itens, limpar carrinho)
- Finalização de compra (checkout)
- Autenticação de usuários (JWT)
- Documentação automática via Swagger
- Seed de dados para testes rápidos

---

RocketLab - 2025
