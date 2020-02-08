/*
  Navigation bar contains drop down menu for different sorting algo's
  and sliders for different speeds
*/

export class NavigationBar extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      dditems: props.items
    }
  }

  render() {
    return React.createElement("div", {className: "navBar"},
      React.createElement(DropDown, {items: this.state.dditems})
    )
  }

}

class DropDown extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      activated: props.items[0]
    }
    this.clickHandler = this.clickHandler.bind(this)
  }

  clickHandler(e) {
    this.setState({ activated: e.target.innerHTML })
  }

  render() {
    let props = {
      active: this.state.activated,
      items: this.props.items.filter(item => item !== this.state.activated),
      handler: this.clickHandler
    }
    return listGen(props)
  }
}

export const listGen = (props) => {
  return React.createElement("ul", {className: "navContainer"},
    React.createElement("li", {
        key: props.active + "0",
        dangerouslySetInnerHTML: createMarkup(props.active)
      }),
    props.items.map( (x, i) => React.createElement("li",
      {key: x + i.toString(), onClick: props.handler,}, x)), null)
}

function createMarkup(msg) { return {__html: msg + ' &#8250;'}; };
