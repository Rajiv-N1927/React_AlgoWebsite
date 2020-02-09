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
    this.toggleInterval = false
  }

  // Placeholder code to ensure the listener works
  sort() {
    if ( this.toggleInterval == false ) {
      this.active = setInterval(() => {
        this.map.forEach((item, i) => {
          if ( i > 0 )
            this.map = swap(this.map, i-1, i)
        })
        this.listener( this.map )
      }, 100)
    }
    else
      clearInterval(this.active)
    this.toggleInterval = !this.toggleInterval
  }
}

const swap = (arr, x, y) => {
  return [
    ...arr.slice(0, x), arr[y], ...arr.slice(x+1, y), arr[x], ...arr.slice(y+1)
  ]
}
