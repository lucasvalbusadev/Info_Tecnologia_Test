import { VehicleEntity } from '../../../vehicles/domain/vehicle.entity';
import {
  IVehicleRepository,
  SearchManyVehicleProps,
} from 'src/vehicles/domain/vehicle.repository';
import { VEHICLE_MODEL, VehicleModel } from './vehicle.model';
import { Op, WhereOptions } from 'sequelize';
import { Inject } from '@nestjs/common';
import { VehicleMapper } from './vehicle.mapper';
import { generateErrorMessage } from '../../../@shared/errors/handlers/generate-error';
import {
  databaseDictionaryErrors,
  DefaultDatabaseErrorCode,
} from '../../../@shared/errors/dictionaries/dictionary-database-error';

export class VehicleRepository implements IVehicleRepository {
  constructor(
    @Inject(VEHICLE_MODEL)
    private readonly vehicleRepository: typeof VehicleModel,
  ) {}

  async create(data: VehicleEntity): Promise<void> {
    try {
      const vehicleModel = VehicleMapper.toModel(data).dataValues;

      await this.vehicleRepository.create(vehicleModel);
    } catch (error) {
      return generateErrorMessage(
        DefaultDatabaseErrorCode.DB_CANNOT_INSERT,
        databaseDictionaryErrors,
        error,
        'vehicle.repository::create',
      );
    }
  }

  async update(id: string, data: VehicleEntity): Promise<void> {
    try {
      const vehicleModel = VehicleMapper.toModel(data).dataValues;

      await this.vehicleRepository.update(vehicleModel, {
        where: {
          id,
        },
      });
    } catch (error) {
      return generateErrorMessage(
        DefaultDatabaseErrorCode.DB_CANNOT_UPDATE,
        databaseDictionaryErrors,
        error,
        'vehicle.repository::update',
      );
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await this.vehicleRepository.destroy({
        where: {
          id,
        },
      });
    } catch (error) {
      return generateErrorMessage(
        DefaultDatabaseErrorCode.DB_NOT_FOUND_SCHEMA,
        databaseDictionaryErrors,
        error,
        'vehicle.repository::delete',
      );
    }
  }

  async getVehicleById(id: string): Promise<VehicleEntity | null> {
    try {
      const vehicleModel = await this.vehicleRepository.findByPk(id);
      if (!vehicleModel) return null;

      return VehicleMapper.toDomain(vehicleModel);
    } catch (error) {
      return generateErrorMessage(
        DefaultDatabaseErrorCode.DB_NOT_FOUND_SCHEMA,
        databaseDictionaryErrors,
        error,
        'vehicle.repository::getVehicleById',
      );
    }
  }

  async searchManyVehicle(
    searchProps: SearchManyVehicleProps,
  ): Promise<VehicleEntity[]> {
    try {
      const where: WhereOptions<VehicleModel> = {};

      if (searchProps.licensePlate) {
        where.licensePlate = { [Op.iLike]: `%${searchProps.licensePlate}%` };
      }
      if (searchProps.chassis) {
        where.chassis = { [Op.iLike]: `%${searchProps.chassis}%` };
      }
      if (searchProps.renavam) {
        where.renavam = { [Op.iLike]: `%${searchProps.renavam}%` };
      }
      if (searchProps.vehicleModel) {
        where.vehicleModel = { [Op.iLike]: `%${searchProps.vehicleModel}%` };
      }
      if (searchProps.vehicleBrand) {
        where.vehicleBrand = { [Op.iLike]: `%${searchProps.vehicleBrand}%` };
      }
      if (searchProps.yearOfFabrication) {
        where.yearOfFabrication = searchProps.yearOfFabrication;
      }

      const limit = searchProps.limit ?? 10;
      const page =
        searchProps.page && searchProps.page > 0 ? searchProps.page : 1;
      const offset = (page - 1) * limit;

      const vehiclesModel = await VehicleModel.findAll({
        where,
        limit,
        offset,
      });

      return vehiclesModel.map((v) => VehicleMapper.toDomain(v));
    } catch (error) {
      return generateErrorMessage(
        DefaultDatabaseErrorCode.DB_INTERNAL_ERROR,
        databaseDictionaryErrors,
        error,
        'vehicle.repository::searchManyVehicle',
      );
    }
  }
}
