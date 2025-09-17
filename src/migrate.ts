import { NestFactory } from '@nestjs/core';
import { MigrationsModule } from './database/migrations.module';
import { getConnectionToken } from '@nestjs/sequelize';
import { migrator } from './@shared/database/sequelize/migrator';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(MigrationsModule, {
    logger: ['error'],
  });

  const sequelize = app.get(getConnectionToken());

  migrator(sequelize).runAsCLI();
}
bootstrap();
