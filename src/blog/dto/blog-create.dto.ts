import { IsNotEmpty } from 'class-validator';

export class BlogCreationDto {
    title: string;
    content: string;
    tag: string[];

    @IsNotEmpty()
    author: string; // userId, not the whole User object
}
