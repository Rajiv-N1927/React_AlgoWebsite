/*
  To be modified into a topbar containing the sorting algorithms on a drop-
  down menu.
*/
import {
  swap,
  resize,
  bubbleSortTimeline,
  mergeSortTimeline
} from "./Algorithms.js"

export class Sort {
  //Map requires key, size
  constructor(map, sortSpeed, listener) {
    //Takes in a map of the keyPairs (key, size) and the length of the map
    this.map = map;
    this.listener = listener;
    this.toggleInterval = false
    //Interval speed
    this.speed = sortSpeed;
    this.sort = this.sort.bind(this)
    this.bubbleSort = this.bubbleSort.bind(this)
    this.mergeSort = this.mergeSort.bind(this)
    this.toggleSort = this.toggleSort.bind(this)
    this.updateSpeed = this.updateSpeed.bind(this)
    this.generateAnimations = this.generateAnimations.bind(this)
  }

  updateSpeed(newSpeed) {
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

  /*
    Add in algorithm for swapping out sort and timeline in this function
    E.g. sort(algorithm, timeline) ->
      timeline.forEach((props, i) => {
        algorithm(props)
            .
            .
            .
  */
  sort() {
    // mergeSortTimeline(this.map)
    this.listener(this.map, true)
    this.mergeSort()
  }

  mergeSort() {
    const timeline = mergeSortTimeline(this.map)
    timeline.forEach((props, idx) => {
      this.active = setTimeout(() => {
          resize(this.map, props.idx, props.height)
          if ( idx >= timeline.length - 1)
            this.listener(this.map, false)
          else {
            this.listener(this.map, true)
          }
      }, idx * this.speed);
    });
  }

  bubbleSort() {
    const timeline = bubbleSortTimeline(this.map)
    timeline.forEach((props, idx) => {
      this.active = setTimeout(() => {
          if ( props.swapped ) {
            this.map = swap(this.map, props.idx, props.idxSwapped);
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

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}
