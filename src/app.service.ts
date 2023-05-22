import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { drive_v3, google } from 'googleapis';
import { Readable } from 'stream';
import { GoogleDriveFolders } from './common/enums/google-drive-folders.enum';
import { UpdateFileDto } from './common';

@Injectable()
export class AppService {
  private readonly driveService: drive_v3.Drive;

  constructor(private readonly configService: ConfigService) {
    const SCOPES = ['https://www.googleapis.com/auth/drive'];

    const auth = new google.auth.GoogleAuth({
      keyFile: this.configService.get('google-drive.configPath'),
      scopes: SCOPES,
    });

    this.driveService = google.drive({ version: 'v3', auth });
  }

  async uploadFile(
    file: Express.Multer.File,
    fileName: string,
    directory: GoogleDriveFolders,
  ) {
    const fileMetaData = {
      name: fileName,
      parents: [this.configService.get(`google-drive.folders.${directory}`)],
    };

    const media = {
      mimeType: 'image/jpg',
      body: Readable.from(file.buffer),
    };

    const res = await this.driveService.files.create({
      requestBody: fileMetaData,
      media: media,
      fields: 'id',
    });

    return res.data.id;
  }

  async updateFile(file: Express.Multer.File, dto: UpdateFileDto) {
    const media = {
      mimeType: 'image/jpg',
      body: Readable.from(file.buffer),
    };

    const res = await this.driveService.files.update({
      media,
      fileId: dto.googleDriveId,
      fields: 'id',
    });

    return res.data.id;
  }
}
