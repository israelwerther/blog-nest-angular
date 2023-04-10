import { IsNotEmpty, IsOptional, IsString, IsNumber } from "class-validator";
import { Category } from "src/category/entities/category.entity";

export class CreatePostDto {
    @IsNotEmpty()
    @IsString()
    title: string;

    @IsNotEmpty()
    @IsString()
    content: string;

    @IsNumber()
    @IsOptional()
    categoryId: number

    @IsOptional()
    @IsString()
    mainImageUrl: string;

    @IsOptional()
    category: Category;
}
