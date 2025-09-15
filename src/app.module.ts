import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { BlogController } from './blog/blog.controller';
import { BlogService } from './blog/blog.service';
import { BlogModule } from './blog/blog.module';

@Module({
    imports: [
        MongooseModule.forRoot('mongodb://localhost:27017/blog-api'),
        UserModule,
        AuthModule,
        BlogModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
