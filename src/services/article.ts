import { PrismaClient } from "../generated/prisma/client";
import { CreateArticleType, UpdateArticleStatusType } from "../types/article";

export class ArticleService{
  private _prisma: PrismaClient;
  constructor(prisma: PrismaClient){
    this._prisma = prisma;
  }

  async createArticle(createArticleDto: CreateArticleType, authorId:string){
    
   if(!createArticleDto.id){
    const article = await this._prisma.article.create({
      data:{
        ...createArticleDto,
        authorId: authorId
      }
    });
    return article
   }
   const article = await this._prisma.article.update({
    where:{
      id: createArticleDto.id
    },
    data:{
      ...createArticleDto,
      authorId: authorId
    }
   })
    return article;
  }

  async getArticleByAuthorId(authorId:string){
    const articles = await this._prisma.article.findMany({
      where:{
        authorId: authorId
      }
    });
    return articles;
  }

  async getArticleById(userId: string, articleId:string){
    const article = await this._prisma.article.findFirst({
      where:{
        id: articleId,
        author:{
          userId: userId,
        }
      }
    });
    if(!article){
      throw new Error("Article not found");
    }
    return article;
  }

  async getArticle(articleId:string){
    const article = await this._prisma.article.findFirst({
      where:{
        id: articleId
      }
    });
    return article;
  }

  

  async updateArticle(userId:string ,articleId: string, updateArticleDto: Partial<UpdateArticleStatusType>){
    const article = await this._prisma.article.findFirst({
      where: {
        id: articleId,
        author:{
          userId: userId
        }
      }
    });
    if(!article){
      throw new Error("Article not found");
    }
    const updatedArticle = await this._prisma.article.update({
      where:{
        id: articleId
      },
      data:{
        ...updateArticleDto,
      }
    });
    return updatedArticle;
  }

  async deleteArticle(userId: string, articleId: string){
    const article = this._prisma.article.findFirst({
      where:{
        id: articleId,
        author:{
          userId: userId,
        }
      }
    });
    if(!article){
      throw new Error("Article Not Found");
    }
    await this._prisma.article.delete({
      where:{
        id: articleId
      }
    });
  }
}
