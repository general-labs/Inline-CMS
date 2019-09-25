## [Inline CMS ] 
#### A Pluggable CMS Anywhere.

##### ([DEMO](https://youtu.be/Z0fmKkY3s5M))
[![Inline CMS ](https://img.youtube.com/vi/Z0fmKkY3s5M/maxresdefault.jpg)](https://youtu.be/Z0fmKkY3s5M)
[Watch the DEMO](https://youtu.be/Z0fmKkY3s5M)

### Instructions

* `npm install`
* `npm run build`
* Select the DOM elements (h1, textarea etc) you want to control using this tool/CMS.
* Include the following code on your web page.

`<script>
    (function (w,d,s,o,f,js,fjs) {
        w['JS-Widget']=o;w[o] = w[o] || function () { (w[o].q = w[o].q || []).push(arguments) };
        js = d.createElement(s), fjs = d.getElementsByTagName(s)[0];
        js.id = o; js.src = f; js.async = 1; fjs.parentNode.insertBefore(js, fjs);
    }(window, document, 'script', 'rock_cms', './widget.js'));
    rock_cms('init', { 
        // Map DOM to CMS fields. 
        icms_body: 'articleBody',
        icms_title: 'h1' 
    });
</script>
`

`open dist/index.html for demo`