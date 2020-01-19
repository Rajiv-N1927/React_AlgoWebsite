import Scope from './Scope.js'
import { Timer, TimerDisplay } from './Timer.js'
const createElement = React.createElement

//Lean variables
const lean_amp     = 0.3;
const lean_const   = 0.0;
//Height variables
const height_amp   = 0.4;
const height_const = 0.2;

class ScopeDemo extends React.Component {
  constructor(props) {
    super(props)
    this.state = { time: 0, active: false }
    this.timer = new Timer(() => this.setState({ time: this.timer.time }))
    this.callbacks = {
      onStart: () => { this.timer.start(); this.setState({ active: true }) },
      onStop: () => { this.timer.stop(); this.setState({ active: false }) },
      onReset: () => { this.timer.reset(); this.setState({ time: 0 }) },
    }
  }

  render() {
    // `Math.sin` converts time into a number that cycles between -1 and 1
    const lean = lean_const + lean_amp*Math.sin(this.state.time/2)
    const heightFactor = height_const + height_amp*Math.sin(this.state.time)

    const displayProps = Object.assign({}, this.state, this.callbacks)
    return createElement('div', null,
      createElement(TimerDisplay, displayProps),
      createElement('br'),
      createElement(Scope, { title: 'lean', x: lean }),
      createElement(Scope, { title: 'heightFactor', y: heightFactor })
    )
  }
}

ReactDOM.render(
  createElement(ScopeDemo),
  document.getElementById('app')
)
