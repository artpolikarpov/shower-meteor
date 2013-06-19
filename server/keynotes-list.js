Meteor.startup(function () {
	Meteor.publish('keynotes-list', function () {
		return this.userId && Keynotes.find({userId: this.userId});
	});

	Meteor.methods({
		'addNewKeynote': function () {
			return Keynotes.insert({
				userId: Meteor.userId(),
				id: Keynotes.find({}, {fields: {_id: 1}}).count() + 1 + ''});
		}
	});
});