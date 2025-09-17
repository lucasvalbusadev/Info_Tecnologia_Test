import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { envSchema } from './env/env';
import { DatabaseModule } from './database/database.module';
import { VehicleModule } from './vehicles/vehicles.module';

const ENV = process.env.NODE_ENV;

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: !ENV || ENV === 'production' ? '.env' : `.env.${ENV}`,
      validate: (env) => envSchema.parse(env),
      isGlobal: true,
    }),
    DatabaseModule,
    VehicleModule,
  ],
  providers: [],
})
export class AppModule {}
