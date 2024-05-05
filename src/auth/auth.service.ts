import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable({})
export class AuthService {
  constructor(private prismaService: PrismaService) {}

  login() {
    return {
      message: 'successfully logged in',
    };
  }

  signup() {
    return {
      message: 'successfully signed up',
    };
  }
}
