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

    res.send(404);
});

postRoute.put('/:id', postValidator, (req: Request, res: Response) => {
    if (!bloggerDAO.findById(req.body.bloggerId)) {
        res.status(400).send(invalidExistBloggerMessage);
        return;
    }

    const postId = +req.params.id;
    if (!postRepository.findById(postId)) {
        res.send(404);
        return;
    }

    const isUpdatePost = postRepository.update(req.body, postId);
    if (isUpdatePost) {
        res.send(204);
        return;
    } else {
        res.send(400);
        return;
    }
});

postRoute.get('/:id', (req: Request, res: Response) => {
    const id = +req.params.id;
    const post = postRepository.findById(id);
    if (post) {
        res.status(200).send(post);
        return;
    }

    res.send(404);
});

postRoute.delete('/:id', (req: Request, res: Response) => {
    const id = +req.params.id;
    const deletedPost = postRepository.delete(id);
    if (deletedPost) {
        res.send(204);
        return;
    }

    res.send(404);
});