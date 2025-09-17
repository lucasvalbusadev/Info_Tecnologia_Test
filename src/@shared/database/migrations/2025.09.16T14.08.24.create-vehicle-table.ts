import { DataTypes, Sequelize } from 'sequelize';
import type { MigrationFn } from 'umzug';

export const up: MigrationFn<Sequelize> = async ({ context }) => {
  await context.getQueryInterface().createTable('vehicles', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    licensePlate: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    chassis: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    renavam: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    vehicleModel: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    vehicleBrand: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    yearOfFabrication: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.fn('now'),
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.fn('now'),
    },
  });
};
export const down: MigrationFn<Sequelize> = async ({ context }) => {
  await context.getQueryInterface().dropTable('vehicles');
};
