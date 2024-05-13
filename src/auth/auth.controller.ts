import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthLoginDto } from 'src/dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('') // path: 'localhost:3000/auth'
  defaultAuthPage() {
    return 'This is the default auth api';
  }

  @Post('login') // path: 'localhost:3000/auth/login'
  login(@Body() dto: AuthLoginDto) {
    console.log({
      dto
    })
    return this.authService.login();
  }

  @Post('signup') // path: 'localhost:3000/auth/signup'
  signup() {
    return this.authService.signup();
  }
}
