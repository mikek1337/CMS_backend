import { PrismaClient } from "../generated/prisma/client";
import { AuthorType } from "../types/author";

export class AuthorService{
  private _prisma:PrismaClient;
  constructor(prisma: PrismaClient){
    this._prisma = prisma;
  }


  async getAuthorByUserId(userId: string){
    const user = await this._prisma.user.findFirst({
     where:{
      id: userId, 
     },
     select:{
      name: true,
      image: true,
      email: true,
      author: true,
     }
    });
    if(!user){
      throw new Error("Author not found");
    }
    return user;
  }

  async updateAuthorById(authorId:string, authorData:Partial<AuthorType>){
    const author = await this._prisma.author.findFirst({
      where:{
        id: authorId
      }
    });
    if(!author){
      throw new Error("Author Not Found");
    }

    const updatedUser = await this._prisma.user.update({
      where:{
        id: author.userId
      },
      data:{
        name: authorData.name,
      }
    });
    return updatedUser;
  }

}
