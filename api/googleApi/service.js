

module.exports = {
  /**
   * Take an array of coordinates
   * like [[longitude, latitude], [longitude, latitude], ...]
   * Return the average [longitude, latitude]
   */
  getBarycentre: (coordinates) => {
    const { coordonnees } = req.body;
    console.log('coordonnees', coordonnees);
    let long = 0;
    let lat = 0;
    for (const elem of coordonnees) {
      long += parseFloat(elem[0]);
      lat += parseFloat(elem[1]);
    }

    // console.log('LONG LAT', [long, lat]);
    long = long / coordonnees.length
    lat = lat / coordonnees.length
    console.log('LONG LAT', [long, lat]);
    
    return ([long, lat]);
  },
}