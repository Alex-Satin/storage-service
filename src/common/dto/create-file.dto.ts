import { GoogleDriveFolders } from '../enums/google-drive-folders.enum';

export class CreateFileDto {
  fileName: string;
  directory: GoogleDriveFolders;
}
