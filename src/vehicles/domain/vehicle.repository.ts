import { VehicleEntity } from './vehicle.entity';

export type SearchManyVehicleProps = {
  licensePlate?: string;
  chassis?: string;
  renavam?: string;
  vehicleModel?: string;
  vehicleBrand?: string;
  yearOfFabrication?: number;
  limit: number;
  page: number;
};

export interface IVehicleRepository {
  create(data: VehicleEntity): Promise<void>;
  update(id: string, data: VehicleEntity): Promise<void>;
  delete(id: string): Promise<void>;
  getVehicleById(id: string): Promise<VehicleEntity | null>;
  searchManyVehicle(
    searchProps: SearchManyVehicleProps,
  ): Promise<VehicleEntity[]>;
}

export const VEHICLE_REPOSITORY = 'VEHICLE_REPOSITORY';
