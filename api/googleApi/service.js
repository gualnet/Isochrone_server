

module.exports = {
  /**
   * Take an array of coordinates
   * like [[latitude, longitude], [latitude, longitude], ...]
   * Return the average [latitude, longitude]
   */
  getBarycentre: (coordinates) => {
    console.log('coordinates', coordinates);
    let long = 0;
    let lat = 0;
    for (const elem of coordinates) {
      long += parseFloat(elem[0]);
      lat += parseFloat(elem[1]);
    }

    // console.log('LAT LONG', [lat, long]);
    lat = lat / coordinates.length
    long = long / coordinates.length
    console.log('LAT LONG', [lat, long]);
    
    return ([lat, long]);
  },
}