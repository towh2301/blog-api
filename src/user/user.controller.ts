import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { UserService } from './user.service';
import path from 'path';
import { SignupDto } from 'src/auth/dto/signup.dto';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post('register')
    async register(@Body() signupDto: SignupDto) {
        const user = await this.userService.create(signupDto);

        // don't return password
        const { password, ...result } = user;

        return result;
    }

    @Get('all')
    async getAllUsers() {
        return this.userService.findAll();
    }

    @Get(':id')
    async getUserById(@Param('id') id: string) {
        return this.userService.findById(id);
    }
}
