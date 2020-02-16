/*
  To be modified into a topbar containing the sorting algorithms on a drop-
  down menu.
*/
import {
  swap,
  resize,
  bubbleSortTimeline,
  mergeSortTimeline,
  quickSortTimeline,
  heapSortTimeline
} from "./Algorithms.js"

export class Sort {
  //Map requires key, size
  constructor(props, listener) {
    //Takes in a map of the keyPairs (key, size) and the length of the map
    this.map = props.map;
    this.speed = props.sortSpeed;
    this.algo = props.algo;

    this.listener = listener;

    this.sort = this.sort.bind(this)
    this.toggleSort = this.toggleSort.bind(this)
    this.updateSpeed = this.updateSpeed.bind(this)
  }

  updateSpeed(newSpeed) {
    this.speed = newSpeed
  }

  updateAlgorithm(algo) {
    this.algo = algo
  }

  /*
    Make this smaller by passing the algorithm into "this.algo"
    rather than using a switch statement
  */
  toggleSort() {
    let timeline = new Array()
    let sortType = true
    switch(this.algo) {
      case "BubbleSort":
        timeline = bubbleSortTimeline(this.map)
        console.log("bubble")
      break;
      case "MergeSort":
        timeline = mergeSortTimeline(this.map)
        sortType = false;
        console.log("merge")
      break;
      case "QuickSort":
        timeline = quickSortTimeline(this.map)
      break;
      case "HeapSort":
        timeline = heapSortTimeline(this.map)
      break;
      default:
        console.log(this.algo)
    }
    this.sort(timeline, sortType)
  }

  /*
    swapType merely means that the sorting algorithm includes swapping elements
    as its method of sorting. Otherwise just resize the element. Resizing
    in my opinion is pretty rudimentary and not as intuitive to look at.
  */
  sort(timeline, swapType) {
    // mergeSortTimeline(this.map)
    this.listener(this.map, true)
    timeline.forEach((props, idx) => {
      this.active = setTimeout(() => {
          if ( !swapType ) resize(this.map, props.idx, props.height)
          else if ( props.swapped ) {
              swap(this.map, props.idx, props.idxSwapped);
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
