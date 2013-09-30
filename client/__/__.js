__.$window = $(window);

__.pathname = function () {
  return location.pathname.replace(/^\//, '').replace(/\/$/, '');
}

Meteor.startup(function () {
  __.$body = $('body');
});
