Handlebars.registerHelper("Session", function(key, compare) {
  if (typeof compare === 'object' && compare.hash && _.isEmpty(compare.hash)) {
    return Session.get(key);
  } else {
    return Session.get(key) === compare;
  }

});

Handlebars.registerHelper("equal", function(value1, value2) {
  return _.isEqual(value1, value2);
});

Handlebars.registerHelper("here", function(value) {
	return !!value;
});