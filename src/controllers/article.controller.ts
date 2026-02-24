import { Request, Response } from "express";
import { type ArticleService } from "../services/article";
import { CreateArticleSchema, UpdateArtcleStatusSchema, UpdatePublishStatusSchema } from "../types/article";
import { Res } from "../interface/response";
import { Article } from "../generated/prisma/client";
import { type AuthorService } from "../services/author";

export class ArticleController {
    private _articleService: ArticleService;
    private _authorService: AuthorService;
    constructor(articleService: ArticleService, authorService: AuthorService) {
        this._articleService = articleService;
        this._authorService = authorService;
    }

    async createArticle(req: Request, res: Response<Res<Article>>) {
        const createArtcleData = CreateArticleSchema.parse(req.body);
        const userId = req.user.id;
        const author = await this._authorService.getAuthorByUserId(userId);
        const newArticle = await this._articleService.createArticle(createArtcleData, author.author[0].id);
        res.json({ message: 'saved', data: newArticle })
    }

    async getArticleByAuthor(req: Request, res: Response<Res<Article[]>>) {
        const userId = req.user.id;
        const author = await this._authorService.getAuthorByUserId(userId);
        const articles = await this._articleService.getArticleByAuthorId(author.author[0].id);
        res.json({message: 'Articles fetched successful', data: articles});
    }

    async getAuthorArticle(req: Request<{id: string}>, res: Response<Res<Article>>){
        const articleId = req.params.id;
        const userId = req.user.id;
        const article = await this._articleService.getArticleById(userId, articleId);
        res.json({message: 'Article fetched successful', data: article});
    }

    async updateArticle(req: Request<{ articleId: string }>, res: Response<Res<Article>>) {
        const updateArticleData = UpdateArtcleStatusSchema.parse(req.body);
        const userId = req.user.id;
        const articleId = req.params.articleId
        const updatedArticle = await this._articleService.updateArticle(userId, articleId, updateArticleData)
        res.json({ message: 'Article updated successful', data: updatedArticle })
    }


    async updatePublishStatus(req: Request<{ articleId: string }>, res: Response<Res<Article>>) {
        const publishStatus = UpdatePublishStatusSchema.parse(req.body);
        const articleId = req.params.articleId;
        const userId = req.user.id;

        const updatedArticle = await this._articleService.updateArticle(userId, articleId, publishStatus);
        res.json({ message: 'Publish status changed', data: updatedArticle });
    }

    async deleteArticle(req: Request<{ articleId: string }>, res: Response<Res<any>>) {
        const articleId = req.params.articleId;
        const userId = req.user.id;
        await this._articleService.deleteArticle(userId, articleId);
        res.json({ message: 'Deleted Article', data: null });
    }


}
