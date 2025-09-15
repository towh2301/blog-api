import { Module } from '@nestjs/common';
import { BlogController } from './blog.controller';
import { BlogService } from './blog.service';
import { User, UserSchema } from 'src/user/schemas/user.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { Blog, BlogSchema } from './schema/blog.schema';
import { Tag, TagSchema } from './schema/tag.schema';
import { UserModule } from 'src/user/user.module';
import { UserService } from 'src/user/user.service';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Blog.name, schema: BlogSchema },
            { name: Tag.name, schema: TagSchema },
            { name: User.name, schema: UserSchema },
        ]),
        UserModule,
    ],
    controllers: [BlogController],
    providers: [BlogService],
    exports: [BlogService],
})
export class BlogModule {}
