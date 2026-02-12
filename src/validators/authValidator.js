const Joi = require('joi');
const zxcvbn = require('zxcvbn');

const passwordComplexity = (value, helpers) => {
  const result = zxcvbn(value);
  if (result.score < 3) {
    return helpers.message(`Password is too weak. ${result.feedback.warning || 'Try adding more numbers and symbols.'}`);
  }
  return value;
};

exports.registerSchema = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).max(72).custom(passwordComplexity).required(),
});

exports.loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});