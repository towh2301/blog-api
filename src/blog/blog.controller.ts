import { BlogService } from './blog.service';
import {
    Body,
    Controller,
    Get,
    Param,
    Post,
    Patch,
    Req,
    UseGuards,
    Delete,
    HttpStatus,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/auth/decorator/role.decorator';
import { Role } from 'src/auth/enum/role.enum';
import { RoleGuard } from 'src/auth/guard/jwt-auth.guard';
import { BlogCreationDto } from './dto/blog-create.dto';
import { BlogUpdateDto } from './dto/blog-update.dto';

@Controller('blog')
@UseGuards(AuthGuard('jwt'), RoleGuard)
export class BlogController {
    constructor(private blogService: BlogService) {}

    @Get('/all')
    @Roles(Role.User, Role.Admin)
    async findAll(@Req() req: any) {
        return await this.blogService.getBlogByUser(req.user.email);
    }

    @Post('/create')
    @Roles(Role.User, Role.Admin)
    async create(@Req() req: any, @Body() request: BlogCreationDto) {
        const payload = {
            ...request,
            author: req.id,
        };

        return {
            status: HttpStatus.OK,
            payload: await this.blogService.create(payload),
        };
    }

    @Patch(':id')
    @Roles(Role.User, Role.Admin)
    async update(@Param('id') id: string, @Body() request: BlogUpdateDto) {
        return {
            status: HttpStatus.OK,
            payload: await this.blogService.update(id, request),
        };
    }

    @Delete(':id')
    @Roles(Role.User, Role.Admin)
    async delete(@Param('id') id: string) {
        this.blogService.delete(id);
        return { status: HttpStatus.OK };
    }
}
