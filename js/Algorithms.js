export function bubbleSortTimeline(map) {
  let timeline = [] // Tuple containing index and if a swap occurs
  let tempMap = map
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

export function mergeSortTimeline(map) {

}

export function swap(arr, x, y) {
  return [
    ...arr.slice(0, x), arr[y], ...arr.slice(x+1, y), arr[x], ...arr.slice(y+1)
  ]
}
