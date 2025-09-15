import {
    Injectable,
    NotFoundException,
    UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserService } from '../user/user.service';
import { LoginDto } from './dto/login.dto';
import { SignupDto } from './dto/signup.dto';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService,
    ) {}

    async signup(signupDto: SignupDto) {
        const { username, email, password } = signupDto;

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await this.userService.create({
            username,
            email,
            password: hashedPassword,
        });

        const payload = { sub: user._id, role: user.role };

        return {
            access_token: this.jwtService.sign(payload),
        };
    }

    async login(loginDto: LoginDto) {
        const { email, password } = loginDto;

        const user = await this.userService.findByEmail(email);
        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (isPasswordValid) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const payload = { sub: user._id, role: user.role };

        return { access_token: this.jwtService.sign(payload) };
    }
}
