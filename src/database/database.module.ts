import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { Dialect } from 'sequelize';

import { EnvService } from '../env/env.service';
import { VehicleModel } from '../vehicles/infra/repositories/vehicle.model';

const models = [VehicleModel];

@Module({
  imports: [
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: EnvService) => {
        return {
          autoLoadModels: false,
          dialect: 'postgres' as Dialect,
          host: configService.get('DB_HOST'),
          database: configService.get('DB_NAME'),
          username: configService.get('DB_USER'),
          password: configService.get('DB_PASSWORD'),
          port: 5433,
          models,
        };
      },
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
