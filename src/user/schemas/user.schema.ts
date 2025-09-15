import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
    @Prop({ require: true, unique: true })
    username: string;

    @Prop({ required: true, unique: true })
    email: string;

    @Prop({ required: true })
    password: string;

    @Prop({ default: 'user', enum: ['user', 'admin'] })
    role: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
