import Joi from "joi";

const registerUserValidation = Joi.object({
  username: Joi.string().alphanum().min(3).max(10).required().messages({
    "any.required": "Username is required.",
    "string.min": "Username must be at least 3 characters long.",
    "string.max": "Username must not exceed 10 characters.",
    "string.alphanum": "Username must contain only alphanumeric characters.",
  }),

  password: Joi.string().min(8).max(100).pattern(new RegExp("(?=.*[a-z])(?=.*[A-Z])")).required().messages({
    "any.required": "Password is required.",
    "string.min": "Password must be at least 8 characters long.",
    "string.max": "Password must not exceed 100 characters.",
    "string.pattern.base": "Password must contain at least one lowercase and one uppercase letter.",
  }),

  confirmPassword: Joi.string().valid(Joi.ref("password")).required().messages({
    "any.only": "Confirm password does not match with password.",
    "any.required": "Confirm password is required.",
  }),
});

const loginUserValidation = Joi.object({
  username: Joi.string()
    .max(100)
    .messages({
      "string.max": "Username must not exceed 100 characters.",
      "any.required": "Username is required.",
    })
    .required(),
  password: Joi.string()
    .max(100)
    .messages({
      "string.max": "Password must not exceed 100 characters.",
      "any.required": "Password is required.",
    })
    .required(),
});

const getUserValidation = Joi.string().max(100).required();

export { registerUserValidation, loginUserValidation, getUserValidation };
