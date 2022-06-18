import {PostDAO} from "./PostDAO";
import {Post} from "../model/Post";
import {PostType, users} from "../resources/DataBaseInMemory";
import {BloggerDAO} from "./BloggerDAO";
import {BloggerInMemoryImpl} from "./BloggerInMemoryImpl";
import {User} from "../model/User";

export class PostInMemoryImpl implements PostDAO {

    private readonly posts: Array<PostType>;
    private readonly  bloggers : BloggerDAO = new BloggerInMemoryImpl(users);
    constructor(posts: Array<PostType>) {
        this.posts = posts;
    }

    private lastIndex = () => this.posts[this.posts.length - 1].id;

    private incrementIndex = () => this.lastIndex() + 1;

    public create(post: PostType): Post | null {
        const postId: number = this.incrementIndex();
        this.posts.push({
            id: postId,
            title: post.title,
            shortDescription: post.shortDescription,
            content: post.content,
            bloggerId: post.bloggerId
        });

        return this.findById(postId);
    }

    public delete(id: number): boolean {
        const index: number = this.posts.findIndex(post => post.id === id);
        if (index != -1) {
            this.posts.splice(index, 1);
            return true;
        }

        return false;
    }

    public findAll(): ReadonlyArray<Post> {
        return this.posts.map((p) => {
            let post = this.findById(p.id);
            return (!post) ? new Post(p.id, p.title, p.shortDescription, p.content, new User(p.bloggerId)) : post;
        });
    }

    public findById(id: number): Post | null {
        const post = this.posts.find(post => post.id === id);
        if (!post) {
            return null;
        }

        const blogger = this.bloggers.findById(post.bloggerId);
        if (!blogger) {
            return null;
        }

        return new Post(post.id, post.title, post.shortDescription, post.content, new User(blogger.id, blogger.name));
    }

    public update(post: PostType): Post | null{
        const index: number = this.posts.findIndex(p => p.id === post.id);
        this.posts[index] = post;

        return this.findById(post.id);
    }
}