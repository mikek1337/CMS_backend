import { Router } from "express";
import authorRouter from "./author";
import articleRoute  from "./article";
const route: Router = Router();

route.use('/author', authorRouter);
route.use('/article', articleRoute);
export default route;
