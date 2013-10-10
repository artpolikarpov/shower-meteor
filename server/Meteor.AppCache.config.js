Meteor.startup(function () {
  Meteor.AppCache.config({
    onlineOnly: [
      '/shower/'
    ]
  });
});