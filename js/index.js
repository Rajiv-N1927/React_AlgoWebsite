 // Index file containing the javascript components for
 // Example react project

import { MyForm } from './Form.js'
import { VertBarDisplay } from './VerticleBarGenerator.js'

ReactDOM.render(
 React.createElement(
   VertBarDisplay, {
     numBars: 40,
     containerWidth: document.getElementById('app').getBoundingClientRect().width,
   }
 ), document.getElementById('app')
);
