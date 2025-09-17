import { Uuid } from '../../@shared/domain/entities/entity_id';

export type VehicleEntityProps = {
  licensePlate: string;
  chassis: string;
  renavam: string;
  vehicleModel: string;
  vehicleBrand: string;
  yearOfFabrication: number;
};

export class VehicleId extends Uuid {}

export class VehicleEntity {
  props: VehicleEntityProps;
  vehicleId: VehicleId;

  constructor(props: VehicleEntityProps, id?: VehicleId) {
    this.props = props;
    this.vehicleId = id || new VehicleId();
  }

  static create(props: VehicleEntityProps, id?: VehicleId) {
    return new VehicleEntity(props, id);
  }

  get id(): string {
    return this.vehicleId.id;
  }

  get licensePlate() {
    return this.props.licensePlate;
  }

  get chassis() {
    return this.props.chassis;
  }

  get renavam() {
    return this.props.renavam;
  }

  get vehicleModel() {
    return this.props.vehicleModel;
  }

  get vehicleBrand() {
    return this.props.vehicleBrand;
  }

  get yearOfFabrication() {
    return this.props.yearOfFabrication;
  }

  changeAllFields(props: VehicleEntityProps) {
    this.props = props;
  }

  toJSON() {
    return {
      id: this.vehicleId.id,
      licensePlate: this.props.licensePlate,
      chassis: this.props.chassis,
      renavam: this.props.renavam,
      vehicleModel: this.props.vehicleModel,
      vehicleBrand: this.props.vehicleBrand,
      yearOfFabrication: this.props.yearOfFabrication,
    };
  }
}
