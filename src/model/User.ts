export class User {
    private readonly id: number;
    private readonly name: string;
    private readonly youtubeUrl: string;

    constructor(id: number, name: string, youtubeUrl: string) {
        this.id = id;
        this.name = name;
        this.youtubeUrl = youtubeUrl;
    };

    get getId(): number {
        return this.id;
    }

    get getName(): string {
        return this.name;
    }

    get getYoutubeUrl(): string {
        return this.youtubeUrl;
    }
}