// src/task/task.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity';
import { TaskGateway } from './task.gateway';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
    private taskGateway: TaskGateway,  // Inject TaskGateway for WebSocket notifications
  ) {}

  async create(taskDto: Partial<Task>): Promise<Task> { // Accept Partial<Task> to allow flexible input
    const task = this.taskRepository.create(taskDto); // Create a new Task instance
    const savedTask = await this.taskRepository.save(task); // Save the new task instance
    this.taskGateway.notifyTaskChange(savedTask.id); // Notify about the new task
    return savedTask; // Return the saved task
  }

  async findAll(): Promise<Task[]> {
    return this.taskRepository.find({ relations: ['project', 'assignee', 'comments'] });
  }

  async findOne(id: number): Promise<Task> {
    return this.taskRepository.findOne({ where: { id }, relations: ['project', 'assignee', 'comments'] });
  }

  async update(id: number, taskDto: Partial<Omit<Task, 'id'>>): Promise<Task> { // Accept Partial<Omit<Task, 'id'>> for flexibility
    await this.taskRepository.update(id, taskDto as any); // Update the task
    const updatedTask = await this.findOne(id); // Fetch updated task with relations
    this.taskGateway.notifyTaskChange(updatedTask.id); // Notify about the updated task
    return updatedTask; // Return the updated task
  }

  async remove(id: number): Promise<void> {
    await this.taskRepository.delete(id); // Delete the task
    this.taskGateway.notifyTaskChange(id); // Notify about the deletion
  }
}
