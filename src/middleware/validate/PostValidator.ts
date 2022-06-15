import {body} from "express-validator"
import {errorValidation} from "./ErrorValidation";

const validateTitle = body("title")
    .isString().withMessage("Title field must be string.")
    .trim().notEmpty().withMessage("Title must be not empty.")
    .isLength({max: 30}).withMessage("Title must be max length 30 symbols.");

const validateShortDescription = body("shortDescription")
    .isString().withMessage("Short description field must be string.")
    .trim().notEmpty().withMessage("Short description must be not empty.")
    .isLength({max: 100}).withMessage("Short description must be max length 100 symbols.");

const validateContent = body("content")
    .isString().withMessage("Content field must be string")
    .trim().notEmpty().withMessage("Content must be not empty")
    .isLength({max: 100}).withMessage("Content must be max length 100 symbols.");

const validateBloggerId = body('bloggerId')
     .exists().withMessage("BloggerId is required")
     .isNumeric().withMessage("BloggerId should be number");

export const postValidator = [
    validateTitle,
    validateShortDescription,
    validateContent,
    validateBloggerId,
    errorValidation
];