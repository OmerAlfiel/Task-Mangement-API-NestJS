// src/comment/comment.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Task } from '../task/task.entity';
import { User } from 'src/auth/user.entity';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  @ManyToOne(() => Task, task => task.comments, { onDelete: 'CASCADE' })
  task: Task;

  @ManyToOne(() => User, user => user.comments)
  user: User;
}
