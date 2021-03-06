import {User} from "./User";

export class Post {

    constructor(readonly id: number,
                readonly title: string,
                readonly shortDescription: string,
                readonly content: string,
                readonly blogger: User | null) {
    }
}