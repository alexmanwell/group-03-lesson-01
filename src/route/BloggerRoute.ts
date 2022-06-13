import {BloggerDAO} from "../repository/BloggerDAO";
import {BloggerInMemoryImpl} from "../repository/BloggerInMemoryImpl";
import {Request, Response, Router} from "express";

export const bloggerRoute = Router({});
const bloggerDAO : BloggerDAO = new BloggerInMemoryImpl();

bloggerRoute.get("/", (req: Request, res: Response) => {
    res.json(bloggerDAO.findAll());
});

bloggerRoute.get("/:id", (req: Request, res: Response) => {
    const id = +req.params.id;
    const bloggers = bloggerDAO.findById(id);
    if (!bloggers) {
        res.sendStatus(404);
    } else {
        res.json(bloggers)
    }
});