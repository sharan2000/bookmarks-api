import { UserService } from './user.service';
import { Body, Controller, Get, Patch, UseGuards } from "@nestjs/common";
import { User } from "@prisma/client";
import { GetUser } from "src/auth/decorator";
import { JwtGuard } from "src/auth/guard";
import { EditUserDto } from "./dto";

@UseGuards(JwtGuard)
@Controller("users")
export class UserController {

  constructor(
    private userService: UserService
  ) {}
  
  @Get('me')
  getMyDetails(@GetUser() user: User) {
    return user
  }

  @Patch('edit')
  editUser(@GetUser() user: User, @Body() dto: EditUserDto) {
    return this.userService.editUser(user.id, dto)
  }
}