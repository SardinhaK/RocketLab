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

# Sistema de Compras Online - RocketLab

Este projeto é uma API backend desenvolvida com NestJS, TypeScript e Prisma ORM, utilizando SQLite como banco de dados. O sistema permite gerenciar produtos, adicionar/remover itens em um carrinho virtual e finalizar compras.

## Funcionalidades
- CRUD de produtos (criar, listar, buscar, atualizar, remover)
- Carrinho de compras (adicionar, remover, atualizar itens, limpar carrinho)
- Finalização de compra (checkout)
- Documentação automática via Swagger

## Tecnologias Utilizadas
- [NestJS](https://nestjs.com/)
- [Prisma ORM](https://www.prisma.io/)
- [SQLite](https://www.sqlite.org/)
- [TypeScript](https://www.typescriptlang.org/)

## Como executar o projeto

### 1. Instale as dependências

```powershell
pnpm install
```

ou

```powershell
npm install
```

### 2. Rode as migrations do banco de dados

```powershell
npx prisma migrate dev --name init
```

### 3. Inicie a aplicação

```powershell
pnpm start:dev
```

ou

```powershell
npm run start:dev
```

A API estará disponível em: http://localhost:3000

### 4. Acesse a documentação Swagger

Abra no navegador:

```
http://localhost:3000/api
```

Você pode testar todos os endpoints diretamente pela interface Swagger.

## Exemplos de uso (via cURL)

### Produtos

**Criar produto:**
```sh
curl -X POST http://localhost:3000/products -H "Content-Type: application/json" -d "{\"name\":\"Notebook\",\"description\":\"Dell Inspiron\",\"price\":3500,\"stock\":10}"
```

**Listar produtos:**
```sh
curl http://localhost:3000/products
```

**Buscar produto por ID:**
```sh
curl http://localhost:3000/products/1
```

**Atualizar produto:**
```sh
curl -X PATCH http://localhost:3000/products/1 -H "Content-Type: application/json" -d "{\"price\":3200}"
```

**Remover produto:**
```sh
curl -X DELETE http://localhost:3000/products/1
```

### Carrinho

**Adicionar item ao carrinho:**
```sh
curl -X POST http://localhost:3000/cart/1/add -H "Content-Type: application/json" -d "{\"productId\":1,\"quantity\":2}"
```

**Ver carrinho:**
```sh
curl http://localhost:3000/cart/1
```

**Atualizar quantidade de item:**
```sh
curl -X PATCH http://localhost:3000/cart/1/item/1 -H "Content-Type: application/json" -d "{\"quantity\":3}"
```

**Remover item do carrinho:**
```sh
curl -X DELETE http://localhost:3000/cart/1/item/1
```

**Limpar carrinho:**
```sh
curl -X DELETE http://localhost:3000/cart/1/clear
```

**Finalizar compra:**
```sh
curl -X POST http://localhost:3000/cart/1/checkout
```

---

## Observações
- O `cartId` pode ser qualquer número inteiro. Se não existir, será criado automaticamente ao adicionar o primeiro item.
- Utilize o Swagger para explorar e testar todos os endpoints facilmente.

---

RocketLab - 2025
