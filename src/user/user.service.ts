import { SignupDto } from './../auth/dto/signup.dto';
import {
    Injectable,
    ConflictException,
    NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Collection, Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private userModel: Model<User>) {}

    async create(signupDto: SignupDto): Promise<UserDocument> {
        // Change return type
        const { username, email, password } = signupDto;

        const existing = await this.userModel.findOne({ email });
        if (existing) {
            throw new ConflictException('Email already in use');
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const createdUser = await this.userModel.create({
            username,
            email,
            password: hashedPassword,
        });

        return createdUser;
    }

    async findByEmail(email: string): Promise<UserDocument | null> {
        return this.userModel.findOne({ email }).exec();
    }

    async findById(id: string): Promise<User> {
        const user = await this.userModel
            .findById(id)
            .select('-password')
            .exec();
        if (!user) throw new NotFoundException('User not found');
        return user;
    }

    async findAll(): Promise<User[]> {
        return await this.userModel.find().exec();
    }
}
