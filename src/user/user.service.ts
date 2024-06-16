import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { EditUserDto } from './dto';

@Injectable()
export class UserService {
  constructor(
    private prismaSerivce: PrismaService
  ) {}

  async editUser(userId: number, userDetails: EditUserDto) {
    console.log("in edit user func -- ", {
      userId,
      userDetails
    })
    const user = await this.prismaSerivce.user.update({
      where: {
        id: userId
      },
      data: {
        ...userDetails
      }
    })
    console.log('user -- ', user)
    delete user.hash
    return user
  }
}
