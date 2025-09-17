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

describe('Update Vehicles E2E', () => {
  it('/vehicle/update (PUT)', async () => {
    const vehicleId = new VehicleId();
    const vehicle = makeVehicles(
      {
        licensePlate: 'CZH-11',
      },
      vehicleId,
    );
    await VehicleModel.create(vehicle.toJSON());

    await request(app.getHttpServer())
      .put(`/vehicle/update/${vehicleId.id}`)
      .send({
        licensePlate: 'ABC-1234',
      })
      .expect(200);

    const vehicleUpdated = await VehicleModel.findByPk(vehicleId.id);

    expect(vehicleUpdated.licensePlate).toBe('ABC-1234');
  });
});
