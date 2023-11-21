import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  const config = new DocumentBuilder()
    .setTitle('BullHub')
    .setDescription('The Economics Community Platform')
    .setVersion('1.0')
    .addTag('/')
    .addTag('admin')
    .addTag('auth')
    .addTag('boards')
    .addTag('chat')
    .addTag('users')
    .setBasePath('15.164.233.146')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(4000);
}
bootstrap();
