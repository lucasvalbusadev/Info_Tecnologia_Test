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
import { Inject, Injectable } from '@nestjs/common';

export type DeleteVehiclesUseCaseInput = {
  id: string;
};

export type DeleteVehiclesUseCaseOutput = void;

@Injectable()
export class DeleteVehiclesUseCase
  implements UseCase<DeleteVehiclesUseCaseInput, DeleteVehiclesUseCaseOutput>
{
  constructor(
    @Inject(VEHICLE_REPOSITORY)
    private vehicleRepository: IVehicleRepository,
  ) {}

  async execute({ id }: DeleteVehiclesUseCaseInput): Promise<void> {
    const vehicleFound = await this.vehicleRepository.getVehicleById(id);

    if (!vehicleFound) {
      return generateErrorMessage(
        DefaultDatabaseErrorCode.DB_NOT_FOUND_SCHEMA,
        databaseDictionaryErrors,
      );
    }

    await this.vehicleRepository.delete(id);
  }
}
