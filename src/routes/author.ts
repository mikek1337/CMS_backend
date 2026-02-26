import { Router } from "express";
import { db } from "../utils/db";
import { AuthorService } from "../services/author";
import { AuthorController } from "../controllers/author.controller";
import { IsAuthenticated } from "../middleware/authentication";

const authorService = new AuthorService(db);
const authorController = new AuthorController(authorService);

const authorRouter: Router = Router();
// authorRouter.use(IsAuthenticated);

authorRouter.get('/profile',[IsAuthenticated],authorController.getAuthorProfile)
authorRouter.get('/profile/:id', authorController.getPublicProfile.bind(authorController));

export default authorRouter;

