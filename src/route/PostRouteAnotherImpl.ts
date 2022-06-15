import {BloggerDAO} from "../repository/BloggerDAO";
import {BloggerInMemoryImpl} from "../repository/BloggerInMemoryImpl";
import {postRepository} from "../repository/PostInMemoryRepository";
import {Request, Response, Router} from "express";
import {postValidator} from "../middleware/validate/PostValidator";

const bloggerDAO: BloggerDAO = new BloggerInMemoryImpl();

export const postRoute = Router({});

const invalidExistBloggerMessage = {
    "errorsMessages": [
        {
            "message": "Invalid 'bloggerId': blogger doesn't exist",
            "field": "bloggerId"
        }
    ]
};

postRoute.get('/', (req: Request, res: Response) => {
    const posts = postRepository.findAll();
    res.send(posts);
});

postRoute.post('/', postValidator, (req: Request, res: Response) => {
    const existBlogger = bloggerDAO.findById(req.body.bloggerId);
    if(!existBlogger){
        res.status(400).send(invalidExistBloggerMessage);
        return;
    }
    const createdPost = postRepository.create(req.body,existBlogger);

    if (createdPost) {
        res.status(201).send(createdPost);
        return;
    }
    res.send(404)
});

postRoute.put('/:id', postValidator, (req: Request, res: Response) => {
    const postId = +req.params.id;

    if (!postRepository.findById(postId)) {
        res.send(404);
        return;
    }
    if (!bloggerDAO.findById(req.body.bloggerId)) {
        res.status(400).send(invalidExistBloggerMessage);
        return;
    }
    const isUpdetedPost = postRepository.update(req.body, postId);
    if (isUpdetedPost) {
        res.send(204);
        return;
    }

});

postRoute.get('/:id', (req: Request, res: Response) => {
    const id = +req.params.id;
    const foundPost = postRepository.findById(id);
    if (foundPost) {
        res.status(200).send(foundPost);
        return;
    }
    res.send(404)
});

postRoute.delete('/:id', (req: Request, res: Response) => {
    const id = +req.params.id;
    const deletedPost = postRepository.delete(id);
    if (deletedPost) {
        res.send(204);
        return;
    }
    res.send(404)

});

/*
postRoute.get("/", (req: Request, res: Response) => {
    const posts = postRepository.findAll();
    res.status(200);
    res.send(posts);
});

postRoute.get("/:id", (req: Request, res: Response) => {
    const id: number = +req.params.id;
    const post = postRepository.findById(id);
    if (!post) {
        res.sendStatus(404);
        return;
    }

    res.status(200).send(post);
    return;
});

postRoute.post("/", postValidator, (req: Request, res: Response) => {
    let blogger: User | null = bloggerDAO.findById(req.body.bloggerId);
    if (!blogger) {
        res.status(400).send(invalidExistBloggerMessage);
        return;
    }

    const title: string = req.body.title;
    const shortDescription: string = req.body.shortDescription;
    const content: string = req.body.content;
    const post = postRepository.create([title, shortDescription, content, blogger.id], blogger);
    if (!post) {
        res.sendStatus(404);
        return;
    }

    res.status(201).send(post);
    return;
});

postRoute.put("/:id", postValidator, (req: Request, res: Response) => {
    const id: number = +req.params.id;

    let post = postRepository.findById(id);
    if (!post) {
        res.status(404).send(`Not found post by id = ${id}`);
        return;
    }

    const bloggerId: number = +req.body.bloggerId;
    const blogger: User | null = bloggerDAO.findById(bloggerId);

    if (!blogger) {
        res.status(400).send(invalidExistBloggerMessage);
        return;
    }

    const title: string = req.body.title;
    const shortDescription: string = req.body.shortDescription;
    const content: string = req.body.content;
    post  = postRepository.update({"title": title, "shortDescription": shortDescription, "content": content}, bloggerId);

    res.status(204).send(post);
    return;
});

postRoute.delete('/:id', (req: Request, res: Response) => {
    const id: number = +req.params.id;
    const isRemovePost: boolean = postRepository.delete(id);
    if (!isRemovePost) {
        res.sendStatus(404);
        return;
    }

    res.sendStatus(204);
    return;
});*/
