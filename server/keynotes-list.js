Meteor.startup(function () {
	Meteor.publish('keynotes-list', function () {
		return this.userId && Keynotes.find({userId: this.userId}, {fields: {slides: 0}});
	});

	Meteor.methods({
		'addNewKeynote': function () {
      return Keynotes.insert(__.keynotes.emptyKeynote());
		}
	});
});