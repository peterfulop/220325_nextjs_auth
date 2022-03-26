import Joi from "joi";

export const signup = Joi.object({
  username: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  passwordConfirm: Joi.string().required().valid(Joi.ref("password")),
});

export const update = Joi.object({
  username: Joi.string(),
  email: Joi.string().email(),
});

export const login = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
});
