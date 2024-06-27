import { Controller, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() body: { username: string, password: string }) {
    console.log(body);
    const user = await this.authService.register(body.username, body.password);
    return { message: 'User registered successfully', user };
  }

  // @Post('login')
  // async login(@Body() body: { username: string, password: string }) {
  //   const user = await this.authService.validateUser(body.username, body.password);
  //   if (!user) {
  //     throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
  //   }
  //   return { message: 'Login successful', user };
  // }
}
