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

export type UpdateVehiclesUseCaseInput = {
  id: string;
  dataToUpdate: {
    licensePlate?: string;
    chassis?: string;
    renavam?: string;
    vehicleModel?: string;
    vehicleBrand?: string;
    yearOfFabrication?: number;
  };
};

export type UpdateVehiclesUseCaseOutput = void;

@Injectable()
export class UpdateVehiclesUseCase
  implements UseCase<UpdateVehiclesUseCaseInput, UpdateVehiclesUseCaseOutput>
{
  constructor(
    @Inject(VEHICLE_REPOSITORY)
    private vehicleRepository: IVehicleRepository,
  ) {}

  async execute({
    id,
    dataToUpdate,
  }: UpdateVehiclesUseCaseInput): Promise<void> {
    const vehicleFound = await this.vehicleRepository.getVehicleById(id);

    if (!vehicleFound) {
      return generateErrorMessage(
        DefaultDatabaseErrorCode.DB_NOT_FOUND_SCHEMA,
        databaseDictionaryErrors,
      );
    }

    const vehicleWithFieldsUpdated = await this.updateFields(
      vehicleFound,
      dataToUpdate,
    );

    await this.vehicleRepository.update(id, vehicleWithFieldsUpdated);
  }

  async updateFields(
    vehicleFound: VehicleEntity,
    dataToUpdate: UpdateVehiclesUseCaseInput['dataToUpdate'],
  ) {
    const {
      chassis,
      licensePlate,
      renavam,
      vehicleBrand,
      vehicleModel,
      yearOfFabrication,
    } = dataToUpdate;

    vehicleFound.changeAllFields({
      chassis: chassis || vehicleFound.chassis,
      licensePlate: licensePlate || vehicleFound.licensePlate,
      renavam: renavam || vehicleFound.renavam,
      vehicleBrand: vehicleBrand || vehicleFound.vehicleBrand,
      vehicleModel: vehicleModel || vehicleFound.vehicleModel,
      yearOfFabrication: yearOfFabrication || vehicleFound.yearOfFabrication,
    });

    return vehicleFound;
  }
}
