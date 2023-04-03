import { Category } from "src/category/entities/category.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
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

    @Column()
    userId: number;

    @Column({ default: 3 })
    categoryId: number;
    
    @ManyToOne(() => User, (user) => user.posts, {
        eager: true
    })
    @JoinColumn({
        name: 'userId',
        referencedColumnName: 'id'
    })
    user: User

    @ManyToOne(() => Category, (cat) => cat.post, {
        eager: true
    })
    @JoinColumn({
        name: 'categoryId',
        referencedColumnName: 'id'
    })
    category: Category
}
