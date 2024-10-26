// src/task/task.controller.ts
import { Controller, Post, Body, Get, Param, Put, Delete } from '@nestjs/common';
import { TaskService } from './task.service';

@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  create(@Body() taskDto) {
    return this.taskService.create(taskDto);
  }

  @Get()
  findAll() {
    return this.taskService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.taskService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() taskDto) {
    return this.taskService.update(+id, taskDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.taskService.remove(+id);
  }
}
