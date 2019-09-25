/**
 * CORE INLINE CMS ENGINE
 */
import "../libs/pure_js";
import $ from "jquery";
import tinycme from "../vendor/tinymce/tinymce.min";
import html from "../theme/plugin_helper.html"
import modal from "../theme/modal.html"
import hoverBtn from "../theme/hover_button.html"
import fallbackForm from "../theme/fallback_form.html"
import navBar from "../theme/nav_bar.html"
import './core.css';
import * as utility from "../libs/utility";

const getNodes = str =>
  new DOMParser().parseFromString(str, "text/html").body.childNodes;


/**
 * USE WEB WORKER TO OFFLOAD BEHIND THE SCENE DATA FETCH 
 * FROM WAREHOUSE OR CMS BE.
 * IMPORTANT NOTE: WEB WORKERS RUN IN SEPERATE CONTEXT, ANY 
 * DATA FETCH FUNCTION SHOULD BE INCLUDED IN IMPORT STATEMENT.
 * OTHERWISE, IT WILL NOT WORK. REFER PREVIOUS ROCK PWA REPO.
 */
if (window.Worker) {
  var workerInstance = utility.createWorker(utility.dynamicWorker);
  workerInstance.postMessage("Helloooooo");
  console.log("WEB WORKER STARTED:", "HIIIII")

  workerInstance.onmessage = function (oEvent) {
    console.log("WEB WORKER INFO:", oEvent.data)
  };
}


let elements = [];
let body;
/**
 * Close Modal
 */
const closeWin = () => {
  while (elements.length > 0) {
    elements.pop().remove();
  }
  body.removeEventListener("click", close);
};

/**
 * Main WSYWIG Handler Function.
 */
const showWSYWIG = () => {
  body = document.getElementsByTagName("body")[0];

  let i = 0;
  let reconstructArticleBody = "";
  const articleBodyTagP = document.querySelectorAll(".articleBody p");
  let pCounterI = 0;
  articleBodyTagP.forEach((elem) => {
    let eachItem = elem.innerText || elem.textContent;
    reconstructArticleBody += `<p class = ""> ${eachItem} </p>`;
    pCounterI++;
  });

  let editor = tinymce.EditorManager.get('tinymce-content-body');
  if(!editor){
   tinymce.init(utility.dfreeBodyConfig);
  } else {
    document.querySelectorAll(
      "#tinymce-content-body"
    ).innerHTML = reconstructArticleBody;
  }

  // Let tinyMCE some time to initialize it's files.
  setTimeout(function () {
    tinymce.get('tinymce-content-body').setContent(reconstructArticleBody);
  }, 100);

  // On escape close modal.
  $(body).keydown(function (e) {
    if (e.which == 27) {
      closeWin();
    }
  });

}

/**
 * Main entry point for right side floading button.
 */
