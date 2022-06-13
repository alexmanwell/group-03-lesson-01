import express, {Request, Response} from "express";
import cors from "cors";
import bodyParser from "body-parser";
import {bloggerRoute} from "./route/BloggerRoute";

const app = express();

app.use(cors());
app.use(bodyParser.json());

const port = process.env.PORT || 8888;

app.use("/bloggers", bloggerRoute);

const videos = [
    {id: 1, title: 'About JS - 01', author: 'it-incubator.eu'},
    {id: 2, title: 'About JS - 02', author: 'it-incubator.eu'},
    {id: 3, title: 'About JS - 03', author: 'it-incubator.eu'},
    {id: 4, title: 'About JS - 04', author: 'it-incubator.eu'},
    {id: 5, title: 'About JS - 05', author: 'it-incubator.eu'},
];

app.get('/', function (req: Request, res: Response) {
    res.send("I want become backend developer. Hello world! He-he");
});

app.get('/videos', (req: Request, res: Response) => {
    res.json(videos)
});

app.get('/videos/:videoId', (req: Request, res: Response) => {
    const id = +req.params.videoId;
    const video = videos.find(v => v.id === id);
    if (!video) {
        res.sendStatus(404);
    } else {
        res.json(video)
    }
});

app.post('/videos', (req: Request, res: Response) => {
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


app.delete('/videos/:id', (req: Request, res: Response) => {
    const id = +req.params.id;
    const index = videos.findIndex(v => v.id === id);

    if (index != -1) {
        videos.splice(index, 1);
        res.sendStatus(204);
    } else {
        res.sendStatus(404);
    }
});

app.put('/videos/:id', (req: Request, res: Response) => {
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

app.listen(port, () => {
    console.log(`Listening port ${port}`);
});