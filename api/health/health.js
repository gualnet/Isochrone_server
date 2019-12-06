

module.exports = {

  heathyResponse: (req, res, next) => {
    return res.status(200).send('Server is online !');
  },
  
};
