import { VehicleRepositoryInMemory } from '../../../../test/mocks/vehicle.repository.in-memory';
import { DeleteVehiclesUseCase } from '../delete-vehicles.use-case';
import { makeVehicles } from '../../../../test/factories/make-vehicles';

describe('Delete Vehicles Use Case Unit Test', () => {
  let vehicleRepository: VehicleRepositoryInMemory;
  let sut: DeleteVehiclesUseCase;

  beforeEach(() => {
    vehicleRepository = new VehicleRepositoryInMemory();
    sut = new DeleteVehiclesUseCase(vehicleRepository);
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

    const deleteSpy = jest.spyOn(vehicleRepository, 'delete');

    await sut.execute({ id: vehicleId });

    expect(vehicleRepository.items).toHaveLength(0);
    expect(deleteSpy).toHaveBeenCalledWith(vehicleId);
  });
});
