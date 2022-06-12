import {User} from "./User";

export class Post {
    private readonly _id : number;
    private readonly _title : string;
    private readonly _shortDescription : string;
    private readonly _content: string;
    private readonly _blogger: User;

    constructor(id: number, title: string, shortDescription: string, content: string, blogger: User) {
        this._id = id;
        this._title = title;
        this._shortDescription = shortDescription;
        this._content = content;
        this._blogger = blogger;
    }

    get id(): number {
        return this._id;
    }

    get title(): string {
        return this._title;
    }

    get shortDescription(): string {
        return this._shortDescription;
    }

    get content(): string {
        return this._content;
    }

    get blogger(): User {
        return this._blogger;
    }

    get toString() : string {
        return `id = ${this._id}, title = ${this._title}, shortDescription = ${this._shortDescription}, content = ${this._content}, blogger = ${this._blogger}`;
    }
}