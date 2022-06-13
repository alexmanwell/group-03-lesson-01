import {BloggerDAO} from "../repository/BloggerDAO";
import {BloggerInMemoryImpl} from "../repository/BloggerInMemoryImpl";
import {Request, Response, Router} from "express";

export const bloggerRoute = Router({});
const bloggerDAO : BloggerDAO = new BloggerInMemoryImpl();

bloggerRoute.get("/", (req: Request, res: Response) => {
    res.status(200);
    res.send(bloggerDAO.findAll());
});

bloggerRoute.get("/:id", (req: Request, res: Response) => {
    const id = +req.params.id;
    const blogger = bloggerDAO.findById(id);
    if (!blogger) {
        res.sendStatus(404);
    } else {
        res.status(200);
        res.send(blogger);
    }
});

bloggerRoute.post("/", (req: Request, res: Response) => {
    
});