/*
  To be modified into a topbar containing the sorting algorithms on a drop-
  down menu.
*/
export class Sort {
  //Map requires key, size
  constructor(map, listener) {
    this.map = map;
    //Takes in a map of the keyPairs (key, size) and the length of the map
    this.listener = listener;
    this.key = map.length-1;
    this.sort = this.sort.bind(this)
  }

  // Placeholder code to ensure the listener works
  sort(e) {
    this.map = swap(this.map, 0, 10)
    this.listener( this.map )
    // console.log(this.map)
  }
}

const swap = (arr, x, y) => {
  return [
    ...arr.slice(0, x), arr[y], ...arr.slice(x+1, y), arr[x], ...arr.slice(y+1)
  ]
}
