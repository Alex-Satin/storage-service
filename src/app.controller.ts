import {
  Body,
  Controller,
  FileTypeValidator,
  MaxFileSizeValidator,
  ParseFilePipe,
  Patch,
  Post,
  UploadedFile,
} from '@nestjs/common';
import { AppService } from './app.service';
import { CreateFileDto, UpdateFileDto } from './common';

@Controller('files')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  createFile(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 5242880 }),
          new FileTypeValidator({ fileType: 'image/jpeg' }),
        ],
      }),
    )
    file: Express.Multer.File,
    @Body() dto: CreateFileDto,
  ) {
    return this.appService.uploadFile(file, dto.fileName, dto.directory);
  }

  @Patch()
  updateFile(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 5242880 }),
          new FileTypeValidator({ fileType: 'image/jpeg' }),
        ],
      }),
    )
    file: Express.Multer.File,
    @Body() dto: UpdateFileDto,
  ) {
    return this.appService.updateFile(file, dto.googleDriveId);
  }
}
