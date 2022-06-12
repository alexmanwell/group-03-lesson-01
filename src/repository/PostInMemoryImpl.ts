import {PostDAO} from "./PostDAO";
import {Post} from "../model/Post";

export class PostInMemoryImpl implements PostDAO {
    create(post: Post): Post {
        return undefined;
    }

    delete(id: number): void {
    }

    findAll(): ReadonlyArray<Post> {
        return undefined;
    }

    findById(id: number): Post | undefined {
        return undefined;
    }

    update(post: Post): Post {
        return undefined;
    }

}