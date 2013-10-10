Meteor.startup(function () {
  Meteor.AppCache.config({
    onlineOnly: [
      '/shower/',
      '/.gitignore',
      '/Gruntfile.js',
      '/package.json',
      '/node_modules'
    ]
  });
});