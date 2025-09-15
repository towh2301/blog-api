import { Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/auth/decorator/role.decorator';
import { Role } from 'src/auth/enum/role.enum';
import { RoleGuard } from 'src/auth/guard/jwt-auth.guard';

@Controller('blog')
@UseGuards(AuthGuard('jwt'), RoleGuard)
export class BlogController {
    @Get()
    @Roles(Role.User, Role.Admin)
    findAll() {
        return 'All logged-in users can see blogs';
    }

    @Post()
    @Roles(Role.Admin)
    create() {
        return 'Only admins can create blogs';
    }
}
