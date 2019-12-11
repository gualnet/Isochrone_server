const Joi = require('@hapi/joi');

module.exports = {

  getUserOwnInfo: async (req, res, next) => {
    const paramsSchema = Joi.object({
      userId: Joi.number().positive().required(),
    });

    try {
      const value = await paramsSchema.validateAsync(req.params);
      req.params = value;
      next();
    } catch (error) {
      console.log(error);
      return res.status(500).send({ error });
    }
  },

  login: async(req, res, next) => {
    const bodySchema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().min(4).required(),
    });

    try {
      const value = await bodySchema.validateAsync(req.body);
      req.body = value;
      next()
    } catch (error) {
      return res.status(500).send({ error });
    }
  },

};
