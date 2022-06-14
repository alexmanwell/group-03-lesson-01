import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import {bloggerRoute} from "./route/BloggerRoute";
import {videosRoute} from "./route/VideosRoute";
import {postRoute} from "./route/PostRoute";

const app = express();

app.use(cors());
app.use(bodyParser.json());

const port = process.env.PORT || 8888;

app.use("/videos", videosRoute);
app.use("/bloggers", bloggerRoute);
app.use("/posts", postRoute);

app.listen(port, () => {
    console.log(`Listening port ${port}`);
});