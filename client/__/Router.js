Meteor.startup(function () {
	__.Router = Backbone.Router.extend({
	  routes: {
	    ':keynote': 'main',
	    ':keynote/': 'main'
	  },
	  main: function (keynote) {
	    Session.set('keynoteShow', keynote);
	  }
	});

	__.Router = new __.Router;

  Backbone.history.start({pushState: true});
});