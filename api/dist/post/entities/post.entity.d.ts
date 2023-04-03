import { Category } from "src/category/entities/category.entity";
import { User } from "src/auth/entities/user.entity";
export declare class Post {
    id: number;
    title: string;
    content: string;
    slug: string;
    createdOn: Date;
    modifiedOn: Date;
    mainImageUrl: string;
    user: User;
    category: Category;
}
