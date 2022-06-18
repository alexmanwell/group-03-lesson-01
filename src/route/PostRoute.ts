import {BloggerDAO} from "../repository/BloggerDAO";
import {PostDAO} from "../repository/PostDAO";
import {BloggerInMemoryImpl} from "../repository/BloggerInMemoryImpl";
import {PostInMemoryImpl} from "../repository/PostInMemoryImpl";
import {Request, Response, Router} from "express";
import {User} from "../model/User";
import {postValidator} from "../middleware/validate/PostValidator";
import {Post} from "../model/Post";
import {posts, users} from "../resources/DataBaseInMemory";

const bloggerDAO: BloggerDAO = new BloggerInMemoryImpl(users);
const postDAO: PostDAO = new PostInMemoryImpl(posts);

export const postRoute = Router({});

const invalidExistMessage = (bloggerId: number) => {
    return `{
    "errorsMessages": [{
        "message": "Invalid blogger by id = ${bloggerId}': blogger doesn't exist",
        "field": "bloggerId"
        }]
    }`
};

postRoute.get("/", (req: Request, res: Response) => {
    const posts = postDAO.findAll();
    res.status(200).send(posts);
});

postRoute.get("/:id", (req: Request, res: Response) => {
    const id: number = +req.params.id;
    const post = postDAO.findById(id);
    if (!post) {
        res.sendStatus(404);
        return;
    }

    res.status(200).send(post);
    return;
});

postRoute.post("/", postValidator, (req: Request, res: Response) => {
    const bloggerId: number = req.body.bloggerId;
    const blogger: User | null = bloggerDAO.findById(bloggerId);
    if (!blogger) {
        res.status(400).send(invalidExistMessage(bloggerId));
        return;
    }

    const title: string = req.body.title;
    const shortDescription: string = req.body.shortDescription;
    const content: string = req.body.content;
    const post: Post | null = postDAO.create({
        id: -1,
        title: title,
        shortDescription: shortDescription,
        content: content,
        bloggerId: blogger.id
    });
    if (!post) {
        res.sendStatus(404);
        return;
    }

    res.status(201).send(post);
    return;
});

postRoute.put("/:id", postValidator, (req: Request, res: Response) => {
    const id: number = +req.params.id;

    let post: Post | null = postDAO.findById(id);
    if (!post) {
        res.status(404).send(invalidExistMessage(id));
        return;
    }

    const bloggerId: number = +req.body.bloggerId;
    const blogger: User | null = bloggerDAO.findById(bloggerId);

    if (!blogger) {
        res.status(400).send(invalidExistMessage(bloggerId));
        return;
    }

    post = postDAO.update({
        id: -1,
        title: req.body.title,
        shortDescription: req.body.shortDescription,
        content: req.body.content,
        bloggerId: blogger.id
    });

    res.status(204).send(post);
    return;
});

postRoute.delete('/:id', (req: Request, res: Response) => {
    const id: number = +req.params.id;
    const isRemovePost: boolean = postDAO.delete(id);
    if (!isRemovePost) {
        res.sendStatus(404);
        return;
    }

    res.sendStatus(204);
    return;
});