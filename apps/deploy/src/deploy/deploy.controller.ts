import {Controller, Get, Post, Body, Patch, Param, Delete, Query} from '@nestjs/common';
import { DeployService } from './deploy.service';
import { CreateDeployDto } from './dto/create-deploy.dto';
import { UpdateDeployDto } from './dto/update-deploy.dto';
import {BasePaginationDto} from "../../../../libs/dto/basePagination.dto";

@Controller('deploy')
export class DeployController {
  constructor(private readonly deployService: DeployService) {}

  @Post()
  create(@Body() createDeployDto: CreateDeployDto) {
    return this.deployService.create(createDeployDto);
  }

  @Get()
  findAll(@Query() pagination: BasePaginationDto) {
    return this.deployService.findAll(pagination);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.deployService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDeployDto: UpdateDeployDto) {
    return this.deployService.update(+id, updateDeployDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.deployService.remove(+id);
  }
}
