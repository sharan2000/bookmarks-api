import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateBookmarkDto, EditBookmarkDto } from './dto';
import { Bookmark } from '@prisma/client';

@Injectable()
export class BookmarkService {
  constructor(
    private prismaService: PrismaService
  ) {}

  async createBookmark(userId: number, dto: CreateBookmarkDto) {
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

  getBookmarkById(userId: number, bookmarkId: number) {
    return this.prismaService.bookmark.findFirst({
      where: {
        id: bookmarkId,
        userId
      }
    })
  }

  async updateBookmarkById(userId: number, bookmarkId: number, dto: EditBookmarkDto) {
    // get book mark and check if it belongs to user
    const bookmark = await this.prismaService.bookmark.findUnique({
      where: {
        id: bookmarkId,
      }
    })

    if(!bookmark || bookmark.userId !== userId) {
      // throw error
      throw new ForbiddenException("Access to resources denied")
    }

    // update bookmark
    return this.prismaService.bookmark.update({
      where: {
        id: bookmarkId,
      },
      data: {
        ...dto
      }
    })
  }

  async deleteBookmarkById(userId: number, bookmarkId: number) {
    // get book mark and check if it belongs to user
    const bookmark = await this.prismaService.bookmark.findUnique({
      where: {
        id: bookmarkId,
      }
    })

    if(!bookmark || bookmark.userId !== userId) {
      // throw error
      throw new ForbiddenException("Access to resources denied")
    }

    return this.prismaService.bookmark.delete({
      where: {
        id: bookmarkId,
      }
    })
  }

}
