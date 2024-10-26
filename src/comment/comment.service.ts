// src/comment/comment.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './comment.entity';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private commentRepository: Repository<Comment>,
  ) {}

  async create(commentDto: Partial<Comment>): Promise<Comment> {
    const comment = this.commentRepository.create(commentDto);
    return this.commentRepository.save(comment);
  }

  async findAll(): Promise<Comment[]> {
    return this.commentRepository.find({ relations: ['task', 'user'] });
  }

  async findOne(id: number): Promise<Comment> {
    const comment = await this.commentRepository.findOne({ where: { id }, relations: ['task', 'user'] });
    if (!comment) {
      throw new NotFoundException(`Comment with ID ${id} not found`);
    }
    return comment;
  }

  async update(id: number, commentDto: Partial<Comment>): Promise<Comment> {
    await this.commentRepository.update(id, commentDto);
    return this.findOne(id); // This ensures that we return the updated comment
  }

  async remove(id: number): Promise<void> {
    const result = await this.commentRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Comment with ID ${id} not found`);
    }
  }
}
