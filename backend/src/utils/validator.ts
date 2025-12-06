import { Request, Response, NextFunction } from "express"
import { validationResult } from "express-validator"
export const handleInputErrors = (req: Request, res: Response, next: NextFunction) => {
    let errors = validationResult(req);

    if (!errors.isEmpty()) {
        const errorArray = errors.array();
        const errorMessages = errorArray.map(err => err.msg);
        return res.status(400).json({ errors: errorMessages });
    }
    next();
}