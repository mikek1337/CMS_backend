import {Router} from "express";
import { IsAuthenticated } from "../middleware/authentication";
import { AuthorService } from "../services/author";
import { db } from "../utils/db";
import { ArticleService } from "../services/article";
import { ArticleController } from "../controllers/article.controller";

const articleService = new ArticleService(db);
const authorService = new AuthorService(db);
const articleController = new ArticleController(articleService, authorService);


const articleRoute:Router = Router()


articleRoute.post('/create', [IsAuthenticated], articleController.createArticle.bind(articleController));
articleRoute.get('/me', [IsAuthenticated], articleController.getArticleByAuthor.bind(articleController));
articleRoute.get('/author/:id',[IsAuthenticated], articleController.getAuthorArticle.bind(articleController))
export default articleRoute;
