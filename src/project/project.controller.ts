// src/project/project.controller.ts
import { Controller, Post, Body, Get, Param, Put, Delete } from '@nestjs/common';
import { ProjectService } from './project.service';

@Controller('projects')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post()
  create(@Body() projectDto) {
    return this.projectService.create(projectDto);
  }

  @Get()
  findAll() {
    return this.projectService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.projectService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() projectDto) {
    return this.projectService.update(+id, projectDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.projectService.remove(+id);
  }
}
