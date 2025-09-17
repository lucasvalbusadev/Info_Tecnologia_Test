import {
  Column,
  DataType,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

export type VehicleModelProps = {
  id: string;
  licensePlate: string;
  chassis: string;
  renavam: string;
  vehicleModel: string;
  vehicleBrand: string;
  yearOfFabrication: number;
};

@Table({ tableName: 'vehicles', timestamps: true })
export class VehicleModel extends Model<VehicleModelProps> {
  @PrimaryKey
  @Column({ type: DataType.UUID, defaultValue: DataType.UUIDV4 })
  declare id: string;

  @Column({ type: DataType.STRING })
  declare licensePlate: string;

  @Column({ type: DataType.STRING })
  declare chassis: string;

  @Column({ type: DataType.STRING })
  declare renavam: string;

  @Column({ type: DataType.STRING })
  declare vehicleModel: string;

  @Column({ type: DataType.STRING })
  declare vehicleBrand: string;

  @Column({ type: DataType.INTEGER })
  declare yearOfFabrication: number;
}

export const VEHICLE_MODEL = 'VEHICLE_MODEL';
