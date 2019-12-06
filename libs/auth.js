module.exports = {
  authUser(req, res, next) {
    try {
      const userId = 1 // search in the db 
      req.user = { id: userId };
      next();
    } catch (error) {
      next(error);
    }
  }
};