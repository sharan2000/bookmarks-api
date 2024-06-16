import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { BookmarkDto } from './dto';

@Injectable()
export class BookmarkService {
  constructor(
    private prismaService: PrismaService
  ) {}

  async createBookmark(userId: number, dto: BookmarkDto) {
    const bookmark = await this.prismaService.bookmark.create({
      data: {
        ...dto,
        userId
      }
    })
    return bookmark
  }

  getAllBookmarks(userId: number) {
    return this.prismaService.bookmark.findMany({
      where: {
        userId
      }
    })
  }

  getBookmarkById() {

  }

  updateBookmarkById() {

  }

  deleteBookmarkById() {
    
  }

}
