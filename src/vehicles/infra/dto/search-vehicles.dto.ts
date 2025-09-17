import { VehicleEntity } from '../../../vehicles/domain/vehicle.entity';

export type SearchVehiclesInputDTO = {
  licensePlate: string;
  chassis: string;
  renavam: string;
  vehicleModel: string;
  vehicleBrand: string;
  yearOfFabrication: string;
  limit: string;
  page: string;
};

export type SearchVehiclesOutputDTO = {
  vehicles: VehicleEntity[];
};
