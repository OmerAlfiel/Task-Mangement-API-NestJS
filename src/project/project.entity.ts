// src/project/project.entity.ts
import { User } from 'src/auth/user.entity';
import { Task } from 'src/task/task.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, OneToMany } from 'typeorm';


@Entity()
export class Project {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany(() => User, user => user.tasks)
  users: User[];

  @OneToMany(() => Task, task => task.project)
  tasks: Task[];
}
