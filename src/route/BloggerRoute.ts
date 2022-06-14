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
    }

    res.status(200).send(blogger);
    return;

});

bloggerRoute.post("/", validateBlogger, (req: Request, res: Response) => {
    console.log("Test", req.body.name, req.body.youtubeUrl);
    const blogger = bloggerDAO.create(new User(req.body.name, req.body.youtubeUrl));
    console.log("After creating", blogger);

    if (!blogger) {
        res.sendStatus(404);
        return;
    }

    res.status(201).send(blogger);
    return;
});

bloggerRoute.put("/:id", validateBlogger, (req: Request, res: Response) => {
    const id = +req.params.id;
    const blogger = bloggerDAO.update(new User(id, req.body.name, req.body.youtubeUrl));
    if (!blogger) {
        res.sendStatus(404);
        return;
    }

    res.status(204);
    res.send(blogger);
    return;
});

bloggerRoute.delete('/:id', (req: Request, res: Response) => {
    const isRemove = bloggerDAO.delete(+req.params.id);
    console.log("isRemove:", isRemove);
    if (isRemove === false) {
        res.sendStatus(404);
        return;
    }

    res.sendStatus(204);
    return;
});