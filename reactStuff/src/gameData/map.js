const map = [];
const tiles = ['grass'];

(function(arrToFill, size = 15) {
  for (let j = 0; j < size; j++) {
      let arrToPush = [];
    for (let i = 0; i < size; i++) {
      arrToPush.push(tiles[0]);
    }
    arrToFill.push(arrToPush);
    arrToPush = [];
  }
})(map);

export default map;