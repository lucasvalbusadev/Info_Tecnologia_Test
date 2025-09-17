import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { StartedPostgreSqlContainer } from '@testcontainers/postgresql';
import { TestAppModule } from '../mocks/test-app-module';
import { makeSequelizeTestSetup } from '../setup/sequelize-setup-test';
import { VehicleModel } from '../../src/vehicles/infra/repositories/vehicle.model';

let app: INestApplication;
let pgContainer: StartedPostgreSqlContainer;

beforeAll(async () => {
  const setup = await makeSequelizeTestSetup();

  pgContainer = setup.container;

  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [TestAppModule],
  }).compile();

  app = moduleFixture.createNestApplication();
  await app.init();
});

afterAll(async () => {
  await app.close();
  await pgContainer.stop();
});

describe('Create Vehicles E2E', () => {
  it('/vehicle/create (POST)', async () => {
    await request(app.getHttpServer())
      .post('/vehicle/create')
      .send({
        licensePlate: 'ABC-1234',
        chassis: 'XYZ1234567890',
        renavam: '12345678900',
        vehicleModel: 'Gol',
        vehicleBrand: 'VW',
        yearOfFabrication: 2020,
      })
      .expect(201);

    const vehicle = await VehicleModel.findAll();

    expect(vehicle).toHaveLength(1);
    expect(vehicle[0].licensePlate).toBe('ABC-1234');
    expect(vehicle[0].chassis).toBe('XYZ1234567890');
    expect(vehicle[0].renavam).toBe('12345678900');
    expect(vehicle[0].vehicleModel).toBe('Gol');
    expect(vehicle[0].vehicleBrand).toBe('VW');
    expect(vehicle[0].yearOfFabrication).toBe(2020);
  });
});
