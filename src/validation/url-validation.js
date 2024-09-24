import Joi from "joi";

const createUrlValidation = Joi.object({
  name: Joi.string().max(30).required().messages({
    "string.base": "Name must be a string",
    "string.max": "Name must not be more than 30 characters",
    "any.required": "Name is required",
  }),
  redirectURL: Joi.string().uri().max(300).required().messages({
    "string.base": "Redirect URL harus berupa string.",
    "string.uri": "Redirect URL must be a valid URL",
    "string.max": "Redirect URL must not be more than 30 characters",
    "any.required": "Redirect is required",
  }),
});

const updateUrlValidation = Joi.object({
  name: Joi.string().max(30).required().messages({
    "string.base": "Name must be a string",
    "string.max": "Name must not be more than 30 characters",
    "any.required": "Name is required",
  }),
});

export { createUrlValidation, updateUrlValidation };
