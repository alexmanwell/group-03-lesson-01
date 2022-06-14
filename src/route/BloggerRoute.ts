import {BloggerDAO} from "../repository/BloggerDAO";
import {BloggerInMemoryImpl} from "../repository/BloggerInMemoryImpl";
import {Request, Response, Router} from "express";
import {validateBlogger} from "../middleware/validate/BloggerValidator";
import {User} from "../model/User";

const bloggerDAO: BloggerDAO = new BloggerInMemoryImpl();

export const bloggerRoute = Router({});

bloggerRoute.get("/", (req: Request, res: Response) => {
    res.status(200);
    res.send(bloggerDAO.findAll());
});

bloggerRoute.get("/:id", (req: Request, res: Response) => {
    const id = +req.params.id;
    const blogger = bloggerDAO.findById(id);
    if (!blogger) {
        res.sendStatus(404);
        return;
    } else {
        res.sendStatus(200);
        res.send(blogger);
        return;
    }
});

bloggerRoute.post("/", validateBlogger, (req: Request, res: Response) => {
    console.log("Test");
    const blogger = bloggerDAO.create(new User(req.body.name, req.body.youtubeUrl));

    if (!blogger) {
        res.sendStatus(404);
        return;
    } else {
        res.status(201);
        res.send(blogger);
        return;
    }
});

bloggerRoute.put("/:id", validateBlogger, (req: Request, res: Response) => {
    const id = +req.params.id;
    const blogger = bloggerDAO.update(new User(id, req.body.name, req.body.youtubeUrl));
    if (!blogger) {
        res.sendStatus(404);
        return;
    } else {
        res.sendStatus(204);
        return;
    }
});

bloggerRoute.delete('/:id', (req: Request, res: Response) => {
    const id = +req.params.id;
    const blogger = bloggerDAO.delete(id);
    if (!bloggerDAO) {
        res.sendStatus(404);
        return;
    } else {
        res.sendStatus(204);
        return;
    }
});