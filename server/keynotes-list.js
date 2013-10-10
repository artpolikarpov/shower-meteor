Meteor.startup(function () {
	Meteor.publish('keynotes-list', function () {
		return this.userId && Keynotes.find({userId: this.userId}, {fields: {slides: 0}});
	});
});