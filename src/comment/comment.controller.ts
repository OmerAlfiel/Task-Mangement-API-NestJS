// src/comment/comment.controller.ts
import { Controller, Post, Body, Get, Param, Put, Delete } from '@nestjs/common';
import { CommentService } from './comment.service';

@Controller('comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post()
  create(@Body() commentDto) {
    return this.commentService.create(commentDto);
  }

  @Get()
  findAll() {
    return this.commentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.commentService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() commentDto) {
    return this.commentService.update(+id, commentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.commentService.remove(+id);
  }
}
