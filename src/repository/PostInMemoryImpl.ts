import {PostDAO} from "./PostDAO";
import {Post} from "../model/Post";

export class PostInMemoryImpl implements PostDAO {

    private readonly posts: Array<Post>;

    constructor(posts : Array<Post>) {
        this.posts = posts;
    }

    private lastIndex = () => this.posts.length;

    private incrementIndex = () => this.lastIndex() + 1;

    public create(post: Post): Post | null {
        const id: number = this.incrementIndex();
        const newPost: Post = new Post(id, post.title, post.shortDescription, post.content, post.blogger);
        this.posts.push(newPost);
        return this.findById(id);
    }

    public delete(id: number): boolean {
        const index : number = this.posts.findIndex(post => post.id === id);
        if (index != -1) {
            this.posts.splice(index, 1);
            return true;
        }

        return false;
    }

    public findAll(): ReadonlyArray<Post> {
        return this.posts;
    }

    public findById(id: number): Post | null {
        const post = this.posts.find(post => post.id === id);
        if (!post) {
            return null;
        }

        return post;
    }

    public update(post: Post): Post {
        const index: number = this.posts.findIndex(p => p.id === post.id);
        return this.posts[index] = post;
    }
}