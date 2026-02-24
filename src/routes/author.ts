import { Router } from "express";
import { db } from "../utils/db";
import { AuthorService } from "../services/author";
import { AuthorController } from "../controllers/author.controller";
import { IsAuthenticated } from "../middleware/authentication";

const authorService = new AuthorService(db);
const authController = new AuthorController(authorService);

const authorRouter: Router = Router();
// authorRouter.use(IsAuthenticated);

authorRouter.get('/profile',[IsAuthenticated],authController.getAuthorProfile)


export default authorRouter;

