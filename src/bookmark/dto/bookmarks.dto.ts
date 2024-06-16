import { IsNotEmpty, IsOptional } from "class-validator";

export class BookmarkDto {
  @IsNotEmpty()
  title: string;

  @IsOptional()
  description?: string;

  @IsNotEmpty()
  link: string;
}