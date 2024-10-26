import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { ProjectModule } from './project/project.module';
import { TaskModule } from './task/task.module';
import { CommentModule } from './comment/comment.module';


@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'your-database-type', // Specify the database type
      host: 'localhost', // Specify the host
      port: "your-port", // Specify the port
      username: 'your-username', // Your database username
      password: 'your-password', // Your database password
      database: 'database-name', // Your database name
      autoLoadEntities: true,
      synchronize: true,
      logging: true,
    }),
    AuthModule,
    ProjectModule,
    TaskModule,
    CommentModule,
  ],
})
export class AppModule {}
