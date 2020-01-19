/**
 * This file defines a component that is used for the demo in
 * main.js. Don't worry if you don't understand it just yet,
 * we'll get to it later.
 */

export default class ReversibleList extends React.Component {
  constructor(props) {
    super(props)
    this.state = { items: props.children.slice(0) }
    this.toggle = this.toggle.bind(this)
  }

  toggle() {
    this.setState({ items: this.state.items.slice(0).reverse() })
    // for ( const ele of this.state.items ) {
    //   console.log(ele.map())
    // }
    this.state.items.map( (x, i) => console.log(x) );
  }

  render() {
    return React.createElement('div', {},
      React.createElement('div', {}, this.state.items.map((x, i) => React.createElement('div', {key: x.key || i}, x)) ),
      React.createElement('button', { onClick: this.toggle }, 'Reverse')
    )
  }
}