export function showHoverIcon(params) {
  console.log("Rock-CMS [Loaded Configs - Core.Js]: ", params);

  /**
   * DETECT IF RAMEN MADE ANY CHANGE IN DOM. 
   * IF SO, USE FALL BACK FORM OR RE-ROUTE TO OTHER UI.
   */
  if (document.querySelector(params.icms_title) === null) {
    alert("It seems to me Ramen FE is broken or changed. Let me give you a fallback page to keep publishing !!!");
    document.getElementsByTagName("body")[0].innerHTML = fallbackForm;
  }

  let temporary = document.createElement('div');
  temporary.innerHTML = hoverBtn;

  let modalDOM = document.createElement('div');
  modalDOM.innerHTML = modal;

  // append elements to body
  body = document.getElementsByTagName('body')[0];
  while (temporary.children.length > 0) {
    body.appendChild(temporary.children[0]);
  }

  body.appendChild(modalDOM);
  let headlineElem = document.querySelector("h1");

  // Get Headline from local storage if found.
  const getHeadline = localStorage.getItem(`main_headline`)
    ? localStorage.getItem(`main_headline`) : (headlineElem.innerText || headlineElem.textContent);
    headlineElem.textContent = getHeadline;

  // On key up store Headline in local storage.
  document.addEventListener("keyup", (e) => {
    localStorage.setItem(`main_headline`, (headlineElem.innerText || headlineElem.textContent));
  });


/**
 * Modify P tags by adding custom class and attributes.
 * This is needed for further calculations and processing.
 */
  let i = 0;
  let pContentBlob = '';
  document.querySelectorAll("p").forEach(elem => {
    let str =
      elem.nodeName == "P"
        ? elem.innerText || elem.textContent
        : elem.innerHTML;
    elem.classList.add("rock_inline_widget");
    elem.classList.add("p_elem");
    elem.setAttribute("data-block", i);

    pContentBlob += `<p class = "rock_wsywig_p_elem" >${str}</p>`;
    i++;
  });

  /**
   * Add mouseover affect on H1 (Title) and Article Deck.
   */
  const h1Deck = document.querySelectorAll("h1, .articleDek");
  h1Deck.forEach((elem) => {

    elem.addEventListener("click", event => {
      elem.contentEditable = true;
      elem.focus();
      elem.style.backgroundColor = "blue";
    });

    elem.onmouseenter = function () {
      this.style.cssText = "background-color: #0c203b;";
    };

    elem.onmouseleave = function() {
      this.style.cssText = "background-color: #fff93f85;";
    };

  });

  // WSYWIG Container.
  let WSYWIGContainer = `
    <div class="dfree-body mce-content-body" id="tinymce-content-body" contenteditable="true" style="font-weight:normal; position: relative; width: 600px; align: right;" spellcheck="false">
      ${pContentBlob}
    </div>`;

  // Load WSYWIG in a hidden container for faster load.
  let nodes = getNodes(WSYWIGContainer);
  nodes[0].appendAfter(document.querySelector("section.mb7"));
  document.querySelector("#tinymce-content-body").style.display = "none";

  // Display WSYWIG on click over P elements.
  document.querySelectorAll("p").forEach((elem) => {
    elem.addEventListener("click", e => {

      document.querySelector("section.mb7 .founders-cond").innerHTML = utility.byLine;
      document.querySelector("#tinymce-content-body").style.display = "inherit";

      let editor = tinymce.EditorManager.get('tinymce-content-body');
      if (!editor) {
        tinymce.init(utility.dfreeBodyConfig);
        document.querySelector(".p_elem").remove();
      } 

      document.querySelector("#select_byline").addEventListener("change", event => {
        document.querySelector("section.mb7 .founders-cond").innerHTML = document.querySelector("#select_byline").value;
      });

    });
  });

  // Display media browser on click over current main art.
  document.querySelector(".article figure, .videoPlayer").addEventListener("click", event => {
    $('#exampleModal').modal('show');
  });

  // Load Top Menu Control
  utility.injectTopControl();

  // Media Browser Modal
  document.querySelectorAll(".sky_media_link").forEach(imageHandler => {
    imageHandler.addEventListener("click", e => {
      console.log("IMAGE STUFF", e.target);
      // Update existing image on click from media modal.
      document.querySelector(".article figure").innerHTML = '<img src = "' + e.target.getAttribute('full-image') + '">';
      document.querySelector("#exampleModal .close").click();
    });
  });
  
  /**
   * RIGHT SIDE FLOATING CONTROL BUTTON
   */
  document.querySelector(".sky_btn_new, .sky_btn_float").addEventListener("click", e => {
  
    let WSYWIGContainer = `
    <div class="dfree-body mce-content-body" id="tinymce-content-body" contenteditable="true" style="position: relative;"
      spellcheck="false" style="height: 600px;">
      <p> Enter Contents... </p>
    </div>`;

    document.querySelector(".article figure, .videoPlayer").innerHTML = '<img src = "https://kemne.com/assets/placeholder-image.jpg" width = "900" height = "600">';
    document.querySelector("#tinymce-content-body").innerHTML = "";
    document.querySelector("p.p_elem").remove();
    document.querySelector("h1").innerHTML = "Enter a headline...";
    document.querySelector(".articleDek").innerHTML = "Enter description....";
    document.querySelector("section.mb7 .founders-cond").innerHTML = utility.byLine;

    let nodes = getNodes(WSYWIGContainer);
    nodes[0].appendAfter(document.querySelector("section.mb7"));

    // On byline change update the DOM
    document.querySelector("#select_byline").addEventListener("change", event => {
      document.querySelector("section.mb7 .founders-cond").innerHTML = document.querySelector("#select_byline").value;
    });

    // Initialize WSYWIG
    let editor = tinymce.EditorManager.get('tinymce-content-body');
    if (!editor) {
      tinymce.init(utility.dfreeBodyConfig);
    } 

  });
  
  /**
   * Dynamicall take snapshop of any specific DOM and inject in WSYWIG.
   * To render "Related Contents", "Video thumbs".
   */
  utility.injectScreenCapTool();
  
}

/** 
 * Close Modal
 */
export function close() {
  while (elements.length > 0) {
      elements.pop().remove();
  }
  body.removeEventListener('click', close);
}
