 import { Sort } from './Sort.js'
 import { NavigationBar } from './navBar.js'
/*
  Generates verticle bars of randomized sizes
*/

  export class VertBarDisplay extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        numBars: props.numBars,
        parentWidth: props.containerWidth,
        percentageWidth: props.containerPercentageWidth,
        map: Array.from(new Array(props.numBars), (x, i) => {
          return {
            key: i,
            height: Math.random()*props.maxHeight + props.bias
          }
        })
      };
      this.sorter = new Sort(this.state.map, (newMap, newLength) =>
        this.setState({map: newMap, numBars: newLength})
      )
    }

    componentDidMount() {
      this.sorter.sort() // Hacky fix need to resolve this problem
    }

    render() {
      console.log("disp", this.state.numBars)
      let list = ["BubbleSort", "QuickSort", "MergeSort", "HeapSort"]
      return [
        React.createElement(NavigationBar, {items: list}),
        vertBars({...this.state, clickHandler: this.sorter.sort})
      ]
    }
  }

  VertBarDisplay.defaultProps = {
    numBars: 40,
    containerPercentageWidth: 0.7,
    bias: 5,
    maxHeight: 40 //Given in terms of viewport height
  }

  //Takes in the number assuming a float, and the number of places it must be
  // Rounded to
  //E.g.
  export function roundDown(floatNum, toPlace) {
    let places = Math.pow(10, toPlace)
    return Math.round( floatNum * places ) / places
  }

  /*
    Generate verticle bars given the app width and percentage taken up by
    parent class holding the verticle bars.
    E.g. width of #app is 1000px and the verticle bar container is 60% of that
    size which is 600px. If you need to generate 20 verticle bars with a margin-
    left of 1px then each bar must be (600/20 - 1)px wide each. -> Translate
    to a percentage to make it responsive.
  */

  export const vertBars = (props) => {
    const margin = 1;
    let singleWidth = (props.parentWidth*props.percentageWidth)/(props.numBars+1);
    let barWidth = singleWidth - margin;
    let barWidthAsPercentage = parseFloat((100*barWidth/(props.parentWidth*props.percentageWidth)).toFixed(7));
    barWidthAsPercentage = roundDown(barWidthAsPercentage, 5);
    return React.createElement(
      "div", {
        className: "vBarBox",
        style: {width: `${props.percentageWidth*100}%`},
        key:"vBarBox"
      }, Array.from(new Array(props.numBars), (item, i) =>
        React.createElement("div",
          {
            className: "barTest",
            id: `${props.map[i].key}`,
            key: `${props.map[i].key}`,
            size: props.map[i].height,
            style: {
              width: `${barWidthAsPercentage}%`,
              height: `${props.map[i].height}vh`
            }
          }
        )
      ), React.createElement("button", {
        className: "sortButton",
        onClick: props.clickHandler,
        key:"vBarButton"
      }, "Add")
    )
  }
