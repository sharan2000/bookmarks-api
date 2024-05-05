import { Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('') // path: 'localhost:3000/auth'
  defaultAuthPage() {
    return 'This is the default auth api';
  }

  @Post('login') // path: 'localhost:3000/auth/login'
  login() {
    return this.authService.login();
  }

  @Post('signup') // path: 'localhost:3000/auth/signup'
  signup() {
    return this.authService.signup();
  }
}
