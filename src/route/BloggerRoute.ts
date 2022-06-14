import {BloggerDAO} from "../repository/BloggerDAO";
import {BloggerInMemoryImpl} from "../repository/BloggerInMemoryImpl";
import {Request, Response, Router} from "express";
import {BloggerValidator} from "../middleware/validate/BloggerValidator";
import {User} from "../model/User";

const bloggerDAO: BloggerDAO = new BloggerInMemoryImpl();
const bloggerValidator: BloggerValidator = new BloggerValidator();

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
    } else {
        res.status(200);
        res.send(blogger);
    }
});

bloggerRoute.post("/", bloggerValidator.validate, (req: Request, res: Response) => {
    const blogger = bloggerDAO.create(new User(req.body.name, req.body.youtubeUrl));

    if (!blogger) {
        res.send(404);
    } else {
        res.status(201).send(blogger);
    }
});

bloggerRoute.put("/:id", bloggerValidator.validate, (req: Request, res: Response) => {
    const id = +req.params.id;
    const blogger = bloggerDAO.update(new User(id, req.body.name, req.body.youtubeUrl));
    if (!blogger) {
        res.send(404);
        return;
    } else {
        res.send(204);
    }
});

bloggerRoute.delete('/:id', (req: Request, res: Response) => {
    const id = +req.params.id;
    const blogger = bloggerDAO.delete(id);
    if (!bloggerDAO) {
        res.send(404);
        return
    } else {
        res.send(204);
    }
});