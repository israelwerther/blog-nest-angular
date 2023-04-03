import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Post } from "src/post/entities/post.entity";

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id: number
    @Column()
    firstname: string
    @Column()
    lastname: string
    @Column()
    email: string
    @Column()
    password: string
    @Column()
    profilePic: string

    @OneToMany(() => Post, (post) => post.user)
    posts:Post[]
}