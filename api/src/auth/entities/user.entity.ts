import { BeforeInsert, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Post } from "src/post/entities/post.entity";
import * as bcrypt from 'bcryptjs'
import { Exclude } from "class-transformer";
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
    @Column({select: false})
    password: string
    @Column()
    profilePic: string

    @OneToMany(() => Post, (post) => post.user)
    posts:Post[]

    @BeforeInsert()
    hashPassword() {
        this.password = bcrypt.hashSync(this.password, 10);
    }
    
}
