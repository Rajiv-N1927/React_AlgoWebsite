 // Index file containing the javascript components for
 // Example react project

import { MyForm } from './Form.js'
import { BarDisplay } from './BarDisplay.js'

// for (var i=0;i<=10;i++) {
//    (function(ind) {
//        setTimeout(function(){console.log(ind);}, 1000 * ind);
//    })(i);
// }

ReactDOM.render(
 React.createElement(
   BarDisplay, {
     numBars: 50,
     containerWidth: document.getElementById('app').getBoundingClientRect().width,
   }
 ), document.getElementById('app')
);
