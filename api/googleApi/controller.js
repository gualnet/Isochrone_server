const fs = require('fs');
const axios = require('axios'); 
const config = require('../../config/config');
const service = require('./service');

const GOOGLE_API_KEY = config.GOOGLE_API_KEY;
const URL_PLACE_SEARCH = 'https://maps.googleapis.com/maps/api/place/nearbysearch';
const URL_PLACE_DETAILS = 'https://maps.googleapis.com/maps/api/place/details';
const URL_PLACE_PHOTO = 'https://maps.googleapis.com/maps/api/place/photo';
const OUTPUT_TYPE = 'json'
const SUPPORTED_TYPES = ['bar', 'cafe', 'movie_theater', 'night_club', 'park', 'restaurant', 'rv_park', 'tourist_attraction', 'zoo'];

module.exports = {

  getAllPoiInADelimitedArea: async (req, res, next) => {
    console.clear()
    console.log('req.body', req.body);
    if (!req.body.event) {
      return res.status(400).send();
    }
    try {

    const RADIUS = '1000';
    // const LOCATION = '52.542685950022474,13.42151664883959'; // Berlin
    // const LOCATION = '52.494412,13.3987047';
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
    PARAMS += `&location=${barycentreCoords[1]},${barycentreCoords[0]}`;

    // * TYPE
    PARAMS += `&types=${TYPES}`;
    // PARAMS += `&name=${NAME}`;

    fullUrl = `${URL_PLACE_SEARCH}/${OUTPUT_TYPE}?${PARAMS}`
    console.log('API CALL URL: ', fullUrl);
      let response = {
        status: null,
        data: null,
      };

      // // * Retourne la data stocke dans searchResponse.json
      const data = fs.readFileSync('./searchResponse.json', "utf8");
      response.status = 200;
      response.data = data;

      // // * appel l'api google place
      // // ! evite les appels useless
      // response = await axios.get(fullUrl);

      // // * stocke la data recu de l'api google dans le fichier ./searchResponse
      // const fd = fs.openSync('./searchResponse', 'w');
      // const jsonData = JSON.stringify(response.data);
      // const R = fs.writeSync(fd, jsonData);
      // fs.closeSync(fd);
      
      // console.log('\nRESPONSE', response.status);
      // console.log('\nRESPONSE', response.data);
      return res.status(200).send(response.data);
    } catch (error) {
      console.error(error);
      return res.status(500).send(error);
    }
    
  },

  getPlaceDetailsTEST: async (req, res, next) => {
    console.clear()
    const needed = [
      'ChIJgQxLfDtSqEcRYM7lP_kG654', 'ChIJK-QqfPZOqEcRdTE1-ILoSqc', 'ChIJ0XSbSUdSqEcRTw-0D-nusuQ', 'ChIJ78yzHT9SqEcRobqQkHZvHWY'];
    try {
      
      let PARAMS = `key=${GOOGLE_API_KEY}`;
      PARAMS += `&place_id=${needed[0]}`;
      const fullUrl = `${URL_PLACE_DETAILS}/${OUTPUT_TYPE}?${PARAMS}`
      console.log('URL')
      // CALL API GOOGLE
      // await axios.get()

      // Open data file
      const buff = fs.readFileSync('placeDetails.json', 'utf8');
      let data = JSON.parse(buff);
      data = data.results[0];
      // console.log('DATA', data);
      // for (result of data.results) {
      //   if (needed[0] === result.place_id) {
      //     console.log('Name:', result.name);
      //     console.log('ID:', result.place_id);
      //     console.log();
      //   }
      // }
      return res.status(200).send(data);
    } catch (error) {
      console.error(error);
      return res.status(500).send('nok');
    }
  },

  // !?! useless
  // getPictureForPlaceDetails: async (req, res, next) => {
  //   console.log('\ngetPictureForPlaceDetails')
  //   console.log(req.params);
  //   const { photoReference } = req.params; // ! to use later
  //   const pictureInfo = [{
  //     height: 4160,
  //     html_attributions: ['Array'],
  //     photo_reference: 'CmRaAAAABHPuoOfgLz_DkMAM8M6F8YjHdwqJ06mKofka1ogo-En1Gx_y9syLsk_5rvdNcUbxMEasIlmbnoFKd9QiyOjt2davqFQphTUeugEKyxLEgsvhS19vEUuIwo7upji7MhWHEhAvfgIVuvFQpwKWuTIoaWqNGhRJ9pfVY5Ol6ZA8fyaIASao_o9PNQ',
  //     width: 3120
  //   }]; // ! data provided by client
  //   console.log(pictureInfo, pictureInfo.length);
  //   if (pictureInfo.length < 1) return;
  //   try {
  //     let PARAMS = `key=${GOOGLE_API_KEY}`;
  //     PARAMS += '&maxwidth=500';
  //     PARAMS += `&photoreference=${pictureInfo[0].photo_reference}`;
      
  //     const fullUrl = `${URL_PLACE_PHOTO}?${PARAMS}`;
  //     console.log('GET PHOTO DETAILS URL', fullUrl)
  
  //     // const response = await axios({
  //     //   method: 'GET',
  //     //   url: fullUrl,
  //     // });
  
  //     // console.log(response)
  //     // console.log(response.status)
  
  //     // * ouvre le fichier raw stream
  //     const imgStream = fs.readFileSync('./detailsPhoto.rawStream');
  //     // console.log('imgStream', imgStream.toString('base64'));
  //     // // * stocke la data recu de l'api google dans le fichier ./detailsPhoto
  //     // const fd = fs.openSync('./detailsPhoto', 'w');
  //     // // const jsonData = JSON.stringify(response.data);
  //     // const R = fs.writeSync(fd, response.data);
  //     // fs.closeSync(fd);
  
  
  //     return res.status(200).set('Content-Type', 'image/png').send(imgStream);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // },

};
