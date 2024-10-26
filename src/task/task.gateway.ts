// src/task/task.gateway.ts
import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*', // Allow all origins (for development, consider restricting this in production)
  },
})
export class TaskGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('taskUpdated')
  async handleTaskUpdate(@MessageBody() taskId: number, taskService: any) {
    const updatedTask = await taskService.findOne(taskId); // Pass the service as an argument
    this.server.emit('taskUpdated', updatedTask);
  }

  @SubscribeMessage('newComment')
  async handleNewComment(@MessageBody() { taskId, comment }: { taskId: number; comment: string }) {
    // Logic to add a comment to a task would go here.
    this.server.emit('newComment', { taskId, comment });
  }

  notifyTaskChange(taskId: number) {
    this.server.emit('taskChanged', { taskId });
  }
}
