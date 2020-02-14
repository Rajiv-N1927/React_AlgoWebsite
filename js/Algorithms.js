export function bubbleSortTimeline(map) {
  let timeline = [] // Tuple containing index and if a swap occurs
  let tempMap = map.slice()
  let swapped = false;
  let iteration = 0;
  do {
    swapped = false;
    for ( let idx = 0; idx < tempMap.length - iteration - 1; idx++ ) {
      let tuple = { idx: idx, idxSwapped: -1, swapped: false }
      if ( tempMap[idx].height > tempMap[idx+1].height ) {
        tuple.idxSwapped = idx + 1;
        tuple.swapped = true;
        tempMap = swap(tempMap, idx, idx+1);
        swapped = true;
      }
      timeline.push(tuple)
    }
    iteration += 1;
  } while ( swapped )
  return timeline
}

// Try to make this a little better if possible
export function mergeSortTimeline(map) {
  let timeline = new Array();
  let tempMap = map.slice()
  merge_sort(tempMap, 0, map.length - 1, timeline);
  return timeline
}

function merge_sort(map, start, end, timeline) {
  // const mid = roundDown((start + end)/2, 0);
  // console.log(map)
  // merge(map, start, mid, end, timeline);
  const mid = roundDown((start + end - 1)/2, 0);
  if ( end - start >= 1) {
    merge_sort(map, start, mid, timeline)
    merge_sort(map, mid + 1, end, timeline)
    merge(map, start, mid, end, timeline)
  }
}

function merge(map, start, mid, end, timeline) {
  let startpos = start, midpos = mid + 1;
  let test = start
  let tempArr = new Array(end - start + 1)
  let it = 0;
  for ( let idx = start; idx <= end; idx++ ) {
    if ( startpos > mid ) {
      tempArr[it++] = map[midpos++]
    }

    else if ( midpos > end ) {
      tempArr[it++] = map[startpos++]
    }

    else if ( map[startpos].height < map[midpos].height ) {
      tempArr[it++] = map[startpos++]
    }

    else {
      tempArr[it++] = map[midpos++]
    }
  }

  for ( let idx = 0; idx < it; idx++ ) {
    let tuple = {idx: test, height: tempArr[idx].height}
    map[test++] = tempArr[idx]
    timeline.push(tuple)
  }
}

export function quickSortTimeline(map) {
  let timeline = new Array();
  return timeline
}

export function resize(arr, idx, height) {
  arr[idx].height = height;
}
// Swap by index number in array. x must be less than y
export function swap(arr, x, y) {
  return [
    ...arr.slice(0, x), arr[y], ...arr.slice(x+1, y), arr[x], ...arr.slice(y+1)
  ]
}

//Takes in the number assuming a float, and the number of places it must be
// Rounded to
//E.g.
export function roundDown(floatNum, toPlace) {
  let places = Math.pow(10, toPlace)
  return Math.round( floatNum * places ) / places
}
