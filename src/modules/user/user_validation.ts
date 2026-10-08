import { body ,param} from "express-validator";

const email_Validation = () => body("email")
    .isString().withMessage("email must be a string")
    .trim()
    .isEmail().withMessage("email isn't valid")
    .toLowerCase();

const phone_Validation = () => body("phoneNumber")
    .isString().withMessage("phoneNumber must be a string")
    .trim()
    .isMobilePhone("any").withMessage("phoneNumber isn't valid");

const password_Validation = (min: number) => body("password")
    .isString().withMessage("password must be a string")
    .isLength({ min }).withMessage(`password must contain at least ${min} characters`)

    
const register_Validation = [
    email_Validation().optional(),
    phone_Validation(),
    password_Validation(8),
];

const login_Validation = [
    body().isObject({ strict: true }).withMessage("request body must be an object").bail()
        .custom((value) => (value.email !== undefined) !== (value.phoneNumber !== undefined))
        .withMessage("provide exactly one of email or phoneNumber"),
    email_Validation().optional(),
    phone_Validation().optional(),
    password_Validation(1),
];

const Id_Validate = [
     param("id")
     .isUUID()
]

export { register_Validation, login_Validation,Id_Validate };
