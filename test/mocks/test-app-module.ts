import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { VehicleModule } from '../../src/vehicles/vehicles.module';
import { VehicleModel } from '../../src/vehicles/infra/repositories/vehicle.model';

@Module({
  imports: [
    SequelizeModule.forRootAsync({
      useFactory: () => ({
        dialect: 'postgres',
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT),
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        autoLoadModels: true,
        synchronize: true,
        logging: false,
        models: [VehicleModel],
      }),
    }),
    VehicleModule,
  ],
})
export class TestAppModule {}
