import { VehicleRepositoryInMemory } from '../../../../test/mocks/vehicle.repository.in-memory';
import { makeVehicles } from '../../../../test/factories/make-vehicles';
import { GetVehiclesByIdUseCase } from '../get-vehicles-by-id.use-case';

describe('Get Vehicles By Id Use Case Unit Test', () => {
  let vehicleRepository: VehicleRepositoryInMemory;
  let sut: GetVehiclesByIdUseCase;

  beforeEach(() => {
    vehicleRepository = new VehicleRepositoryInMemory();
    sut = new GetVehiclesByIdUseCase(vehicleRepository);
  });

  it('should throw a error if vehicle not found', async () => {
    try {
      await sut.execute({ id: 'wrong_id' });
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

  it('should delete a vehicle success', async () => {
    const vehicle = makeVehicles();
    const vehicleId = vehicle.id;

    vehicleRepository.items = [vehicle];

    const getSpy = jest.spyOn(vehicleRepository, 'getVehicleById');

    const vehicleFound = await sut.execute({ id: vehicleId });

    expect(vehicleRepository.items).toHaveLength(1);
    expect(getSpy).toHaveBeenCalledWith(vehicleId);
    expect(vehicleFound.vehicle).toStrictEqual(vehicle);
  });
});
