// src/auth/user.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Task } from '../task/task.entity';
import { Comment } from '../comment/comment.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @OneToMany(() => Task, task => task.assignee)
  tasks: Task[];

  @OneToMany(() => Comment, comment => comment.user)
  comments: Comment[];
}
