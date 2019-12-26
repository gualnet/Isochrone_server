const fs = require('fs');
const axios = require('axios'); 
const config = require('../../config/config');
const service = require('./service');

const GOOGLE_API_KEY = config.GOOGLE_API_KEY;
const API_PLACE_URL = 'https://maps.googleapis.com/maps/api/place/nearbysearch';
const OUTPUT_TYPE = 'json'
const SUPPORTED_TYPES = ['bar', 'cafe', 'movie_theater', 'night_club', 'park', 'restaurant', 'rv_park', 'tourist_attraction', 'zoo'];

module.exports = {

  getAllPoiInADelimitedArea: async (req, res, next) => {
    console.clear()
    console.log('req.body', req.body);
    const RADIUS = '1000';
    const LOCATION = '52.494412,13.3987047';
    const TYPES = 'restaurant';
    const NAME = 'harbour';

    let PARAMS = `key=${GOOGLE_API_KEY}`;
    PARAMS += `&radius=${RADIUS}`;
    // * LOCATION
    const coordsArray = [];
    for (participant of req.body.event.participantsList) {
      // console.log(participant)
      coordsArray.push([participant.latitude, participant.longitude]);
    }
    const barycentreCoords = service.getBarycentre(coordsArray);
    console.log('RES', barycentreCoords, `${barycentreCoords[0]}, ${barycentreCoords[1]}`);
    // PARAMS += `&location=${LOCATION}`;
    PARAMS += `&location=${barycentreCoords[0]},${barycentreCoords[1]}`;

    // * TYPE
    PARAMS += `&types=${TYPES}`;
    // PARAMS += `&name=${NAME}`;

    fullUrl = `${API_PLACE_URL}/${OUTPUT_TYPE}?${PARAMS}`
    console.log('API CALL URL: ', fullUrl);
    try {
      let response = {
        status: null,
        data: null,
      }
      const fd = fs.openSync('./searchResponse', 'w');
      
      // ! evite les appels useless
      // response = await axios.get(fullUrl);
      console.log('\nRESPONSE', response.status);
      console.log('\nRESPONSE', response.data);
      const jsonData = JSON.stringify(response.data);
      const R = fs.writeSync(fd, jsonData);

      fs.closeSync(fd);
      return res.status(200).send(response.data);
    } catch (error) {
      console.error(error);
      return res.status(500).send(error);
    }
    
  },
};
