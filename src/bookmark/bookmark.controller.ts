import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/auth/guard';
import { BookmarkService } from './bookmark.service';
import { GetUser } from 'src/auth/decorator';
import { User } from '@prisma/client';
import { BookmarkDto } from './dto';

@UseGuards(JwtGuard)
@Controller('bookmark')
export class BookmarkController {

  constructor(
    private bookmarkService: BookmarkService
  ) {}

  @Post('create')
  createBookmark(@GetUser() user: User, @Body() dto: BookmarkDto) {
    return this.bookmarkService.createBookmark(user.id, dto)
  }

  @Get('all')
  getAllBookmarks(@GetUser() user: User) {
    return this.bookmarkService.getAllBookmarks(user.id)
  }

  getBookmarkById() {

  }

  updateBookmarkById() {

  }

  deleteBookmarkById() {

  }

}
