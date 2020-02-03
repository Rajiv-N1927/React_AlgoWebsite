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
    this.key += 1;
    this.listener(
      [...this.map, this.map.push({key: this.key,
        height: Math.random()*40 + 5})], this.key
    )
  }

}
