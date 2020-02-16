export function resize(arr, idx, height) {
  arr[idx].height = height;
}
// Swap by index number in array. x must be less than y
export function swap(arr, x, y) {
  if ( x != y ) {
    let temp = arr[x]
    arr[x] = arr[y]
    arr[y] = temp
  }
}

//Takes in the number assuming a float, and the number of places it must be
// Rounded to
//E.g.
export function roundDown(floatNum, toPlace) {
  let places = Math.pow(10, toPlace)
  return Math.round( floatNum * places ) / places
}


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
        swap(tempMap, idx, idx+1);
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

/*
  Merge sort
  -> O(log2) division of the input elements
  -> O(n) iteration for merging
  -> Total O(n*logn)
  -> Space complexity O(n) unless you do some funky linked list stuff
*/

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

/*
  Quick sort implementation
  -> Partitioning around the last node
  -> Might update to Hoare's algorithm
  -> O(log(n)) resursion
  -> O(n) Partitioning
  -> Total O(nlogn) (Average case) -> Worst case O(n^2)
     O(n^2) occurs because in a sorted list the partition only divides elements
     into size 1. Basically you iterate over the whole thing O(n) together
     with the partition which is O(n), translates to O(n^2)
  -> Space complexity O(n)
*/

export function quickSortTimeline(map) {
  let timeline = new Array();
  let tempMap = map.slice()
  quicksort(tempMap, 0, tempMap.length - 1, timeline)
  return timeline
}

function quicksort(map, lo, hi, timeline) {
  if ( lo < hi ) {
    let part = partition(map, lo, hi, timeline)
    quicksort(map, lo, part - 1, timeline)
    quicksort(map, part + 1, hi, timeline)
  }
}

function partition(map, lo, hi, timeline) {
  let compare = map[hi];
  let pivot = lo - 1;
  for ( let idx = lo; idx <= hi; idx++ ) {
    if ( compare.height > map[idx].height ) {
      pivot++;
      swap(map, pivot, idx)
      timeline.push({ idx: idx, idxSwapped: pivot, swapped: true })
    } else {
      timeline.push({ idx: idx, idxSwapped: -1, swapped: false })
    }
  }
  swap(map, pivot + 1, hi)
  timeline.push({ idx: pivot + 1, idxSwapped: hi, swapped: true })
  return pivot + 1
}


/*
  Heap sort implementation
  - Bug were the last item is the second largest
  - Needs to be better optimised
*/

export function heapSortTimeline(map) {
  let timeline = new Array();
  let tempMap = map.slice()
  heapsort(tempMap, tempMap.length - 1, timeline)
  console.log(tempMap)
  return timeline
}

const parent = idx => roundDown((idx-1)/2, 0)
const left = idx => 2*idx + 1
const right = idx => 2*idx + 2

function heapsort(map, length, timeline) {
  heapify(map, 0, length, timeline) // Maxheap
  let end = length;
  while(end > 0) {
    swap(map, end, 0);
    timeline.push({idx: end, idxSwapped: 0, swapped: true})
    end--;
    heapify(map, 0, end, timeline) //Heap changed reheapify
  }
}

function heapify(map, idx, length, timeline) {
  if ( idx == length ) return
  let swapIdx = idx + 1
  const leftNode = left(idx)
  const rightNode = right(idx)

  let tuple = {idx: idx, idxSwapped: -1, swapped: false}

  if ( map[leftNode].height > map[idx].height ) {
    swap(map, leftNode, idx)
    swapIdx = parent(idx)
    timeline.push({idx: idx, idxSwapped: leftNode, swapped: true})
  }

  if ( rightNode <= length && map[rightNode].height > map[idx].height ) {
    swap(map, rightNode, idx)
    swapIdx = parent(idx)
    timeline.push({idx: idx, idxSwapped: rightNode, swapped: true})
  }
  if ( left(swapIdx) <= length ) heapify(map, swapIdx, length, timeline)
}
