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
        disabled: false,
        map: Array.from(new Array(props.numBars), (x, i) => {
          return {
            key: i + props.maxHeight.toString(),
            height: Math.random()*props.maxHeight + props.bias,
            //bgCol: "white"
          }
        })
      };
      this.sorter = new Sort( this.state.map, (newMap, disabled) =>
        this.setState({map: newMap, disabled: disabled}))

      this.refreshBars = this.refreshBars.bind(this)
    }

    refreshBars() {
      let newMap = Array.from(new Array(this.state.numBars), (x, i) => {
        return {
          key: i + this.props.maxHeight.toString(),
          height: Math.random()*this.props.maxHeight + this.props.bias,
          bgCol: "white"
        }
      })
      this.sorter = new Sort( newMap, (map, disabled) => this.setState({map: map, disabled: disabled}))
      this.setState({
        map: newMap
      })
    }

    render() {
      let list = ["Bubble Sort", "Quick Sort", "Merge Sort", "Heap Sort"]
      return [
        React.createElement(NavigationBar, {
          items: list,
          listener: newSpeed => { this.sorter.updateSpeed(newSpeed) }
        }),
        vertBars({
            ...this.state,
            sortHandler: this.sorter.toggleSort,
            refreshHandler: this.refreshBars,
          })
      ]
    }
  }

  VertBarDisplay.defaultProps = {
    numBars: 20,
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
            className: "bar",
            //id: `${props.map[i].key}`,
            key: `${props.map[i].key}`,
            size: props.map[i].height,
            style: {
              width: `${barWidthAsPercentage}%`,
              height: `${props.map[i].height}vh`,
              //backgroundColor: props.map[i].bgCol
            }
          }, /*`${roundDown(props.map[i].height, 2)}`*/)
      ), React.createElement("div", {className: "buttonContainer"},
          React.createElement("button", {
          className: "customButton sort",
          onClick: props.sortHandler,
          disabled: props.disabled,
          key:"sortButton"
        }, "Sort"), React.createElement("button", {
          className: "customButton refresh",
          onClick: props.refreshHandler,
          disabled: props.disabled,
          key:"refreshButton"
        }, "Refresh")
      )
    )
  }
