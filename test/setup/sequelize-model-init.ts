import { VehicleModel } from '../../src/vehicles/infra/repositories/vehicle.model';
import { DataTypes } from 'sequelize';
import { Sequelize } from 'sequelize-typescript';

export function initAttachmentConfiguration(sequelize: Sequelize) {
  VehicleModel.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUID,
      },
      chassis: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      licensePlate: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      renavam: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      vehicleBrand: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      vehicleModel: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      yearOfFabrication: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    { sequelize, tableName: 'attachment-configurations', timestamps: true },
  );
}
