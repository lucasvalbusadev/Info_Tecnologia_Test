import { VehicleEntity } from '../../src/vehicles/domain/vehicle.entity';
import {
  SearchManyVehicleProps,
  IVehicleRepository,
} from '../../src/vehicles/domain/vehicle.repository';

export class VehicleRepositoryInMemory implements IVehicleRepository {
  public items: VehicleEntity[] = [];

  async create(data: VehicleEntity): Promise<void> {
    this.items.push(data);
  }

  async update(id: string, data: VehicleEntity): Promise<void> {
    const index = this.items.findIndex((vehicle) => vehicle.id === id);
    if (index === -1) {
      throw new Error('Vehicle not found');
    }
    this.items[index] = data;
  }

  async delete(id: string): Promise<void> {
    this.items = this.items.filter((vehicle) => vehicle.id !== id);
  }

  async getVehicleById(id: string): Promise<VehicleEntity | null> {
    return this.items.find((vehicle) => vehicle.id === id) || null;
  }

  async searchManyVehicle(
    searchProps: SearchManyVehicleProps,
  ): Promise<VehicleEntity[]> {
    let results = [...this.items];

    if (searchProps.licensePlate) {
      results = results.filter((v) =>
        v.licensePlate
          .toLowerCase()
          .includes(searchProps.licensePlate!.toLowerCase()),
      );
    }

    if (searchProps.chassis) {
      results = results.filter((v) =>
        v.chassis.toLowerCase().includes(searchProps.chassis!.toLowerCase()),
      );
    }

    if (searchProps.renavam) {
      results = results.filter((v) =>
        v.renavam.toLowerCase().includes(searchProps.renavam!.toLowerCase()),
      );
    }

    if (searchProps.vehicleModel) {
      results = results.filter((v) =>
        v.vehicleModel
          .toLowerCase()
          .includes(searchProps.vehicleModel!.toLowerCase()),
      );
    }

    if (searchProps.vehicleBrand) {
      results = results.filter((v) =>
        v.vehicleBrand
          .toLowerCase()
          .includes(searchProps.vehicleBrand!.toLowerCase()),
      );
    }

    if (searchProps.yearOfFabrication) {
      results = results.filter(
        (v) => v.yearOfFabrication === searchProps.yearOfFabrication,
      );
    }

    const page =
      searchProps.page && searchProps.page > 0 ? searchProps.page : 1;
    const limit =
      searchProps.limit && searchProps.limit > 0 ? searchProps.limit : 10;

    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;

    return results.slice(startIndex, endIndex);
  }
}
