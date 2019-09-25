/**
 * UTILITY FUNCTIONS
 * 
 */
import $ from "jquery";
import navBar from "../theme/nav_bar.html"
import * as contentSCM from "../modules/article/article";

// CONFIGS
const rabbitEndpointURL = "http://POST_ENDPOINT_URL";
const secureAuthCredential = {
  user: "asdfasdn@sdfasdfasdfasd.com",
  pass: "YOUR PASSWORD",
};

/**
 *  Helper function to dynamically create Web Workers.
 */
export function createWorker(fn) {
  var blob = new Blob(["self.onmessage = ", fn.toString()], {
    type: "text/javascript"
  });
  var url = window.URL.createObjectURL(blob);
  return new Worker(url);
}

/**
 * Example function on how Web Worker can fetch data in background.
 * Watch console.log for more details.
 * 
 * Important Note: Web Workers run in different context.
 * It doesn't have access to any of the above functions or variables.
 * All utility functions or variables must passed or decalred inside WW functions. 
 */
// Inline Web Worker Dynamic Function
export const dynamicWorker = function (e) {
  // Absolute path of library files. Because Web Workers run in different context.
  importScripts("http://localhost/inline-cms/dist/libs/worker-libs.js");
  console.log('WEB WORKER READY', 'READY TO LISTEN YOUR COMMANDS');
  const DataAPI = `https://YOUR_DATA_ENDPOINT/`;
  const nid = 1122333333;
  let count = 0;
  let bentoNID = `asdfas${nid}`;
  let bentoQuery = `?`;
  load(`${DataAPI}${bentoQuery}`, function (xhr) {
    const result = xhr.responseText;
    const nodeObject = JSON.parse(result);
    const bentoDataList = nodeObject.data.search.items;
    self.postMessage(bentoDataList);
  }); 
};

/**
 * WSYWIG INITIALIZATION.
 * "example" is a custom wsywig plugin for "all purpose widget"
 */
export const dfreeBodyConfig = {
  selector: ".dfree-body",
  menubar: true,
  inline: true,
  theme: "inlite",
  height: "680",
  inline_styles: true,
  extended_valid_elements: "section[*]",
  verify_html: false,
  content_css: "styles/custom_content.css",
  plugins: [, "lists", "image", "example"],
  toolbar: [
    "example lists image alignleft aligncenter alignright alignfull | numlist bullist outdent indent"
  ],
  insert_toolbar: "example rock_media | h1 h2 h3 | blockquote",
  selection_toolbar:
    " h1 h2 h3 | alignleft aligncenter alignjustify  | blockquote"
};

/**
 * Generic slugify helper function.
 */
export function slugify(text = "") {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/[^\w\-]+/g, "") // Remove all non-word chars
    .replace(/\-\-+/g, "-") // Replace multiple - with single -
    .replace(/^-+/, "") // Trim - from start of text
    .replace(/-+$/, ""); // Trim - from end of text
}

/**
 * Helper function to create UUID, FID
 * @param {*} brand 
 * @param {*} type 
 * @param {*} uid 
 * @param {*} lastNum 
 * @param {*} prefix 
 */
export function generateUID(brand = 'news', type = 'article', uid = '16011114', lastNum = 1000000, prefix = '') {

  return { 
    nid: `1234`,
    uid: `1234`,
    fid: 12234
  }
}

/**
 * Screencapture helper function to take snapshot of any given DOM elements.
 * This is used to render "related" or "video thumb" within WSYWIG.
 */
