import Joi from "joi";

const createUrlValidation = Joi.object({
  name: Joi.string().max(30).required().messages({
    "string.base": "Name harus berupa string.",
    "string.max": "Name tidak boleh lebih dari 30 karakter.",
    "any.required": "Name wajib diisi.",
  }),
  redirectURL: Joi.string().uri().max(300).required().messages({
    "string.base": "Redirect URL harus berupa string.",
    "string.uri": "Redirect URL harus berupa URL yang valid.",
    "string.max": "Redirect URL tidak boleh lebih dari 300 karakter.",
    "any.required": "Redirect URL wajib diisi.",
  }),
});

const updateUrlValidation = Joi.object({
  name: Joi.string().max(30).required().messages({
    "string.base": "Name harus berupa string.",
    "string.max": "Name tidak boleh lebih dari 30 karakter.",
    "any.required": "Name wajib diisi.",
  }),
});

export { createUrlValidation, updateUrlValidation };
