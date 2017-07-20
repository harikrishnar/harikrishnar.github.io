//if js enabled remove no-js
(function(H){H.className=H.className.replace(/\bno-js\b/,'js')})(document.documentElement);

//detect popular devices & browsers
var deviceAgent = navigator.userAgent.toLowerCase(),
	appleMobileID = deviceAgent.match(/(iphone|ipod|ipad)/),
	ipod = deviceAgent.match(/(ipod)/),
	ipad = deviceAgent.match(/(ipad)/),
	iphone = deviceAgent.match(/(iphone)/),
	firefox = deviceAgent.match(/firefox/),
	webkit = deviceAgent.match(/webkit/);

//hello apple
if (appleMobileID) {
  document.documentElement.className += ' appleTouch';
};

if (ipod) {
	document.documentElement.className += ' ipod';
};

if (ipad) {
	document.documentElement.className += ' ipad';
};

if (iphone) {
	document.documentElement.className += ' iphone';
};

//hello browsers
if(firefox) {
	document.documentElement.className += ' firefox';
}

if(webkit) {
	document.documentElement.className += ' webkit';
}

if (navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i)) {
	var viewportmeta = document.querySelector('meta[name="viewport"]');
	if (viewportmeta) {
		viewportmeta.content = 'width=device-width, minimum-scale=1.0, maximum-scale=1.0, initial-scale=1.0';
		document.body.addEventListener('gesturestart', function () {
			viewportmeta.content = 'width=device-width, minimum-scale=1, maximum-scale=1';
		}, false);
	}
}
