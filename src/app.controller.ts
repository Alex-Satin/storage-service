import {
  Body,
  Controller,
  FileTypeValidator,
  MaxFileSizeValidator,
  ParseFilePipe,
  Patch,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { AppService } from './app.service';
import { CreateFileDto, UpdateFileDto } from './common';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('files')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  createFile(
    @UploadedFile()
    file: Express.Multer.File,
    @Body() dto: CreateFileDto,
  ) {
    return this.appService.uploadFile(file, dto.fileName, dto.directory);
  }

  @Patch()
  @UseInterceptors(FileInterceptor('file'))
  updateFile(
    @UploadedFile()
    file: Express.Multer.File,
    @Body() dto: UpdateFileDto,
  ) {
    return this.appService.updateFile(file, dto);
  }
}
