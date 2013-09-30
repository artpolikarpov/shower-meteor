__.waitFor = function (test, fn, timeout) {
  if (test()) {
    fn();
  } else {
    Meteor.setTimeout(function () {
      __.waitFor(test, fn);
    }, timeout || 100);
  }
};