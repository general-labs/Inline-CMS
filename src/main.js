import $ from "jquery";
import bootstrap from "./vendor/bootstrap/css/bootstrap.min.css";
import popperJS from "./vendor/bootstrap/js/popper.min.js";
import bootstrapJS from "./vendor/bootstrap/js/bootstrap.min.js";
import { show, showHoverIcon } from "./core/core"

/**
The main entry of the application
*/
function app(window) {
  console.log('JS-Widget starting');

  // set default configurations
  let configurations = {
    icms_body: ""
  };

  // all methods that were called till now and stored in queue
  // needs to be called now 
  let globalObject = window[window['JS-Widget']];
  let queue = globalObject.q;
  if (queue) {
    for (var i = 0; i < queue.length; i++) {
      if (queue[i][0].toLowerCase() == 'init') {
        configurations = extendObject(configurations, queue[i][1]);
      }
    }
  }

  // override temporary (until the app loaded) handler
  globalObject.configurations = configurations;
  showHoverIcon(configurations);
}

function extendObject(a, b) {
  for (var key in b)
    if (b.hasOwnProperty(key))
      a[key] = b[key];
  return a;
}

app(window);