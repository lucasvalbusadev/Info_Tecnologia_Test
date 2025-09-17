import { ApiProperty } from '@nestjs/swagger';

export class UpdateVehiclesInputDTO {
  @ApiProperty({ required: false })
  licensePlate: string;

  @ApiProperty({ required: false })
  chassis: string;

  @ApiProperty({ required: false })
  renavam: string;

  @ApiProperty({ required: false })
  vehicleModel: string;

  @ApiProperty({ required: false })
  vehicleBrand: string;

  @ApiProperty({ required: false })
  yearOfFabrication: number;
}
