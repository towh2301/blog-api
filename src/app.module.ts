import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { BlogController } from './blog/blog.controller';

@Module({
    imports: [
        MongooseModule.forRoot('mongodb://localhost:27017/blog-api'),
        UserModule,
        AuthModule,
    ],
    controllers: [AppController, BlogController],
    providers: [AppService],
})
export class AppModule {}
