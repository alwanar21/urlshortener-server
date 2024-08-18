import Joi from "joi";

const registerUserValidation = Joi.object({
  username: Joi.string().alphanum().min(3).max(10).required(),
  password: Joi.string().min(8).max(100).pattern(new RegExp("(?=.*[a-z])(?=.*[A-Z])")).required(),
  confirmPassword: Joi.string().valid(Joi.ref("password")).required().messages({
    "any.only": "Confirm password does not match with password",
  }),
});

const loginUserValidation = Joi.object({
  username: Joi.string().max(100).required(),
  password: Joi.string().max(100).required(),
});

const getUserValidation = Joi.string().max(100).required();

export { registerUserValidation, loginUserValidation, getUserValidation };
