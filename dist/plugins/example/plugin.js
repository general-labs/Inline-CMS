tinymce.PluginManager.add('example', function (editor, url) {
  // Add a button that opens a window

  let bookMarkLoc = {};

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
