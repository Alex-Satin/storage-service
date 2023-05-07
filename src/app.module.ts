import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { googleDriveConfig } from './common/config/google-drive.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [googleDriveConfig],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
