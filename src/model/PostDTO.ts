export class PostDTO {

    constructor(readonly id: number,
                readonly title: string,
                readonly shortDescription: string,
                readonly content: string,
                readonly bloggerId: number) {
    }
}