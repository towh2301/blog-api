import { PartialType } from '@nestjs/mapped-types';
import { BlogCreationDto } from './blog-create.dto';

export class BlogUpdateDto extends PartialType(BlogCreationDto) {}
