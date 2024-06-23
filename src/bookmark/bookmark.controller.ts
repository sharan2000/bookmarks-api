import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/auth/guard';
import { BookmarkService } from './bookmark.service';
import { GetUser } from 'src/auth/decorator';
import { User } from '@prisma/client';
import { CreateBookmarkDto, EditBookmarkDto } from './dto';

@UseGuards(JwtGuard)
@Controller('bookmark')
export class BookmarkController {

  constructor(
    private bookmarkService: BookmarkService
  ) {}

  @HttpCode(HttpStatus.CREATED)
  @Post('create')
  createBookmark(@GetUser() user: User, @Body() dto: CreateBookmarkDto) {
    return this.bookmarkService.createBookmark(user.id, dto)
  }

  @Get('all')
  getAllBookmarks(@GetUser() user: User) {
    return this.bookmarkService.getAllBookmarks(user.id)
  }

  @Get(":id")
  getBookmarkById(@GetUser() user: User, @Param('id', ParseIntPipe) id: number) {
    return this.bookmarkService.getBookmarkById(user.id, id)
  }

  @Patch("update/:id")
  updateBookmarkById(@GetUser() user: User, @Param('id', ParseIntPipe) id: number, @Body() dto: EditBookmarkDto) {
    return this.bookmarkService.updateBookmarkById(user.id, id, dto)
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('delete/:id')
  deleteBookmarkById(@GetUser() user: User, @Param('id', ParseIntPipe) id: number) {
    return this.bookmarkService.deleteBookmarkById(user.id, id)
  }

}
