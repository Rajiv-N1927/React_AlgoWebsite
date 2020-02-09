/*
  Navigation bar contains drop down menu for different sorting algo's
  and sliders for different speeds
*/
const rce = React.createElement;

export class NavigationBar extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      dditems: props.items
    }
  }

  render() {
    return rce("div", {className: "navBar"},
      rce(DropDown, {items: this.state.dditems})
    )
  }

}

class Slider extends React.Component {
  constructor(props) {
    this.listener = props.listener
  }

  render() {
    return rce("div")
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
    this.clickHandler = this.clickHandler.bind(this)
    this.toggleMenu = this.toggleMenu.bind(this)
  }

  clickHandler(e) {
    this.setState({ activated: e.target.innerHTML })
  }

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
