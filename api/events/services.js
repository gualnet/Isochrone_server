
module.exports = {

  randomiseGeoloc: (baseCoords) => {
    const baseLat = Number(baseCoords[0]);
    const baseLong = Number(baseCoords[1]);
    // console.log('\n\n')
    // console.log('baseLat', baseLat, typeof(Number(baseLat)))
    // console.log('baseLong', baseLong, typeof(baseLong))
    // je determine un facteur de modification
    let modLat = (Math.floor(Math.random() * 5000) + 500) / 100000;
    let monLon = (Math.floor(Math.random() * 5000) + 500) / 100000;
    // console.log('modLat', modLat, typeof(modLat))
    // console.log('monLon', monLon, typeof(monLon))

    // je modifie le signe du modificateur
    if (Math.floor(Math.random() * 2) === 1) {
      modLat *= -1;
    }
    if (Math.floor(Math.random() * 2) === 1) {
      monLon *= -1;
    }
    // console.log('modLat', modLat, typeof(modLat))
    // console.log('monLon', monLon, typeof(monLon))

    // je modifie la valeur de base
    let newLat = baseLat + modLat;
    let newLong = baseLong + monLon;
    // console.log('newLat', newLat)
    // console.log('newLong', newLong)

    // console.log('\n\n')
    return [newLat, newLong]
  },
};