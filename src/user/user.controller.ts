import { Controller, Get, Req, UseGuards } from "@nestjs/common";
import { Request } from "express";
import { JwtGuard } from "src/auth/guard";


@Controller("users")
export class UserController {
  
  @UseGuards(JwtGuard)
  @Get('me')
  getMyDetails(@Req() req: Request) {
    console.log('user data -- ', {
      user: req.user
    })
    return req.user
  }
}