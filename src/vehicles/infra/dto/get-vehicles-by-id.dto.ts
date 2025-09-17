import { VehicleEntity } from '../../../vehicles/domain/vehicle.entity';

export type GetVehiclesByIdInputDTO = {
  id: string;
};

export type GetVehiclesByIdOutputDTO = {
  vehicle: VehicleEntity;
};
