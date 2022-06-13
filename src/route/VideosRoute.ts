import {Request, Response, Router} from "express";

export const videosRoute = Router({});

const videos = [
    {id: 1, title: 'About JS - 01', author: 'it-incubator.eu'},
    {id: 2, title: 'About JS - 02', author: 'it-incubator.eu'},
    {id: 3, title: 'About JS - 03', author: 'it-incubator.eu'},
    {id: 4, title: 'About JS - 04', author: 'it-incubator.eu'},
    {id: 5, title: 'About JS - 05', author: 'it-incubator.eu'},
];

videosRoute.get('/', (req: Request, res: Response) => {
    res.json(videos)
});

videosRoute.get('/:videoId', (req: Request, res: Response) => {
    const id = +req.params.videoId;
    const video = videos.find(v => v.id === id);
    if (!video) {
        res.sendStatus(404);
    } else {
        res.json(video)
    }
});

videosRoute.post('/', (req: Request, res: Response) => {
    const title: String = req.body.title;
    if (!title) {
        res.status(400).send({
                'errorsMessages': [{
                    message: 'Title is required',
                    field: 'title'
                }]
            }
        );
        return;
    }
    if (title.length > 40) {
        res.status(400).send({
                errorsMessages: [{
                    message: "Title has incorrect length value",
                    field: "title"
                }]
            }
        );
        return;
    }
    if (typeof title !== "string") {
        res.status(400).send({
                errorsMessages: [{
                    message: "Title has incorrect value",
                    field: "title"
                }]
            }
        );
        return;
    }

    const video = {
        id: videos[videos.length - 1].id + 1,
        title: title,
        author: 'it-incubator.eu'
    };
    videos.push(video);
    res.status(201).send(video);
});

videosRoute.delete('/:id', (req: Request, res: Response) => {
    const id = +req.params.id;
    const index = videos.findIndex(v => v.id === id);

    if (index != -1) {
        videos.splice(index, 1);
        res.sendStatus(204);
    } else {
        res.sendStatus(404);
    }
});

videosRoute.put('/:id', (req: Request, res: Response) => {
    const title = req.body.title;
    if(!title || title.length > 40 || typeof title !== "string") {
        res.status(400).send({
                errorsMessages: [{
                    message: "Title has incorrect",
                    field: "title"
                }]
            }
        );
        return;
    }

    const id = +req.params.id;
    const video = videos.find(v => v.id === id);
    if (!video) {
        res.sendStatus(404);
    } else {
        video.title = req.body.title;
        res.sendStatus(204);
    }
});