window.sky_log = function(msg, obj) {
  var styles = [
    "background: linear-gradient(#D33106, #571402)",
    "border: 1px solid #3E0E02",
    "color: white",
    "text-shadow: 0 1px 0 rgba(0, 0, 0, 0.3)",
    "box-shadow: 0 1px 0 rgba(255, 255, 255, 0.4) inset, 0 5px 3px -5px rgba(0, 0, 0, 0.5), 0 -13px 5px -10px rgba(255, 255, 255, 0.4) inset",
    "line-height: 18px",
    "text-align: center",
    "font-weight: bold",
    'font-family:"Helvetica Neue", Helevetica; font-size:10px;'
  ].join(";");
  msg = arguments.length === 2 ? msg + " " : msg;
  obj = obj ? obj : "";
  if (typeof msg !== "string") {
    console.log("%c [ Rock CMS ] " + "data ", styles, msg);
  } else {
    console.log("%c [ Rock CMS ] " + msg, styles, obj);
  }
};

tinymce.PluginManager.add('example', function (editor, url) {
  // Add a button that opens a window

  let bookMarkLoc = {};
  let triggerWord = '';

  editor.addSidebar('mysidebar', {
    tooltip: 'My sidebar',
    icon: 'settings',
    onrender: function (api) {
      console.log('Render panel', api.element());
    },
    onshow: function (api) {
      console.log('Show panel', api.element());
      api.element().innerHTML = 'Hello world!';
    },
    onhide: function (api) {
      console.log('Hide panel', api.element());
    }
  });


  /*
  editor.on('focus', function (e) {
    console.log('Editor got focus!');
  });

*/
  

  /*
  editor.on('keydown', function (e) {
     console.log("Char Code: " + e.keyCode);
     console.log(editor.selection.getNode().innerHTML);

     if (e.keyCode == 32) {
      //alert("The word is: " + triggerWord);
      triggerWord = '';
      $.ajax({
        url: 'http://localhost:4000/helpers/product-api/',
        timeout: 10000,
        data: { triggerword: triggerWord },
        success: function(data) {

        },
        error: function(request, status, err) {
          alert("Error: " + request + status + err);
        }
      });
     }
     triggerWord += String.fromCharCode(e.which);
  });
*/

  /*
  // Adds an element where the caret/selection is in the active editor
  var el = tinymce.activeEditor.dom.create('div', { id: 'test', 'class': 'myclass' }, 'some content');
  tinymce.activeEditor.selection.setNode(el);
  */
  

  var getAnchorElement = function (editor, selectedElm) {
    selectedElm = selectedElm || editor.selection.getNode();
  return editor.dom.getParent(selectedElm, 'a[href]');
  };



  const openImage = editor => {
    alert("Its an image");

    editor.windowManager.open({
      title: "Add Comment",
      body: {
        type: "textbox",
        name: "my_textbox",
        label: "My textbox",
        value: 'gfadgdfgdsfgsdgdf'
      },
      onsubmit: function(e) {
        editor.insertContent(e.data.my_textbox);
      }
    });
  };

  editor.on("DblClick", function(e, selectedElm) {
    let elementType = e.target.nodeName;
    console.log("Element clicked:", e.target.nodeName);
    sky_log("Selected Element: ", e);
    //curNode.setAttribute("id", "newid");
    sky_log("Current Node: ", editor.selection.getNode());

    if (elementType == "IMG") {
      openImage(editor);
      sky_log("You CLICKED : ", editor.selection.getNode());
      //editor.insertContent("<h1>TETING</h1>");


      
    }
  });






  editor.on('MouseUp', function (e) {
    console.log('Mouse just released !!');

    console.log("HTML STUFF", editor.selection.getContent());

    var range = editor.selection.getRng().startOffset;
    var sel = editor.selection.getSel();

    console.log("Selection Object: ", sel);

    var bookMarkLoc = tinymce.activeEditor.selection.getBookmark();
    console.log("Bookmark Location: ", bookMarkLoc);

    let selectedText = editor.selection.getContent({format : 'text'});
    let selectedHTML = editor.selection.getNode();
    let plainText = selectedText;

    //alert("HTML Text" + editor.selection.getNode());
    //alert( $(selectedHTML).attr('data-comment'));


    /*
    //console.log("Selected HTML:", editor.selection.getNode());
  editor.windowManager.open({
    title: 'Add Comment',
    body: {type: 'textbox', name: 'my_textbox', label : 'My textbox', value: plainText },
    onsubmit: function(e) {
      //selectedText = `<span style ="color:#ada10f;" class = "track-changes" data-user = "chaz.jpg" data-comment="${e.data.my_textbox}"> ${selectedText} </span>`;
      selectedText = `
<span class="tooltip">${selectedText}
  <span class="tooltiptext track-changes" data-user = "chaz.jpg">${e.data.my_textbox}</span>
</span>
      `;
      editor.insertContent(selectedText);
      //api.element().innerHTML = 'Didaruls Comment';
      //alert(e.data.my_textbox)
    }
  });
*/
    
    
    /*
    // Opens a HTML page inside a TinyMCE dialog
    editor.windowManager.open({
      title: 'Insert/edit image',
      url: 'dialogTemplate.html',
      width: 700,
      height: 600
    });
    */
    

    /*
    // Opens a HTML page inside a TinyMCE dialog
    editor.windowManager.open({
      title: 'Upload a file to attach',
      html: '<input type="file" class="input" name="file" id="file_attach" style="font-size: 14px; padding: 30px;" />',
      width: 450,
      height: 80,
      buttons: [{
        text: 'Attach',
        subtype: 'primary',
        onclick: function () {
          // TODO: handle primary btn click
          (this).parent().parent().close();
        }
      },
      {
        text: 'Close',
        onclick: function () {
          (this).parent().parent().close();
        }
      }]
    });
    */
    
/*
  editor.notificationManager.open({
    text: 'A test notification that will close automatically after 5 seconds.',
    timeout: 5000
  });
*/

//var selectedElm = editor.selection.getNode();
//var anchorElm = getAnchorElement(editor, selectedElm);

//editor.selection.select(selectedElm);
//console.log(selectedElm);


    //editor.insertContent('Title: ' + editor.selection.getNode().textContent);
    //console.log(editor.selection.getNode().textContent);
  });


  editor.addButton('rock_media', {
    text: 'Insert Media',
    icon: false,
    onclick: function () {
      // Open window
      editor.windowManager.open({
        title: 'Dummy Media Example',
        body: [{
          type: 'textbox',
          name: 'enterwidget',
          label: 'Media Sample',
        },
        ],
        onsubmit: function (e) {

          // Restore the selection bookmark
          console.log(bookMarkLoc);
          tinymce.activeEditor.selection.moveToBookmark(bookMarkLoc);
          // Insert content when the window form is submitted
          editor.insertContent(e.data.enterwidget);
        }
      });
    }
  });


  editor.addButton('example', {
    text: 'Insert Widget',
    icon: false,
    onclick: function() {
      // Open window
      editor.windowManager.open({
        title: 'All Purpose Widget',
        body: [{ type: 'textbox', 
            multiline: true,
            name: 'enterwidget',
            label: 'Enter Widget Code', 
            value: '<iframe width="560" height="315" src="https://www.youtube.com/embed/xTlNMmZKwpA" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>'
          },
        ],
        onsubmit: function(e) {

          // Restore the selection bookmark
          console.log(bookMarkLoc);
          tinymce.activeEditor.selection.moveToBookmark(bookMarkLoc);
          // Insert content when the window form is submitted
          editor.insertContent(e.data.enterwidget);
        }
      });
    }
  });


  editor.notificationManager.open({
    text: 'A test informational notification.',
    type: 'info'
  });



  $(editor.getBody())
    .find("#tiny_custom_input")
    .bind("click", function() {
      alert("click!");
    });


  // Adds a menu item to the tools menu
  editor.addMenuItem('example', {
    text: 'Example plugin',
    context: 'tools',
    onclick: function() {
      // Open window with a specific url
      editor.windowManager.open({
        title: 'TinyMCE site',
        url: 'form.html',
        width: 800,
        height: 600,
        buttons: [{
          text: 'Save',
          onclick: 'submit'
        },{
          text: 'Close',
          onclick: 'close'
        }]
      });
    }
  });

  return {
    getMetadata: function () {
      return  {
        name: "Example plugin",
        url: "http://exampleplugindocsurl.com"
      };
    }
  };
});
