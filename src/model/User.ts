export class User {
    private readonly _id: number;
    private readonly _name: string;
    private readonly _youtubeUrl: string;

    constructor(id: number, name: string, youtubeUrl: string) {
        this._id = id;
        this._name = name;
        this._youtubeUrl = youtubeUrl;
    };

    get id(): number {
        return this._id;
    }

    get name(): string {
        return this._name;
    }

    get youtubeUrl(): string {
        return this._youtubeUrl;
    }
}