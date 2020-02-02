 // Index file containing the javascript components for
 // Example react project

 import { MyForm } from './Form.js'
 import { VertBars } from './VerticleBarGenerator.js'

 const numBars = 40;

 ReactDOM.render(
   React.createElement(
     VertBars, {numBars: numBars, parentIdName: "app"}
   ), document.getElementById('app')
 );
