import {Post} from "../model/Post";
import {PostType} from "../resources/DataBaseInMemory";

export interface PostDAO {

    findById(id: number): Post | null;

    findAll(): ReadonlyArray<Post>;

    create(post: PostType): Post | null;

    update(post: PostType): Post | null;

    delete(id: number): boolean;
}