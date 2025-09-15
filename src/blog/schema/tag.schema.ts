import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument, Types } from 'mongoose';
import { User } from 'src/user/schemas/user.schema';

export type TagDocument = HydratedDocument<Tag>;

@Schema({ timestamps: true })
export class Tag {
    @Prop({ required: true, unique: true })
    name: string;

    // Who created the tag
    @Prop({ type: Types.ObjectId, ref: User.name })
    createdBy: Types.ObjectId;
}

export const TagSchema = SchemaFactory.createForClass(Tag);
