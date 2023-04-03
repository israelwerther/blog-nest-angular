import { Category } from "src/category/entities/category.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "src/auth/entities/user.entity";

@Entity('posts')
export class Post {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    title: string;
    @Column()
    content: string;
    @Column()
    slug: string;
    @Column({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    createdOn: Date;
    @Column({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    modifiedOn: Date;
    @Column()
    mainImageUrl: string;

    
    @ManyToOne(() => User, (user) => user.posts, {
        eager: true
    })
    user: User
    @ManyToOne(() => Category, (cat) => cat.post, {
        eager: true
    })
    category: Category
}
