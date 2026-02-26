import { PrismaClient } from "../generated/prisma/client";
import { ArticleFilterType, CreateArticleType, UpdateArticleStatusType } from "../types/article";

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

  async getArticleByAuthorId(authorId:string, filter?: ArticleFilterType){
    let where = {}
    if(filter){
      where = this.buildArticleFilterWhere(filter);
      
    }
    const articles = await this._prisma.article.findMany({
      where:{
        authorId: authorId,
        ...where,
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
        id: articleId,
        isPublished: true
      },
      include:{
        author:{
          include:{
            user: true
          }
        }
      }
    });
    if(!article){
      throw new Error("Article not found");
    }
    return article;
  }

  async getArticles(filter?:ArticleFilterType, cursor?:string){
    let where = {}
    if(filter){
     where = this.buildArticleFilterWhere(filter) 
    }
    const pageSize = 10;
    
    const articles = await this._prisma.article.findMany({
      where:{
        ...where,
        isPublished: true,
      },
      include:{
        author:{
          include:{
            user: true
          }
        }
      },
      take: pageSize + 1,
            orderBy:{
        createdAt: 'desc'
      }
    });

    let nextCursor: typeof cursor | undefined = undefined;
    if(articles.length > pageSize){
      const nextItem = articles.pop();
      nextCursor = nextItem?.id;
    } 
    return {articles, nextCursor};
  }

  async getAuthorPublishedArticle(authorId:string){
    const articles = await this._prisma.article.findMany({
      where: {
        authorId: authorId
      },
      include:{
        author:{
          include:{
            user: true
          }
        }
      }
    });

    return articles;
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

  buildArticleFilterWhere(filter:ArticleFilterType){
    let where = {};  
      if(filter.title){
        where = {
        ...where,
        title:{
          contains:filter.title 
        }
      }
      }
      if(filter.tags){
        where = {
          ...where,
          tags:{
            hasSome: filter.tags
          }
        }
      }
      if(filter.isPublished!==undefined){
        where={
          ...where,
          isPublished: filter.isPublished
        }
      }
    
    return where;
  }
}


