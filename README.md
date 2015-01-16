How to use
-------------------
```js
var div = document.getElementsByTagName('div')[0];

//add custom event listener
div.addEventListener('test', function(event) {
	alert(event.type + "/" + event.detail);
}, false);


// or jQuery
/*
$(div).on('test', function(event) {
	alert(event.type + "/" + event.originalEvent.detail)
});
*/

//fire custom event
div.trigger('test', 'custum value');