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
    let array = Array.from(new Array(this.map.length), (x, i) => i)
    return array
  }

  bubbleSortTimeline() {
    let timeline = [] // Tuple containing index and if a swap occurs
    let tempMap = this.map
    let swapped = false;
    let iteration = 0;
    do {
      swapped = false;
      for ( let idx = 0; idx < tempMap.length - iteration - 1; idx++ ) {
        let tuple = { index: idx, swapped: false }
        if ( tempMap[idx].height > tempMap[idx+1].height ) {
          tuple.swapped = true
          tempMap = swap(tempMap, idx, idx+1);
          swapped = true;
        }
        timeline.push(tuple)
      }
      iteration += 1;
    } while ( swapped )
    return timeline
  }

  //Get the
  sort() {
    if ( this.toggleInterval ) {
      this.listener(this.map, true)
      const timeline = this.bubbleSortTimeline()
      console.log(timeline)
      timeline.forEach((props, idx) => {
        this.active = setTimeout(() => {
            if ( props.swapped ) {
              this.map = swap(this.map, props.index, props.index + 1);
            }
            if ( idx >= timeline.length - 1)
              this.listener(this.map, false)
            else {
              this.listener(this.map, true)
            }
        }, idx * this.speed);
      });
    }
  }
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function swap(arr, x, y) {
  return [
    ...arr.slice(0, x), arr[y], ...arr.slice(x+1, y), arr[x], ...arr.slice(y+1)
  ]
}
