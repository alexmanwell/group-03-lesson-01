import {Router, Request, Response} from "express";
import {bloggerRepository} from "../repository/BloggerInMemoryRepository";
import {validateBlogger} from "../middleware/validate/BloggerValidator";

export const bloggersRouter = Router();

bloggersRouter.get('/', (req: Request, res: Response) => {
    res.send(bloggerRepository.findAll())
});

bloggersRouter.get('/:id', (req: Request, res: Response) => {
    const id = +req.params.id;
    if (id) {
        let foundBlogger = bloggerRepository.findById(id);
        if (foundBlogger) {
            res.status(200).send(foundBlogger);
            return;
        }
    }
    res.status(404).send();
});

bloggersRouter.post('/', validateBlogger, (req: Request, res: Response) => {
    const newBlogger = bloggerRepository.create(req.body);

    if (newBlogger) {
        res.status(201).send(newBlogger);
        return;
    }

    res.send(404);
});

bloggersRouter.put('/:id', validateBlogger, (req: Request, res: Response) => {
    const id = +req.params.id;
    const updatedBlogger = bloggerRepository.update(req.body, id);
    if (updatedBlogger) {
        res.send(204);
        return;
    }
    res.send(404);
    return;
});

bloggersRouter.delete('/:id', (req: Request, res: Response) => {
    const id = +req.params.id;
    if (id) {
        const deletedBlogger = bloggerRepository.delete(id);
        if (deletedBlogger) {
            res.send(204);
            return;
        }
        res.send(404);
        return;
    }
    res.send(400);
});