import {BloggerDAO} from "../repository/BloggerDAO";
import {PostDAO} from "../repository/PostDAO";
import {BloggerInMemoryImpl} from "../repository/BloggerInMemoryImpl";
import {PostInMemoryImpl} from "../repository/PostInMemoryImpl";
import {Request, Response, Router} from "express";
import {User} from "../model/User";
import {postValidator} from "../middleware/validate/PostValidator";
import {Post} from "../model/Post";
import {PostDTO} from "../model/PostDTO";

const bloggerDAO: BloggerDAO = new BloggerInMemoryImpl();
const postDAO: PostDAO = new PostInMemoryImpl();

export const postRoute = Router({});

const toPostDTO = (post: Post) => {
    const bloggerId: number = (!post.blogger) ? -1 : post.blogger.id;
    const bloggerName: string = (!post.blogger) ? "" : post.blogger.name;
    return new PostDTO(post.id, post.title, post.shortDescription, post.content, bloggerId, bloggerName);
};

const toPostsDTO = (posts: ReadonlyArray<Post>) => {
    return posts.map((post: Post) => {
        return toPostDTO(post);
    });
};

postRoute.get("/", (req: Request, res: Response) => {
    const posts = postDAO.findAll();
    res.status(200);
    res.send(toPostsDTO(posts));
});

postRoute.get("/:id", (req: Request, res: Response) => {
    const id: number = +req.params.id;
    const post = postDAO.findById(id);
    if (!post) {
        res.sendStatus(404);
        return;
    }

    res.status(200).send(toPostDTO(post));
    return;
});

postRoute.post("/", postValidator, (req: Request, res: Response) => {
    const title: string = req.body.title;
    const shortDescription: string = req.body.shortDescription;
    const content: string = req.body.content;
    const bloggerId: number = req.body.bloggerId;

    let blogger: User | null = bloggerDAO.findById(bloggerId);
    if (!blogger) {
        blogger = bloggerDAO.create(new User(bloggerId, `name ${bloggerId}`, `https://youtube.com/${bloggerId}`));
    }
    const post: Post | null = postDAO.create(new Post(-1, title, shortDescription, content, blogger));

    if (!post) {
        res.sendStatus(404);
        return;
    }

    res.status(201).send(toPostDTO(post));
    return;
});

postRoute.put("/:id", postValidator, (req: Request, res: Response) => {
    const id: number = +req.params.id;

    const findPostById : Post | null = postDAO.findById(id);
    if (!findPostById) {
        res.status(404).send(`Not found post by id = ${id}`);
        return;
    }

    const bloggerId: number = +req.body.bloggerId;
    let blogger: User | null = bloggerDAO.findById(bloggerId);
    if (!blogger) {
        blogger = bloggerDAO.create(new User(bloggerId, `name ${bloggerId}`, `https://youtube.com/${bloggerId}`));
    }
    const title: string = req.body.title;
    const shortDescription: string = req.body.shortDescription;
    const content: string = req.body.content;
    const post: Post | null = postDAO.update(new Post(id, title, shortDescription, content, blogger));

    res.status(204);
    res.send(toPostDTO(post));
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