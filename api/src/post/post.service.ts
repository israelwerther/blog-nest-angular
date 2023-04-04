import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './entities/post.entity';

@Injectable()
export class PostService {

  constructor(@InjectRepository(Post)
    private readonly repo: Repository<Post>,){
  }

  async create(createPostDto: CreatePostDto) {
    //const slug = createPostDto.title.split("").join('_').toLowerCase();
    const post = new Post();
    post.userId = 1;
    Object.assign(post, createPostDto);

    this.repo.create(post);
    return await this.repo.save(post);
    // post.title = createPostDto.title;
    // return await this.repo.insert({...createPostDto });
  }

  async findAll() {
    return await this.repo.find();
  }

  async findOne(id: number) {
    // return await this.repo.findOne({where:{id}});
    const post = await this.repo.findOne({where:{id}});
    console.log("==============", post)
    if (!post) {
      throw new BadRequestException('Post not found');
    }
    return post;
  }

  async update(id: number, updatePostDto: UpdatePostDto) {
    return await this.repo.update(id, updatePostDto)
  }

  async remove(id: number) {
    return await this.repo.delete(id);
  }
}
