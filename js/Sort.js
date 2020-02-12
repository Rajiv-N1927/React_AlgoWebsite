/*
  To be modified into a topbar containing the sorting algorithms on a drop-
  down menu.
*/
export class Sort {
  //Map requires key, size
  constructor(map, listener) {
    //Takes in a map of the keyPairs (key, size) and the length of the map
    this.map = map;
    this.listener = listener;
    this.toggleInterval = false
    //Interval speed
    this.speed = 100;
    this.sort = this.sort.bind(this)
    this.toggleSort = this.toggleSort.bind(this)
    this.updateSpeed = this.updateSpeed.bind(this)
    this.generateAnimations = this.generateAnimations.bind(this)
  }

  updateSpeed(newSpeed) {
    clearTimeout(this.active)
    this.speed = newSpeed
  }

  toggleSort() {
    this.toggleInterval = !this.toggleInterval
    this.sort()
  }

  generateAnimations() {
    let array = Array.from(new Array(5*this.map.length), (x, i) => i)
    return array
  }

  //Get the
  sort() {
    if ( this.toggleInterval ) {
      const bars = document.getElementsByClassName('bar')
      const newArr = this.generateAnimations()
      newArr.forEach(idx => {
        console.log(idx)
        let bgCol = `rgb(${getRandomInt(255)}, ${getRandomInt(255)}, ${getRandomInt(255)})`
        this.active = setTimeout(() => {
            this.map[idx % this.map.length].bgCol = bgCol;
            this.listener(this.map)
        }, idx * this.speed);
      });
    }
  }
}

const getRandomInt = max => {
  return Math.floor(Math.random() * Math.floor(max));
}

const swap = (arr, x, y) => {
  return [
    ...arr.slice(0, x), arr[y], ...arr.slice(x+1, y), arr[x], ...arr.slice(y+1)
  ]
}
