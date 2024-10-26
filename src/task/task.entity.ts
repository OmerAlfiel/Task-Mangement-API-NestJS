// src/task/task.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { User } from 'src/auth/user.entity';
import { Project } from 'src/project/project.entity';
import { Comment } from '../comment/comment.entity';  // Ensure this import is correct

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  status: string;  // e.g. "In Progress", "Completed"

  @Column()
  deadline: Date;

  @ManyToOne(() => Project, project => project.tasks, { onDelete: 'CASCADE' })
  project: Project;

  @OneToMany(() => Comment, comment => comment.task, { cascade: true })
  comments: Comment[];

  @ManyToOne(() => User, user => user.tasks)
  assignee: User;
}
