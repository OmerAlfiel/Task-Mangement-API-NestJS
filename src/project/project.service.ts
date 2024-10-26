// src/project/project.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from './project.entity';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project)
    private projectRepository: Repository<Project>,
  ) {}

  create(projectDto): Promise<Project> {
      const project = this.projectRepository.create(projectDto);
      return this.projectRepository.save(project).then(savedProjects => savedProjects[0]);
  }

  findAll(): Promise<Project[]> {
    return this.projectRepository.find({ relations: ['users', 'tasks'] });
  }

  findOne(id: number): Promise<Project> {
    return this.projectRepository.findOne({ where: { id }, relations: ['users', 'tasks'] });
  }

  async update(id: number, projectDto): Promise<Project> {
    await this.projectRepository.update(id, projectDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.projectRepository.delete(id);
  }
}
