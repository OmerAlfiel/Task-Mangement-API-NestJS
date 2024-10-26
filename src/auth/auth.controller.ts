// src/auth/auth.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() body: { username: string; password: string }) {
    return this.authService.register(body.username, body.password);
  }

  @Post('login')
async login(@Body() body: { username: string; password: string }) {
  try {
    return this.authService.login(body.username, body.password);
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
}

}
