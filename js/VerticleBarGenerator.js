/*
  Generates verticle bars of randomized sizes
*/

  let vBarBoxWidth = 0.6;

  export class VertBars extends React.Component {
    constructor(props) {
      super(props)
      const width = document.getElementById(this.props.parentIdName).getBoundingClientRect().width
      this.state = {
        items: vertBars({
          numBars: this.props.numBars,
          parentWidth: width,
          percentageWidth: vBarBoxWidth,
          bias: 5
        })
      };
      this.handleBarModification = this.handleBarModification.bind(this);
    }

    modifyBarStyle(item, changedStyle) {
      return React.createElement(item.type, {
        className: item.props.className,
        style: Object.assign({}, item.props.style, changedStyle),
        key: item.key,
        id: item.key
      })
    }

    handleBarModification(e) {
      let randomItem = this.state.items.slice(0)[0];
      let bounds = document.getElementById(randomItem.props.id).getBoundingClientRect()
      this.setState(
        {
          items: this.state.items.map((item, i) => {
            //Define style props
            console.log(document.getElementById(item.props.id).getBoundingClientRect())
            if ( i % 2 == 0 ) {
              let bgColor = item.props.style.backgroundColor === "blue" ? "red" : "blue"
              return this.modifyBarStyle(item,
                {transform: `translateY(${bounds.y}px)`})
            } else {
              return this.modifyBarStyle(item,
                {transform: `translateY(${-bounds.y}px)`}
              )
            }
          })
        }
      )
    }



    render() {
      return [React.createElement(
        "div", {
          className: "vBarBox",
          style: {width: `${vBarBoxWidth*100}%`},
          key:"vBarBox"
        }, this.state.items
      ),
      React.createElement("button", {
        className: "sortButton",
        onClick: this.handleBarModification,
        key:"vBarButton"
      }, "Sort")]
    }

  }
  VertBars.defaultProps = {
    numBars: 20
  }

  export function roundDown(floatNum, places) {
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
    barWidthAsPercentage = roundDown(barWidthAsPercentage, 10000);

    //Checking the widths
    console.log(barWidth + " " + barWidthAsPercentage);
    console.log(props.parentWidth + " " + barWidth);

    let myArr = []
    for (let i = 0; i < props.numBars; i++) {
      let height = 40*Math.random()+props.bias;
      myArr.push(
        React.createElement("div",
          {
            className: "barTest",
            id: `${i}`,
            key: `${i}`,
            style: {
              width: `${barWidthAsPercentage}%`,
              height: `${height}vh`
            }
          }
        )
      )
    }
    return myArr
  }
