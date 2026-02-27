import { Request, Response } from "express";
import { type ArticleService } from "../services/article";
import { ArticleFilterSchema, ArticleFilterType, CreateArticleSchema, UpdateArtcleStatusSchema, UpdatePublishStatusSchema } from "../types/article";
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
        let queryParam = {};
        if(req.query.isPublished !== undefined){
          queryParam = {...req.query, isPublished: req.query.isPublished==="true"}
        }
        else{
          queryParam = {...req.query}
        }
        const queries:ArticleFilterType = ArticleFilterSchema.parse(queryParam);
        const author = await this._authorService.getAuthorByUserId(userId);
        const articles = await this._articleService.getArticleByAuthorId(author.author[0].id, queries);
        res.json({message: 'Articles fetched successful', data: articles});
    }

    async getArticle(req: Request<{id:string}>, res: Response<Res<Article | null>>){
        const articleId = req.params.id;
        const article = await this._articleService.getArticle(articleId);
        res.json({message:'article fetched', data: article});
    }

    async getAuthorArticle(req: Request<{articleId: string}>, res: Response<Res<Article>>){
        const articleId = req.params.articleId;
        const userId = req.user.id;
        
        const article = await this._articleService.getArticleById(userId, articleId);
        res.json({message: 'Article fetched successful', data: article});
    }

    async getAuthorsPublishedArticles(req: Request<{authorId: string}>, res: Response<Res<Article[]>>){
        const authorId = req.params.authorId;
        const articles = await this._articleService.getAuthorPublishedArticle(authorId);
        res.json({message: 'Author fetched successful', data: articles})
    }
    async getPublishedArticles(req:Request, res: Response<Res<Article[]>>){
      const queries:ArticleFilterType = ArticleFilterSchema.parse(req.query);
      const {isPublished,cursor, ...rest} = queries;
      const articles = await this._articleService.getArticles(rest, cursor);
      res.json({message: 'Articles fetched successful', data:articles});
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

    async getTags(req: Request, res: Response<Res<string[]>>){
        const tags = await this._articleService.getTags();
        res.json({message: 'Tags fetched successful', data: tags})
    }

    async filterArticlesByTags(req: Request, res: Response){
        const tags = req.query.tags;
        if(typeof tags !== 'string' || tags.trim() === ''){
            const articles = await this._articleService.getArticles();
            res.json({message: 'Articles fetched successful', data: articles});
            return;        
        }
        console.log(tags);
        const tagsArray = tags.split(',').map(tag=>tag.trim());
        const articles = await this._articleService.filterArticlesByTags(tagsArray);
        res.json({message: 'Articles fetched successful', data: articles})
    }

    


}
