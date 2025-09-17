import { VehicleRepositoryInMemory } from '../../../../test/mocks/vehicle.repository.in-memory';
import { makeVehicles } from '../../../../test/factories/make-vehicles';
import { UpdateVehiclesUseCase } from '../update-vehicles.use-case';

describe('Update Vehicle Use Case Unit Tests', () => {
  let vehicleRepository: VehicleRepositoryInMemory;
  let sut: UpdateVehiclesUseCase;

  beforeEach(() => {
    vehicleRepository = new VehicleRepositoryInMemory();
    sut = new UpdateVehiclesUseCase(vehicleRepository);
  });

  it('should throw a error if vehicle not found', async () => {
    try {
      await sut.execute({ id: 'wrong_id', dataToUpdate: {} });
    } catch (error) {
      expect(error.errorObject).toStrictEqual({
        action: 'Check the data or id provided',
        children: [],
        code: 'FLEET-MANAGER-00010',
        detail: 'The schema requested was not found.',
        meta: {
          reason: 'The schema requested was not found.',
        },
        resolution: undefined,
        source: {
          path: '',
        },
        status: '404',
        statusCode: 404,
        title: 'Schema not found',
      });
    }
  });

  it('should be able update a vehicle information success', async () => {
    const vehicle = makeVehicles();

    vehicleRepository.items = [vehicle];

    await sut.execute({
      id: vehicle.id,
      dataToUpdate: {
        chassis: 'new_chassis',
        licensePlate: 'new_licensePlate',
        renavam: 'new_renavam',
        vehicleBrand: 'new_vehicleBrand',
        vehicleModel: 'vehicle_model',
        yearOfFabrication: 2025,
      },
    });

    expect(vehicleRepository.items).toHaveLength(1);
    expect(vehicleRepository.items[0].toJSON()).toStrictEqual({
      id: vehicle.id,
      chassis: 'new_chassis',
      licensePlate: 'new_licensePlate',
      renavam: 'new_renavam',
      vehicleBrand: 'new_vehicleBrand',
      vehicleModel: 'vehicle_model',
      yearOfFabrication: 2025,
    });
  });
});
