
const createElement = React.createElement;

export class MyForm extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      value: props.value !== undefined ? props.value : "unset"
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.setText = this.setText.bind(this);
  }

  getText() {
    return this.state.value
  }

  setText(e) {
    this.setState({value: e.target.value})
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log(window.screen.height * window.devicePixelRatio)
  }

  render() {
    return createElement('form',{className: "testClass"},
      createElement('input',{
        onChange: this.setText,
        value: this.state.value
      }),
      createElement('button',{
        onClick: this.handleSubmit
      }, "Submit form"),
    )
  }

}
