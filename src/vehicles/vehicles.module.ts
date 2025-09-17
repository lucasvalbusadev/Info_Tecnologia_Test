import { Module } from '@nestjs/common';
import { vehiclesController } from './infra/vehicles.controller';
import { VEHICLE_REPOSITORY } from './domain/vehicle.repository';
import { VehicleRepository } from './infra/repositories/vehicle.repository';
import {
  VEHICLE_MODEL,
  VehicleModel,
} from './infra/repositories/vehicle.model';
import { CreateVehiclesUseCase } from './use-cases/create-vehicles.use-case';
import { DeleteVehiclesUseCase } from './use-cases/delete-vehicles.use-case';
import { GetVehiclesByIdUseCase } from './use-cases/get-vehicles-by-id.use-case';
import { UpdateVehiclesUseCase } from './use-cases/update-vehicles.use-case';
import { SearchVehiclesUseCase } from './use-cases/search-vehicles.use-case';

@Module({
  controllers: [vehiclesController],
  providers: [
    CreateVehiclesUseCase,
    DeleteVehiclesUseCase,
    GetVehiclesByIdUseCase,
    UpdateVehiclesUseCase,
    SearchVehiclesUseCase,
    {
      provide: VEHICLE_REPOSITORY,
      useClass: VehicleRepository,
    },
    {
      provide: VEHICLE_MODEL,
      useValue: VehicleModel,
    },
  ],
})
export class VehicleModule {}
