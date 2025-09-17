import {
  VehicleEntity,
  VehicleId,
} from '../../../vehicles/domain/vehicle.entity';
import { VehicleModel } from './vehicle.model';

export class VehicleMapper {
  static toDomain(model: VehicleModel): VehicleEntity {
    return VehicleEntity.create(
      {
        chassis: model.chassis,
        licensePlate: model.licensePlate,
        renavam: model.renavam,
        vehicleBrand: model.vehicleBrand,
        vehicleModel: model.vehicleModel,
        yearOfFabrication: model.yearOfFabrication,
      },
      new VehicleId(model.id),
    );
  }

  static toModel(entity: VehicleEntity): VehicleModel {
    return VehicleModel.build({
      id: entity.id,
      chassis: entity.chassis,
      licensePlate: entity.licensePlate,
      renavam: entity.renavam,
      vehicleBrand: entity.vehicleBrand,
      vehicleModel: entity.vehicleModel,
      yearOfFabrication: entity.yearOfFabrication,
    });
  }
}
