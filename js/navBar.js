/*
  Navigation bar contains drop down menu for different sorting algo's
  and sliders for different speeds
*/
const rce = React.createElement;

export class NavigationBar extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {
    return rce("div", {className: "navBar"},
      rce(DropDown, {items: this.props.items, listener: this.props.algoListener}),
      rce(Slider, {baseSpeed: this.props.baseSpeed, listener: this.props.speedListener})
    )
  }

}

class Slider extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      value: props.baseSpeed
    }
    //Listener for updating speed of bar sort transition in Sort.js
    this.listener = props.listener
    this.updateSlider = this.updateSlider.bind(this)
  }

  updateSlider(e) {
    this.setState({value: e.target.value})
    this.listener(parseInt(this.state.value))
  }

  render() {
    return rce("div", {className: "sliderContainer"},
      rce("input", {
        type: "range",
        className: "slider",
        min: "5",
        max: "50",
        value: this.state.value,
        onChange: this.updateSlider
      }, null), rce("p", {}, `Speed: ${this.state.value}ms`))
  }
}

//Need to pass a listener into the dropdown

class DropDown extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      activated: props.items[0],
      toggled: false
    }
    this.listener = props.listener
    this.clickHandler = this.clickHandler.bind(this)
    this.toggleMenu = this.toggleMenu.bind(this)
  }

  /*
    Change the current activated item.
  */

  clickHandler(e) {
    this.setState({ activated: e.target.innerHTML })
    this.listener(e.target.innerHTML)
  }

  /*
    When entering and exiting the menu the class 'show' is added to the div
    to show the dropdown menu
  */

  toggleMenu(e) {
    this.setState({
      toggled: !this.state.toggled
    })
  }

  render() {
    let props = {
      active: this.state.activated,
      items: this.props.items.filter(item => item !== this.state.activated),
      handler: this.clickHandler,
      toggleHandler: this.toggleMenu,
      toggled: this.state.toggled
    }
    return dropDown(props)
  }
}

export const dropDown = (props) => {
  return rce("ul", {className: "navContainer"},
    rce("div", {
        key: props.active + "0",
        onMouseEnter: props.toggleHandler,
        onMouseLeave: props.toggleHandler
      }, rce("a", {}, props.active),
      rce("div", {
        className: props.toggled ? "dropDown show" : "dropDown"
      }, props.items.map( (x, i) => rce("li",
          {key: x + i.toString(), onClick: props.handler}, rce("a", {
            onClick: props.handler
          }, x))
        ),
      )
    )
  )
}
