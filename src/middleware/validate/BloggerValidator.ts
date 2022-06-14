import {body} from "express-validator"
import {errorValidation} from "./ErrorValidation";

const validateName = body("name")
    .isString().withMessage("Name field must be string.")
    .trim()
    .notEmpty().withMessage("Name must be not empty.")
    .isLength({min: 1, max: 15})
    .withMessage("Name must be a string with range length from 1 to 15 symbols.");

const validateYoutubeUrl = body("youtubeUrl")
    .isString()
    .withMessage("YoutubeUrl field must be exist.")
    .matches("^https:\\/\\/([a-zA-Z0-9_-]+\\.)+[a-zA-Z0-9_-]+(\\/[a-zA-Z0-9_-]+)*\\/?$")
    .withMessage("YoutubeUrl must be match regular expression")
    .isLength({
        min: 1,
        max: 100
    }).withMessage("YoutubeUrl must be a string with range length from 1 to 100 symbols.");

export const validateBlogger = [
    validateName,
    validateYoutubeUrl,
    errorValidation];