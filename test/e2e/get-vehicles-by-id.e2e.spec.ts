import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { StartedPostgreSqlContainer } from '@testcontainers/postgresql';
import { TestAppModule } from '../mocks/test-app-module';
import { makeSequelizeTestSetup } from '../setup/sequelize-setup-test';
import { VehicleModel } from '../../src/vehicles/infra/repositories/vehicle.model';
import { makeVehicles } from '../factories/make-vehicles';
import { VehicleId } from '../../src/vehicles/domain/vehicle.entity';

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

describe('Get Vehicles E2E', () => {
  it('/vehicle/get-by-id (GET)', async () => {
    const vehicleId = new VehicleId();
    const vehicle = makeVehicles(null, vehicleId);
    await VehicleModel.create(vehicle.toJSON());

    const res = await request(app.getHttpServer())
      .get(`/vehicle/get-by-id/${vehicleId.id}`)
      .expect(200);

    expect(res.body).toStrictEqual({
      vehicle: vehicle.toJSON(),
    });
  });
});
