import {
  VehicleEntity,
  VehicleEntityProps,
  VehicleId,
} from '../vehicle.entity';

describe('Vehicle Entity Unit Tests', () => {
  const payload: VehicleEntityProps = {
    licensePlate: 'ABC1234',
    chassis: 'CHASSI001',
    renavam: 'RENAVAM001',
    vehicleModel: 'Model A',
    vehicleBrand: 'Brand X',
    yearOfFabrication: 2020,
  };

  it('should create a vehicle use constructor', () => {
    const vehicle = new VehicleEntity(payload);

    expect(vehicle.id).toBeDefined();
    expect(vehicle.licensePlate).toBe('ABC1234');
    expect(vehicle.chassis).toBe('CHASSI001');
    expect(vehicle.renavam).toBe('RENAVAM001');
    expect(vehicle.vehicleModel).toBe('Model A');
    expect(vehicle.vehicleBrand).toBe('Brand X');
    expect(vehicle.yearOfFabrication).toBe(2020);
  });

  it('should create a vehicle use create method', () => {
    const vehicle = VehicleEntity.create(payload);

    expect(vehicle.id).toBeDefined();
    expect(vehicle.licensePlate).toBe('ABC1234');
    expect(vehicle.chassis).toBe('CHASSI001');
    expect(vehicle.renavam).toBe('RENAVAM001');
    expect(vehicle.vehicleModel).toBe('Model A');
    expect(vehicle.vehicleBrand).toBe('Brand X');
    expect(vehicle.yearOfFabrication).toBe(2020);
  });

  it('should create a vehicle when pass a id', () => {
    const vehicleId = new VehicleId();
    const vehicle = VehicleEntity.create(payload, vehicleId);

    expect(vehicle.id).toBe(vehicleId.id);
    expect(vehicle.licensePlate).toBe('ABC1234');
    expect(vehicle.chassis).toBe('CHASSI001');
    expect(vehicle.renavam).toBe('RENAVAM001');
    expect(vehicle.vehicleModel).toBe('Model A');
    expect(vehicle.vehicleBrand).toBe('Brand X');
    expect(vehicle.yearOfFabrication).toBe(2020);
  });

  test('JSON method', () => {
    const vehicleId = new VehicleId();
    const vehicle = VehicleEntity.create(payload, vehicleId);

    expect(vehicle.toJSON()).toStrictEqual({
      id: vehicleId.id,
      licensePlate: 'ABC1234',
      chassis: 'CHASSI001',
      renavam: 'RENAVAM001',
      vehicleModel: 'Model A',
      vehicleBrand: 'Brand X',
      yearOfFabrication: 2020,
    });
  });
});
