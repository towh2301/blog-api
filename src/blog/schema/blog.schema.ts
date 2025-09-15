import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { User } from 'src/user/schemas/user.schema';
import { Tag } from './tag.schema';

export type BlogDocument = HydratedDocument<Blog>;

@Schema({ timestamps: true })
export class Blog {
    @Prop({ required: true, default: 'Unknown' })
    title: string;

    @Prop()
    content: string;

    @Prop({
        type: [{ type: Types.ObjectId, ref: Tag.name }],
        index: true,
        default: [],
    })
    tag: Types.ObjectId[];

    @Prop({ type: Types.ObjectId, ref: User.name, required: true })
    author: Types.ObjectId;
}

export const BlogSchema = SchemaFactory.createForClass(Blog);
