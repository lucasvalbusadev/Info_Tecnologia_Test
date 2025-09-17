// dto/vehicle.schemas.ts
import { z } from 'zod';
import { createZodDto } from '@anatine/zod-nestjs';

export const CreateVehicleSchema = z.object({
  licensePlate: z.string().min(7).max(7),
  chassis: z.string().min(17).max(17),
  renavam: z.string().min(11).max(11),
  vehicleModel: z.string(),
  vehicleBrand: z.string(),
  yearOfFabrication: z.number().int().min(1900).max(new Date().getFullYear()),
});

export class CreateVehicleDto extends createZodDto(CreateVehicleSchema) {}

export const UpdateVehicleSchema = CreateVehicleSchema.partial();
export class UpdateVehicleDto extends createZodDto(UpdateVehicleSchema) {}

export const SearchVehiclesSchema = z.object({
  licensePlate: z.string().optional(),
  chassis: z.string().optional(),
  renavam: z.string().optional(),
  vehicleModel: z.string().optional(),
  vehicleBrand: z.string().optional(),
  yearOfFabrication: z.string().optional(),
  page: z.string().optional(),
  limit: z.string().optional(),
});
export class SearchVehiclesDto extends createZodDto(SearchVehiclesSchema) {}
