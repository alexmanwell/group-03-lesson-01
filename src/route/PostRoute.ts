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
    const bloggerId: number | undefined = (!post.blogger) ? -1 : post.blogger.id;
    const bloggerName: string | undefined = (!post.blogger) ? undefined : post.blogger.name;
    return new PostDTO(post.id, post.title, post.shortDescription, post.content, bloggerId, (!bloggerName) ? "" : bloggerName);
};

const toPostsDTO = (posts: ReadonlyArray<Post>) => {
    return posts.map((post: Post) => {
        return toPostDTO(post);
    });
};

const invalidExistBloggerMessage = {
    "errorsMessages": [
        {
            "message": "Invalid 'bloggerId': blogger doesn't exist",
            "field": "bloggerId"
        }
    ]
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
    let blogger: User | null = bloggerDAO.findById(req.body.bloggerId);
    if (!blogger) {
        res.status(400).send(invalidExistBloggerMessage);
        return;
    }

    const title: string = req.body.title;
    const shortDescription: string = req.body.shortDescription;
    const content: string = req.body.content;
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

    let post: Post | null = postDAO.findById(id);
    if (!post) {
        res.status(404).send(`Not found post by id = ${id}`);
        return;
    }

    const bloggerId: number = +req.body.bloggerId;
    /*    const blogger: User | null = bloggerDAO.findById(bloggerId);

        if (!Object.is(post.blogger, blogger)) {
            res.status(400).send(invalidExistBloggerMessage);
            return;
        }
    */

    const title: string = req.body.title;
    const shortDescription: string = req.body.shortDescription;
    const content: string = req.body.content;
    post = postDAO.update(new Post(id, title, shortDescription, content, new User(bloggerId, req.body.bloggerName)));

    res.status(204).send(toPostDTO(post));
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