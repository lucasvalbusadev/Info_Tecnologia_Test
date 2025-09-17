import {
  VehicleEntity,
  VehicleEntityProps,
  VehicleId,
} from '../../src/vehicles/domain/vehicle.entity';
import { faker } from '@faker-js/faker';

export function makeVehicles(
  override?: Partial<VehicleEntityProps>,
  id?: VehicleId,
) {
  return VehicleEntity.create(
    {
      chassis: faker.lorem.word(),
      licensePlate: faker.lorem.word(),
      renavam: faker.lorem.word(),
      vehicleBrand: faker.lorem.word(),
      vehicleModel: faker.lorem.word(),
      yearOfFabrication: faker.number.int({ min: 1, max: 100 }),
      ...override,
    },
    id,
  );
}
