import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CreateVehiclesUseCase } from '../use-cases/create-vehicles.use-case';
import { DeleteVehiclesUseCase } from '../use-cases/delete-vehicles.use-case';
import { UpdateVehiclesUseCase } from '../use-cases/update-vehicles.use-case';
import { GetVehiclesByIdUseCase } from '../use-cases/get-vehicles-by-id.use-case';
import { SearchVehiclesUseCase } from '../use-cases/search-vehicles.use-case';
import { CreateVehiclesInputDTO } from './dto/create-vehicle.dto';
import { UpdateVehiclesInputDTO } from './dto/update-vehicles.dto';
import type {
  SearchVehiclesInputDTO,
  SearchVehiclesOutputDTO,
} from './dto/search-vehicles.dto';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { GetVehiclesByIdOutputDTO } from './dto/get-vehicles-by-id.dto';

@ApiTags('Vehicles')
@Controller('vehicle')
export class vehiclesController {
  constructor(
    private readonly createVehicleUseCase: CreateVehiclesUseCase,
    private readonly deleteVehicleUseCase: DeleteVehiclesUseCase,
    private readonly updateVehicleUseCase: UpdateVehiclesUseCase,
    private readonly getVehicleByIdUseCase: GetVehiclesByIdUseCase,
    private readonly searchVehicleUseCase: SearchVehiclesUseCase,
  ) {}

  @Post('create')
  @HttpCode(201)
  @ApiOperation({ summary: 'Create a new vehicle' })
  @ApiBody({ type: CreateVehiclesInputDTO })
  @ApiResponse({ status: 201, description: 'Vehicle successfully created' })
  async createVehicles(@Body() payload: CreateVehiclesInputDTO): Promise<void> {
    await this.createVehicleUseCase.execute(payload);
  }

  @Delete('delete/:id')
  @HttpCode(200)
  @ApiOperation({ summary: 'Delete a vehicle by ID' })
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({ status: 200, description: 'Vehicle successfully deleted' })
  async deleteVehicles(@Param('id') id: string): Promise<void> {
    await this.deleteVehicleUseCase.execute({ id });
  }

  @Put('update/:id')
  @HttpCode(200)
  @ApiOperation({ summary: 'Update a vehicle by ID' })
  @ApiParam({ name: 'id', type: String })
  @ApiBody({ type: UpdateVehiclesInputDTO })
  @ApiResponse({ status: 200, description: 'Vehicle successfully updated' })
  async updateVehicle(
    @Param('id') id: string,
    @Body() dataToUpdate: UpdateVehiclesInputDTO,
  ): Promise<void> {
    await this.updateVehicleUseCase.execute({
      dataToUpdate,
      id,
    });
  }

  @Get('get-by-id/:id')
  @HttpCode(200)
  @ApiOperation({ summary: 'Get vehicle details by ID' })
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({ status: 200, description: 'Vehicle found' })
  async getVehicleById(
    @Param('id') id: string,
  ): Promise<GetVehiclesByIdOutputDTO> {
    return await this.getVehicleByIdUseCase.execute({ id });
  }

  @Get('search')
  @HttpCode(200)
  @ApiOperation({ summary: 'Search vehicles with filters' })
  @ApiQuery({ name: 'licensePlate', required: false })
  @ApiQuery({ name: 'chassis', required: false })
  @ApiQuery({ name: 'renavam', required: false })
  @ApiQuery({ name: 'vehicleModel', required: false })
  @ApiQuery({ name: 'vehicleBrand', required: false })
  @ApiQuery({ name: 'yearOfFabrication', required: false, type: Number })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiResponse({ status: 200, description: 'Search results returned' })
  async searchVehicle(
    @Query() searchQuery: SearchVehiclesInputDTO,
  ): Promise<SearchVehiclesOutputDTO> {
    const limit = searchQuery.limit ? Number(searchQuery.limit) : undefined;
    const page = searchQuery.page ? Number(searchQuery.page) : undefined;
    const yearOfFabrication = searchQuery.yearOfFabrication
      ? Number(searchQuery.yearOfFabrication)
      : undefined;

    return await this.searchVehicleUseCase.execute({
      chassis: searchQuery.chassis,
      licensePlate: searchQuery.licensePlate,
      renavam: searchQuery.renavam,
      vehicleBrand: searchQuery.vehicleBrand,
      vehicleModel: searchQuery.vehicleModel,
      yearOfFabrication,
      limit,
      page,
    });
  }
}
