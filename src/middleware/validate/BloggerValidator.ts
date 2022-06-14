import {body, validationResult} from "express-validator"
import {NextFunction} from "express";

const validateName = body('name')
    .exists().withMessage("Name field must be exist.")
    .isString().withMessage("Name field must be string.")
    .trim()
    .notEmpty().withMessage("Name must be not empty.")
    .isLength({min: 1, max: 15})
    .withMessage("Name must be a string with range length from 1 to 15 symbols.");

const validateYoutubeUrl =
    body('youtubeUrl')
        .exists()
        .withMessage("YoutubeUrl field must be exist.")
        .matches("^https:\\/\\/([a-zA-Z0-9_-]+\\.)+[a-zA-Z0-9_-]+(\\/[a-zA-Z0-9_-]+)*\\/?$")
        .withMessage("YoutubeUrl must be match the regular expression")
        .isLength({
            min: 1,
            max: 100
        }).withMessage("YoutubeUrl must be a string with range length from 1 to 100 symbols.");

const errorsValidation = (req: Request, res: Response, next: NextFunction) => {
    const valResult = validationResult.withDefaults({
            formatter: error => {
                return {
                    message: error.msg,
                    field: error.param
                }
            }
        }
    );

    const errors = valResult(req);
    if (!errors.isEmpty()) {
        res.status(400).send({errorsMessages: errors.array({onlyFirstError: true}), resultCode: 1});
        return
    }

    next();
};

