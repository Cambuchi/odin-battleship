// ship factory, needs array of numbers indicating spaces that the ship occupies
const Ship = (array) => {
  // create the initial ship array
  const createShip = (array) => {
    let shipDetails = {};
    array.forEach((space) => {
      shipDetails[space] = 'safe';
    });
    return shipDetails;
  };

  // if ship is hit, change status of index to hit
  const hit = (index) => {
    if (index in info) {
      info[index] = 'hit';
    }
  };

  // check if the ship is sunken
  const isSunk = () => {
    let infoArray = Object.entries(info);
    let infoCheck = infoArray.filter(([key, value]) => {
      return value === 'hit';
    });
    if (array.length === infoCheck.length) {
      return true;
    }
    return false;
  };

  // create the ship as an object of space:status information
  let info = createShip(array);

  return { info, hit, isSunk };
};

export default Ship;
