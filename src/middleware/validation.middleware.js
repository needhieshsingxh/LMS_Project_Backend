import { body, param, query, validationResult } from "express-validator";




export const validate = (validations) =>{
    return async (req, res, next) =>{
        await Promise.all(validations.run(req))

        const errors = validationResult(req)
        if(errors.isEmpty()){
            return next()
        }

        const extractedError = errors.array().map(err =>({
                field: err.path,
                message: err.msg
        }))
    }
}


export const commonaValidations = {
    pagination: [
        query('page')
        .optional()
        .isInt({min: 1})
        .message("Page must be a positive integer"),
        query("limit")
        .optional()
        .isInt({min: 1, max: 100})
        .withMessage("limit must be a between 1 to 100")

    ],
    email: body("email")
            .isEmail()
            .normalizeEmail()
            .withMessage("Please provide a validate email"),
            name: body("name")
            .trim()
            .isLength({
                    min: 2, max: 50
            })
            .withMessage("Please provide a valid name")
};

export const validateSignup = validate([
    commonaValidations.email, commonaValidations.name
])