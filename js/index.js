 // Index file containing the javascript components for
 // Example react project

 import { MyForm } from './Form.js'

 ReactDOM.render(
   React.createElement("div", {className: "navigation"},
    React.createElement(MyForm, {value: ""})
  ),document.getElementById('app')
 );
