import {Module} from '@nestjs/common'
import { TrackModule } from './track/track.module';
import { MongooseModule } from '@nestjs/mongoose';
import { FileService } from './file/file.service';
import { ServeStaticModule } from '@nestjs/serve-static'
import * as path from 'path'
import { FileModule } from './file/file.module';

@Module ({
  imports: [
    ServeStaticModule.forRoot({rootPath: path.resolve(__dirname, 'static')}),
    TrackModule,
    MongooseModule.forRoot('mongodb://localhost/nest'),
    FileModule
  ],
  providers: [FileService]
})

export class AppModule {}