export function injectScreenCapTool () {
  var script = document.createElement("script");
  script.src = `https://cdnjs.cloudflare.com/ajax/libs/html2canvas/0.4.1/html2canvas.min.js`;
  document.body.appendChild(script);
  var script = document.createElement("script");
  script.innerText = 'function report() {' +
    'let region = document.querySelector(".headshot___3D_6B");' +
    'html2canvas(region, { "logging": true, useCORS: true, ' +
    'onrendered: function(canvas) {' +
    'let pngUrl = canvas.toDataURL();' +
    'let img = document.querySelector(".screen");' +
    'img.src = pngUrl; ' +
    'tinymce.get(\'tinymce-content-body\').insertContent(`<img src = "${pngUrl}">`);' +
    '},' +
    '});' +
    '}';
  document.head.appendChild(script);

  let div = document.createElement('div');
  div.innerHTML = '' +
    //'<button onclick="report()">Take screenshot</button>' +
    '<div class="container">' +
    '<img width="0%" class="screen">' +
    '</div>';
  let ref = document.querySelector('body');
  ref.parentNode.insertBefore(div, ref);

}

/**
 * Sample byline helper DOM element.
 */
export const byLine= `<select id = "select_byline">
  <option value="">Select a byline</option>
  <option value="Anna Brand">Anna Brand</option>
  <option value="David Firestone">David Firestone</option>
  <option value="Kim Catherine">Kim Catherine</option>
  <option value="Danielle">Danielle</option>
</select>
`;

/**
 * Top menu bar.
 * This gets injected and always visible to perform multiple operations.
 */
export function injectTopControl() {
  let body;
  let pageLayout = `<div class="container-fluid">
  <div class="row">
    <div class="col-lg main_body" style = "max-width: 930px; border-right: 2px solid gray;">
      One of three columns
    </div>
    <div class="col-sm">
      One of three columns
      <img src = "https://media1.s-nbcnews.com/j/newscms/2018_48/2658901/181126-tijuana-mexico-border-cs-220p_42c864a612d0f11b2aca0b1f757e14dc.fit-760w.jpg" width = "300">
    </div>
  </div>
</div>`;

  let navBarDOM = document.createElement("div");
  navBarDOM.innerHTML = navBar;

  let pageLayOutDOM = document.createElement("div");
  pageLayOutDOM.innerHTML = pageLayout;

  body = document.getElementsByTagName("body")[0];
  if ($('.rock_nav_bar').length == 0) body.insertBefore(navBarDOM, document.body.firstChild);

  // THIS SHOULD BE ON handler
  document.querySelector(".publish_content").addEventListener("click", event => {
    utility
      .postData(rabbitEndpointURL + "secure-auth", secureAuthCredential)
      .then(data => {
        console.log("SEC AUTH DATA: ", data.token);
        utility.postRabbitMQ(data.token, {
          title:
            document.querySelector("h1").innerText ||
            document.querySelector("h1").textContent,
          content: tinyMCE.activeEditor.getContent()
        });
      })
      .catch(error => console.error(error));
  });
}

/**
 * Helper function to make AJAX POST request.
 * @param {*} url 
 * @param {*} data 
 */
export function postData(url = ``, data = {}) {
  // Default options are marked with *
  return fetch(url, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, cors, *same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    // credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json"
      // "Content-Type": "application/x-www-form-urlencoded",
    },
    redirect: "follow", // manual, *follow, error
    referrer: "no-referrer", // no-referrer, *client
    body: JSON.stringify(data) // body data type must match "Content-Type" header
  }).then(response => response.json()); // parses JSON response into native Javascript objects
}

/**
 * Helper function to make Rabbit POST request.
 * @param {*} token 
 * @param {*} contentObj 
 */
export function postRabbitMQ (token, contentObj) {
  let nid = generateUID("news", "article").nid;
  let articleObj = contentSCM.article();
  articleObj.entry.nid = nid;
  articleObj.entry.content = contentObj.content;
  articleObj.entry.title = contentObj.title || "THIS IS LEFT BLANK BY YOU!!";
  console.log("CONTENT SCM", articleObj);

  postData(rabbitEndpointURL + "rabbit-post", {
    token: token,
    // msg: JSON.stringify(articleObj),
  })
    .then(data => {
      console.log("DATA FROM WareHouse:", data);
      // TO DO: Use the info to notify user about newly created/updated content.
    })
    .catch(error => console.error(error));
}

