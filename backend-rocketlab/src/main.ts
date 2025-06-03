// src/main.ts (VERIFIQUE/ATUALIZE AS TAGS E ADD BEARER AUTH)
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { useContainer } from 'class-validator';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  const config = new DocumentBuilder()
    .setTitle('RocketLab API')
    .setDescription('API para o sistema de compras online RocketLab. Permite gerenciar produtos, carrinhos de compra e usuários.')
    .setVersion('1.0.0')
    .addTag('auth', 'Operações de Autenticação e Registro de Usuários')
    .addTag('users', 'Operações CRUD para Usuários (Requer Autenticação para a maioria das rotas)')
    .addTag('products', 'Operações CRUD para Produtos (Rotas de escrita podem requerer autenticação de admin)')
    .addTag('cart', 'Operações do Carrinho de Compras (Requer Autenticação de Usuário)')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Insira o token JWT',
        in: 'header',
      },
      'access-token',
    )
    .build();

  const document = SwaggerModule.createDocument(app, config, {
    // extraModels: [],
  });

  SwaggerModule.setup('api-docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
      docExpansion: 'list',
      filter: true,
      showRequestDuration: true,
    },
    customSiteTitle: 'RocketLab API Docs',
  });

  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`Application is running on: ${await app.getUrl()}/api-docs`);
}
bootstrap();