const Joi = require('@hapi/joi');

module.exports = {

  getUserById: async (req, res, next) => {
    const paramsSchema = Joi.object({
      userId: Joi.number().positive().required(),
    });

    try {
      const value = await paramsSchema.validateAsync(req.params);
      console.log('001', req.params);
      req.params = value;
      console.log('002', req.params);
      next();
    } catch (error) {
      console.log(error);
      return res.status(500).send({ error });
    }
  },

};
