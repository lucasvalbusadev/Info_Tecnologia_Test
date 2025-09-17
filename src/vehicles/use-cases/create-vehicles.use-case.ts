import { UseCase } from 'src/@shared/use-case/use-case';
import {
  VEHICLE_REPOSITORY,
  type IVehicleRepository,
} from '../domain/vehicle.repository';
import { VehicleEntity } from '../domain/vehicle.entity';
import { Inject, Injectable } from '@nestjs/common';

export type CreateVehiclesUseCaseInput = {
  licensePlate: string;
  chassis: string;
  renavam: string;
  vehicleModel: string;
  vehicleBrand: string;
  yearOfFabrication: number;
};

export type CreateVehiclesUseCaseOutput = void;

@Injectable()
export class CreateVehiclesUseCase
  implements UseCase<CreateVehiclesUseCaseInput, CreateVehiclesUseCaseOutput>
{
  constructor(
    @Inject(VEHICLE_REPOSITORY)
    private vehicleRepository: IVehicleRepository,
  ) {}

  async execute({
    chassis,
    licensePlate,
    renavam,
    vehicleBrand,
    vehicleModel,
    yearOfFabrication,
  }: CreateVehiclesUseCaseInput): Promise<void> {
    const vehicle = VehicleEntity.create({
      chassis,
      licensePlate,
      renavam,
      vehicleBrand,
      vehicleModel,
      yearOfFabrication,
    });

    await this.vehicleRepository.create(vehicle);
  }
}
