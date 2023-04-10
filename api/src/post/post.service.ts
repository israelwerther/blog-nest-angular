import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './entities/post.entity';
import { User } from 'src/auth/entities/user.entity';

@Injectable()
export class PostService {

  constructor(@InjectRepository(Post)
    private readonly repo: Repository<Post>,){
  }

  async create(createPostDto: CreatePostDto, user: User) {
    const post = new Post();
    post.userId = 1;
    Object.assign(post, createPostDto);

    this.repo.create(post);
    return await this.repo.save(post);
  }

  //http://localhost:5000/post?sort=asc&title=firstpost
  async findAll(query?: string) {
    const myQuery = this.repo.createQueryBuilder("post").leftJoinAndSelect("post.category", "category").leftJoinAndSelect("post.user", "user");
    console.log("===========================")
    //Check if query is present or not
    if (!(Object.keys(query).length === 0) && query.constructor === Object){
      
      const queryKeys = Object.keys(query); //get the keys of the query string
      console.log("Console 0", queryKeys)

      // check if title key is present
      if (queryKeys.includes('title')) {
        myQuery.where('post.title LIKE :title', {title: `%${query['title']}%`});
        console.log("Console 1")
      }

      // check if the sort key is present, we will sort by Title field only
      if (queryKeys.includes('sort')) {
        console.log("Console 2")
        myQuery.orderBy('post.title', query['sort'].toUpperCase()); //ASC or DESC
      }

      // check if category is present, show only selected category items
      if (queryKeys.includes('category')) {
        console.log("Console 3", {cat: query['category']})
        myQuery.andWhere('category.title = :cat', {cat: query['category']});
      }
      //14:48
      return await myQuery.getMany();

    } else {
      console.log("Console 4")
      return await myQuery.getMany();
    }
    
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

  async findBySlug(slug: string) {
    console.log(`here 1 ${slug}`)
    try {
      const post = await this.repo.findOneOrFail({where:{slug}});
      return post;
    } catch (err) {
      console.log("here 2")
      throw new BadRequestException(`Post with slug ${slug} not found`);
    }
  }

  async update(slug: string, updatePostDto: UpdatePostDto) {
    const post = await this.repo.findOne({where:{slug}});

    if (!post) {
      throw new BadRequestException("Post not found");
    }
    post.modifiedOn = new Date(Date.now());
    post.category = updatePostDto.category;

    Object.assign(post, updatePostDto);
    return this.repo.save(post);

  }

  async remove(id: number) {
    const post = await this.repo.findOne({where:{id}});

    if (!post) {
      throw new BadRequestException("Post not found");
    }

    await this.repo.remove(post);
    return {success: true, post};

  }
}
