import { UseCase } from 'src/@shared/use-case/use-case';
import {
  VEHICLE_REPOSITORY,
  type IVehicleRepository,
} from '../domain/vehicle.repository';
import { VehicleEntity } from '../domain/vehicle.entity';
import { Inject, Injectable } from '@nestjs/common';

export type SearchVehiclesUseCaseInput = {
  licensePlate?: string;
  chassis?: string;
  renavam?: string;
  vehicleModel?: string;
  vehicleBrand?: string;
  yearOfFabrication?: number;
  limit?: number;
  page?: number;
};

export type SearchVehiclesUseCaseOutput = {
  vehicles: VehicleEntity[];
};

@Injectable()
export class SearchVehiclesUseCase
  implements UseCase<SearchVehiclesUseCaseInput, SearchVehiclesUseCaseOutput>
{
  private readonly DEFAULT_LIMIT = 10;
  private readonly DEFAULT_PAGE = 1;
  constructor(
    @Inject(VEHICLE_REPOSITORY)
    private vehicleRepository: IVehicleRepository,
  ) {}

  async execute({
    chassis,
    licensePlate,
    limit,
    page,
    renavam,
    vehicleBrand,
    vehicleModel,
    yearOfFabrication,
  }: SearchVehiclesUseCaseInput): Promise<SearchVehiclesUseCaseOutput> {
    const vehicles = await this.vehicleRepository.searchManyVehicle({
      chassis,
      licensePlate,
      limit: limit || this.DEFAULT_LIMIT,
      page: page || this.DEFAULT_PAGE,
      renavam,
      vehicleBrand,
      vehicleModel,
      yearOfFabrication,
    });

    return {
      vehicles,
    };
  }
}
