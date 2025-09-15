import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/user/schemas/user.schema';
import { Blog, BlogDocument } from './schema/blog.schema';
import { Tag, TagDocument } from './schema/tag.schema';
import { BlogCreationDto } from './dto/blog-create.dto';
import { BlogUpdateDto } from './dto/blog-update.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class BlogService {
    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>,
        @InjectModel(Blog.name) private blogModel: Model<BlogDocument>,
        @InjectModel(Tag.name) private tagModel: Model<TagDocument>,
        private userService: UserService,
    ) {}

    async getBlogByUser(email: string) {
        console.log(email);

        const user = await this.userService.findByEmail(email);
        if (!user) {
            throw new NotFoundException('User not exist');
        }

        return this.blogModel
            .find({ author: user._id })
            .populate('author', 'name email')
            .populate('tags', 'name');
    }

    async create(blogCreationDto: BlogCreationDto): Promise<Blog> {
        const blog = new this.blogModel({
            ...blogCreationDto,
            author: blogCreationDto.author['_id'],
        });
        return blog.save();
    }

    async update(id: string, blogUpdateDto: BlogUpdateDto): Promise<Blog> {
        const updatedBlog = await this.blogModel.findByIdAndUpdate(
            id,
            blogUpdateDto,
            {
                new: true,
                runValidators: true,
            },
        );

        if (!updatedBlog) {
            throw new NotFoundException(`Blog with id ${id} not found`);
        }

        return updatedBlog;
    }

    async delete(id: string): Promise<void> {
        const result = await this.blogModel.findByIdAndDelete(id);
        if (!result) {
            throw new NotFoundException(`Blog with id ${id} not found`);
        }
    }
}
