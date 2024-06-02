import { ConfigService } from '@nestjs/config';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { AuthLoginDto, AuthSignupDto } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';

import * as argon2 from "argon2";
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { JwtService } from '@nestjs/jwt';

@Injectable({})
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    private jwtService: JwtService,
    private config: ConfigService
  ) {}

  async login(dto: AuthLoginDto) {
    console.log('login dto in service -- ', dto)
    let access_token: string, message: string
    try {
      // check if user exists
      const user = await this.prismaService.user.findUnique({
        select: {
          id: true,
          email: true,
          hash: true,
        },
        where: {
          email: dto.email
        }
      })

      if (!user) {
        throw new ForbiddenException("Invalid credentials.")
      }
      console.log('user -- ', user)

      // compare the passwords
      const match = await argon2.verify(user.hash, dto.password)
      // if  doesn't match throw error
      if(!match) {
        throw new ForbiddenException("Invalid credentials.")
      }

      const jwtToken = await this.signToken(user.id, user.email)

      access_token = 'BEARER ' + jwtToken
      message = "successfully logged in."
    } catch (error) {
      console.log('error in login function in service -- ', error)
      message = "login failed!"
      
      throw  error
    }

    return {
      message,
      access_token
    };
  }

  async signup(dto: AuthSignupDto) {
    console.log('signup dto in service -- ', dto)
    let user, message
    try {
      // hash password
      const hash = await argon2.hash(dto.password);

      // store user in db
      user = await this.prismaService.user.create({
        data: {
          email: dto.email,
          hash,
          firstName: dto.firstName,
          lastName: dto.lastName
        },
        select: {
          id: true,
          email: true,
          createdAt: true
        }
      })
      message = 'successfully signed up.'
    } catch (error) {
      console.log('error in signup function in service -- ', error)
      message = 'signup failed!'

      if(error instanceof PrismaClientKnownRequestError) {
        if(error.code === 'P2002') {
          throw new ForbiddenException('Credentials already taken.')
        }
      } else {
        throw error
      }
    }

    return {
      message,
      user
    };
  }

  signToken(userId: number, email: string):Promise<string> {
    const payload = {
      sub: userId,
      email
    }

    return this.jwtService.signAsync(payload, {
      expiresIn: '20m',
      secret: this.config.get('JWT_SECRET')
    })
  }
}
