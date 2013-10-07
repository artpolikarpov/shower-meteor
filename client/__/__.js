__.$document = $(document);
__.$window = $(window);

__.pathname = function () {
  return location.pathname.replace(/^\//, '').replace(/\/$/, '');
};

__.isMac = navigator.userAgent.indexOf('Mac OS X') !== -1;
__.ctrlLabel = __.isMac ? '⌘' : 'Ctrl';

Meteor.startup(function () {
  __.$html = $('html');
  __.$body = $('body');
});
