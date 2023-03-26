import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostModule } from './post/post.module';

@Module({
  imports: [
    PostModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      database: 'blog-tutorial',
      username: 'root',
      password: 'My7Pass@Word_9_8A_zE',
      port: 3306,
      autoLoadEntities: true,
      synchronize: true
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
