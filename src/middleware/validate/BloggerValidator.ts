import {body} from "express-validator"

export class BloggerValidator {
    private name(): void {
        body('name')
            .exists().withMessage("Name field must be exist.")
            .isString().withMessage("Name field must be string.")
            .trim()
            .notEmpty().withMessage("Name must be not empty.")
            .isLength({min: 1, max: 15})
            .withMessage("Name must be a string with range length from 1 to 15 symbols.");
    }

    private youtubeUrl(): void {
        body('youtubeUrl')
            .exists()
            .withMessage("YoutubeUrl field must be exist.")
            .matches("^https:\\/\\/([a-zA-Z0-9_-]+\\.)+[a-zA-Z0-9_-]+(\\/[a-zA-Z0-9_-]+)*\\/?$")
            .withMessage("YoutubeUrl must be match the regular expression")
            .isLength({
                min: 1,
                max: 100
            }).withMessage("YoutubeUrl must be a string with range length from 1 to 100 symbols.");
    }

    public validate() {
        this.name();
        this.youtubeUrl();
    }
}