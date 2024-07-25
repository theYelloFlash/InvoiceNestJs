import { Controller, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthLoginDto } from 'src/dataModels/DTO/auth.login.dto';

@Controller('auth/login')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  async login(@Body() authLoginDto : AuthLoginDto){
    return this.authService.mailLogin(authLoginDto);
  }
}
