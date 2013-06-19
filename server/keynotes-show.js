Meteor.startup(function () {
	Meteor.publish('keynote-show', function (id) {
		return id && Keynotes.find({id: id});
	});
});