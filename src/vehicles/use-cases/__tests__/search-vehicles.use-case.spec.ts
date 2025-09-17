import { VehicleRepositoryInMemory } from '../../../../test/mocks/vehicle.repository.in-memory';
import { makeVehicles } from '../../../../test/factories/make-vehicles';
import { SearchVehiclesUseCase } from '../search-vehicles.use-case';
import { VehicleEntity } from '../../../../src/vehicles/domain/vehicle.entity';

describe('SearchVehiclesUseCase with InMemory Repository', () => {
  let vehicleRepository: VehicleRepositoryInMemory;
  let useCase: SearchVehiclesUseCase;

  const seedVehicles: VehicleEntity[] = [
    makeVehicles({
      licensePlate: 'AAA1111',
      chassis: 'CHASSIS001',
      renavam: 'RENAVAM001',
      vehicleModel: 'Corolla',
      vehicleBrand: 'Toyota',
      yearOfFabrication: 2020,
    }),
    makeVehicles({
      licensePlate: 'BBB2222',
      chassis: 'CHASSIS002',
      renavam: 'RENAVAM002',
      vehicleModel: 'Civic',
      vehicleBrand: 'Honda',
      yearOfFabrication: 2021,
    }),
    makeVehicles({
      licensePlate: 'CCC3333',
      chassis: 'CHASSIS003',
      renavam: 'RENAVAM003',
      vehicleModel: 'Hilux',
      vehicleBrand: 'Toyota',
      yearOfFabrication: 2022,
    }),
    makeVehicles({
      licensePlate: 'DDD4444',
      chassis: 'CHASSIS004',
      renavam: 'RENAVAM004',
      vehicleModel: 'Model S',
      vehicleBrand: 'Tesla',
      yearOfFabrication: 2023,
    }),
  ];

  beforeEach(async () => {
    vehicleRepository = new VehicleRepositoryInMemory();
    useCase = new SearchVehiclesUseCase(vehicleRepository);

    for (const v of seedVehicles) {
      await vehicleRepository.create(v);
    }
  });

  it('should filter by licensePlate', async () => {
    const result = await useCase.execute({
      licensePlate: 'AAA1111',
      chassis: '',
      renavam: '',
      vehicleModel: '',
      vehicleBrand: '',
      yearOfFabrication: 0,
      limit: 10,
      page: 1,
    });

    expect(result.vehicles).toHaveLength(1);
    expect(result.vehicles[0].licensePlate).toBe('AAA1111');
  });

  it('should filter by chassis', async () => {
    const result = await useCase.execute({
      licensePlate: '',
      chassis: 'CHASSIS002',
      renavam: '',
      vehicleModel: '',
      vehicleBrand: '',
      yearOfFabrication: 0,
      limit: 10,
      page: 1,
    });

    expect(result.vehicles).toHaveLength(1);
    expect(result.vehicles[0].chassis).toBe('CHASSIS002');
  });

  it('should filter by renavam', async () => {
    const result = await useCase.execute({
      licensePlate: '',
      chassis: '',
      renavam: 'RENAVAM003',
      vehicleModel: '',
      vehicleBrand: '',
      yearOfFabrication: 0,
      limit: 10,
      page: 1,
    });

    expect(result.vehicles).toHaveLength(1);
    expect(result.vehicles[0].renavam).toBe('RENAVAM003');
  });

  it('should filter by vehicleModel', async () => {
    const result = await useCase.execute({
      licensePlate: '',
      chassis: '',
      renavam: '',
      vehicleModel: 'Civic',
      vehicleBrand: '',
      yearOfFabrication: 0,
      limit: 10,
      page: 1,
    });

    expect(result.vehicles).toHaveLength(1);
    expect(result.vehicles[0].vehicleModel).toBe('Civic');
  });

  it('should filter by vehicleBrand', async () => {
    const result = await useCase.execute({
      licensePlate: '',
      chassis: '',
      renavam: '',
      vehicleModel: '',
      vehicleBrand: 'Toyota',
      yearOfFabrication: 0,
      limit: 10,
      page: 1,
    });

    expect(result.vehicles).toHaveLength(2);
    expect(result.vehicles.map((v) => v.vehicleBrand)).toEqual([
      'Toyota',
      'Toyota',
    ]);
  });

  it('should filter by yearOfFabrication', async () => {
    const result = await useCase.execute({
      licensePlate: '',
      chassis: '',
      renavam: '',
      vehicleModel: '',
      vehicleBrand: '',
      yearOfFabrication: 2023,
      limit: 10,
      page: 1,
    });

    expect(result.vehicles).toHaveLength(1);
    expect(result.vehicles[0].yearOfFabrication).toBe(2023);
  });

  it('should paginate results correctly', async () => {
    const resultPage1 = await useCase.execute({
      licensePlate: '',
      chassis: '',
      renavam: '',
      vehicleModel: '',
      vehicleBrand: '',
      yearOfFabrication: 0,
      limit: 2,
      page: 1,
    });

    const resultPage2 = await useCase.execute({
      licensePlate: '',
      chassis: '',
      renavam: '',
      vehicleModel: '',
      vehicleBrand: '',
      yearOfFabrication: 0,
      limit: 2,
      page: 2,
    });

    expect(resultPage1.vehicles).toHaveLength(2);
    expect(resultPage2.vehicles).toHaveLength(2);
    expect(resultPage1.vehicles[0].id).toBe(seedVehicles[0].id);
    expect(resultPage2.vehicles[0].id).toBe(seedVehicles[2].id);
  });

  it('should return empty when no match found', async () => {
    const result = await useCase.execute({
      licensePlate: 'ZZZ9999',
      chassis: '',
      renavam: '',
      vehicleModel: '',
      vehicleBrand: '',
      yearOfFabrication: 0,
      limit: 10,
      page: 1,
    });

    expect(result.vehicles).toHaveLength(0);
  });
});
