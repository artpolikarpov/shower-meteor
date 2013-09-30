__.load = function (filename, callback) {
  if (__.load[filename]) {
    __.load[filename] !== true && (callback || __.noop)();

    return;
  }
  __.load[filename] = true;

  var fileref;
	if (/\.js$/.test(filename)) {
		fileref = document.createElement('script');
    fileref.setAttribute('type', 'text/javascript');
		fileref.setAttribute('src', filename);
	}
	else if (/\.css$/.test(filename)) {
		fileref = document.createElement('link');
		fileref.setAttribute('rel', 'stylesheet');
		fileref.setAttribute('type', 'text/css');
		fileref.setAttribute('href', filename);
	}
	if (typeof fileref !== 'undefined') {
    fileref.onerror = function () {
      __.load[filename] = 'error';
    }
    fileref.onload = function () {
      __.load[filename] = 'loaded';
      (callback || __.noop)();
    }

		document.getElementsByTagName('head')[0].appendChild(fileref);
	}
}