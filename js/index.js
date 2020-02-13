 // Index file containing the javascript components for
 // Example react project

import { MyForm } from './Form.js'
import { BarDisplay } from './BarDisplay.js'

ReactDOM.render(
 React.createElement(
   BarDisplay, {
     numBars: 200,
     containerWidth: document.getElementById('app').getBoundingClientRect().width,
   }
 ), document.getElementById('app')
);
