import { VehicleRepositoryInMemory } from '../../../../test/mocks/vehicle.repository.in-memory';
import { CreateVehiclesUseCase } from '../create-vehicles.use-case';
import { makeVehicles } from '../../../../test/factories/make-vehicles';

describe('Create Vehicle Use Case Unit Test', () => {
  let vehicleRepository: VehicleRepositoryInMemory;
  let sut: CreateVehiclesUseCase;

  beforeEach(() => {
    vehicleRepository = new VehicleRepositoryInMemory();
    sut = new CreateVehiclesUseCase(vehicleRepository);
  });

  it('should be able to create a vehicle success', async () => {
    const vehicle = makeVehicles();

    await sut.execute(vehicle);

    expect(vehicleRepository.items).toHaveLength(1);
    expect(vehicleRepository.items[0].licensePlate).toBe(vehicle.licensePlate);
    expect(vehicleRepository.items[0].chassis).toBe(vehicle.chassis);
    expect(vehicleRepository.items[0].renavam).toBe(vehicle.renavam);
    expect(vehicleRepository.items[0].vehicleBrand).toBe(vehicle.vehicleBrand);
    expect(vehicleRepository.items[0].vehicleModel).toBe(vehicle.vehicleModel);
    expect(vehicleRepository.items[0].yearOfFabrication).toBe(
      vehicle.yearOfFabrication,
    );
  });
});
