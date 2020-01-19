import { getBoxStyle } from './Spiral.js'

//  React.createElement('div', { style: getBoxStyle(0), key: '0' }, '1'),


const boxes = []

for ( let i = 1; i <= 15; i++ ) {
  let str = ''
  let type = 'strong';
  if ( i % 3 === 0 ) str += "Fizz";
  if ( i % 5 === 0 ) str += "Buzz";
  if ( str === '' ) {
    str = String(i)
    type = 'div';
  }
  boxes.push(React.createElement(type, { style: getBoxStyle(i-1), key: `${i-1}` }, str));
}

ReactDOM.render(
  React.createElement('div', {}, boxes),
  document.getElementById('app')
)
