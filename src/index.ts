import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import {bloggersRouter} from "./route/bloggerRouteAnotherImpl";
import {videosRoute} from "./route/VideosRoute";
import {postRoute} from "./route/PostRouteAnotherImpl";

const app = express();

app.use(cors());
app.use(bodyParser.json());

const port = process.env.PORT || 8888;

app.use("/videos", videosRoute);
app.use("/bloggers", bloggersRouter);
app.use("/posts", postRoute);

app.listen(port, () => {
    console.log(`Listening port ${port}`);
});