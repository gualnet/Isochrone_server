const Axios = require('axios');
const config = require('../../config/config');

const API_KEY = config.API_KEY;
const API_PLACE_URL = 'https://maps.googleapis.com/maps/api/place/nearbysearch';
const OUTPUT_TYPE = 'json'

module.exports = {

  getAllPoiInADelimitedArea: async (req, res, next) => {
    const RADIUS = '500';
    const LOCATION = '52.494412,13.3987047';
    const TYPES = 'food';
    const NAME = 'harbour'

    let PARAMS = `key=${API_KEY}`;
    PARAMS += `&radius=${RADIUS}`;
    PARAMS += `&location=${LOCATION}`;
    PARAMS += `&types=${TYPES}`;
    // PARAMS += `&name=${NAME}`;

    fullUrl = `${API_PLACE_URL}/${OUTPUT_TYPE}?${PARAMS}`
    console.log('API CALL URL: ', fullUrl);
    try {

      // ! ecite les appels useless
      // ! const response = await Axios.get(fullUrl);
      // console.log('\nRESPONSE', response);
      return res.status(200).send(response.data);
    } catch (error) {
      return res.status(500).send(error);
    }
    
  },

  // getBarycentre: (req, res, next) => {
  //   const { coordonnees } = req.body;
  //   console.log('coordonnees', coordonnees);
  //   let long = 0;
  //   let lat = 0;
  //   for (const elem of coordonnees) {
  //     long += parseFloat(elem[0]);
  //     lat += parseFloat(elem[1]);
  //   }

  //   console.log('LONG LAT', [long, lat]);
  //   long = long / coordonnees.length
  //   lat = lat / coordonnees.length
  //   console.log('LONG LAT', [long, lat]);
    
  //   return res.status(200).send(coordonnees);
  // },

};
