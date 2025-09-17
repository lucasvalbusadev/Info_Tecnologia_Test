import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { StartedPostgreSqlContainer } from '@testcontainers/postgresql';
import { TestAppModule } from '../mocks/test-app-module';
import { makeSequelizeTestSetup } from '../setup/sequelize-setup-test';
import { VehicleModel } from '../../src/vehicles/infra/repositories/vehicle.model';
import { makeVehicles } from '../factories/make-vehicles';

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

describe('Search Vehicles E2E', () => {
  it('/vehicle/search (GET)', async () => {
    const vehicle1 = makeVehicles({
      licensePlate: 'CZH-123',
    });
    const vehicle2 = makeVehicles({
      licensePlate: 'ABC-456',
    });
    await VehicleModel.create(vehicle1.toJSON());
    await VehicleModel.create(vehicle2.toJSON());

    const res = await request(app.getHttpServer())
      .get('/vehicle/search/')
      .query({
        licensePlate: 'CZH-123',
      })
      .expect(200);

    expect(res.body).toStrictEqual({
      vehicles: [vehicle1.toJSON()],
    });
  });
});
