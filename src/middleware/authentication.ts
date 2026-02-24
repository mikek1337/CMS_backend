import { type Request, type Response, type NextFunction } from "express";
import { auth } from "../utils/auth";
import { fromNodeHeaders } from "better-auth/node";
export async function IsAuthenticated(req: Request, res: Response, next: NextFunction){
    const session = await auth.api.getSession({
        headers: fromNodeHeaders(req.headers),
    });
    if(!session){
        return res.status(401).json({message: "Unauthorized"});
    }

    req.user = session.user;
    next();
}
