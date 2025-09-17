import { ApiProperty } from '@nestjs/swagger';

export class CreateVehiclesInputDTO {
  @ApiProperty()
  licensePlate: string;

  @ApiProperty()
  chassis: string;

  @ApiProperty()
  renavam: string;

  @ApiProperty()
  vehicleModel: string;

  @ApiProperty()
  vehicleBrand: string;

  @ApiProperty()
  yearOfFabrication: number;
}
