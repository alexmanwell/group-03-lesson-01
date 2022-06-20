import {BloggerDAO} from "../repository/BloggerDAO";
import {BloggerInMemoryImpl} from "../repository/BloggerInMemoryImpl";
import {Request, Response, Router} from "express";
import {validateBlogger} from "../middleware/validate/BloggerValidator";
import {User} from "../model/User";
import {users} from "../resources/DataBaseInMemory";
import {Authorization} from "../middleware/authorization/Authorization";

const bloggerDAO: BloggerDAO = new BloggerInMemoryImpl(users);
const authorization: Authorization = new Authorization();

export const bloggerRoute = Router({});

bloggerRoute.get("/", (req: Request, res: Response) => {
    res.status(200);
    res.send(bloggerDAO.findAll());
});

bloggerRoute.get("/:id", (req: Request, res: Response) => {
    const id: number = +req.params.id;
    const blogger: User | null = bloggerDAO.findById(id);
    if (!blogger) {
        res.sendStatus(404);
        return;
    }

    res.status(200).send(blogger);
    return;

});

bloggerRoute.post("/", authorization.check, validateBlogger, (req: Request, res: Response) => {
    const blogger = bloggerDAO.create(new User(-1, req.body.name, req.body.youtubeUrl));
    if (!blogger) {
        res.sendStatus(404);
        return;
    }

    res.status(201).send(blogger);
    return;
});

bloggerRoute.put("/:id", authorization.check, validateBlogger, (req: Request, res: Response) => {
    const id: number = +req.params.id;
    const blogger: User | null = bloggerDAO.update(new User(id, req.body.name, req.body.youtubeUrl));
    if (!blogger) {
        res.sendStatus(404);
        return;
    }

    res.status(204);
    res.send(blogger);
    return;
});

bloggerRoute.delete('/:id', authorization.check, (req: Request, res: Response) => {
    const id: number = +req.params.id;
    const isRemove: boolean = bloggerDAO.delete(id);
    if (isRemove === false) {
        res.sendStatus(404);
        return;
    }

    res.sendStatus(204);
    return;
});