import { Request, Response } from "express";
import { AuthorService } from "../services/author";
import { Res } from "../interface/response";
import { User } from "better-auth/types";

export class AuthorController{
  private _authorService: AuthorService;

  constructor(authorService: AuthorService){
    this._authorService = authorService;
  }

  async getAuthorProfile(req: Request, res: Response<Res<Partial<User>>>){
    const userId = req.user.id;
    const author = await this._authorService.getAuthorByUserId(userId);
    res.json({message: 'Author Profile Fetched Successfull', data: author})
  }

  

} 
