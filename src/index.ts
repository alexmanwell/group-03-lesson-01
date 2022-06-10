import express, {Request, Response} from "express";

const app = express();
const port = 8008;

const videos = [
    {id: 1, title: 'About JS - 01', author: 'it-incubator.eu'},
    {id: 2, title: 'About JS - 02', author: 'it-incubator.eu'},
    {id: 3, title: 'About JS - 03', author: 'it-incubator.eu'},
    {id: 4, title: 'About JS - 04', author: 'it-incubator.eu'},
    {id: 5, title: 'About JS - 05', author: 'it-incubator.eu'},
];

app.get('/', function (req : Request, res : Response) {
    res.send("I want become backend developer. Hello world!");
});


app.get('/lesson_01/api/videos', function (req : Request, res : Response) {
    res.send(videos);
});

app.get('/lesson_01/api/videos/:videosId', function (req : Request, res : Response) {
    const id : number = parseInt(req.params.videosId);
    const foundVideo = videos.find((v) => v.id === id);
    if (!foundVideo) {
        res.status(400).json("No such video");
    }

    if (foundVideo) {
        res.json(`Video name is ${foundVideo.title}, and its author is ${foundVideo.author}`);
    }
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});