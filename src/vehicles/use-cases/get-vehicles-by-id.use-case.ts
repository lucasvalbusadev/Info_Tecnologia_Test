import { UseCase } from '../../@shared/use-case/use-case';
import {
  VEHICLE_REPOSITORY,
  type IVehicleRepository,
} from '../domain/vehicle.repository';
import { generateErrorMessage } from '../../@shared/errors/handlers/generate-error';
import {
  databaseDictionaryErrors,
  DefaultDatabaseErrorCode,
} from '../../@shared/errors/dictionaries/dictionary-database-error';
import { VehicleEntity } from '../domain/vehicle.entity';
import { Inject, Injectable } from '@nestjs/common';

export type GetVehiclesByIdUseCaseInput = {
  id: string;
};

export type GetVehiclesByIdUseCaseOutput = {
  vehicle: VehicleEntity;
};

@Injectable()
export class GetVehiclesByIdUseCase
  implements UseCase<GetVehiclesByIdUseCaseInput, GetVehiclesByIdUseCaseOutput>
{
  constructor(
    @Inject(VEHICLE_REPOSITORY)
    private vehicleRepository: IVehicleRepository,
  ) {}

  async execute({
    id,
  }: GetVehiclesByIdUseCaseInput): Promise<GetVehiclesByIdUseCaseOutput> {
    const vehicleFound = await this.vehicleRepository.getVehicleById(id);

    if (!vehicleFound) {
      return generateErrorMessage(
        DefaultDatabaseErrorCode.DB_NOT_FOUND_SCHEMA,
        databaseDictionaryErrors,
      );
    }

    return {
      vehicle: vehicleFound,
    };
  }
}
