Meteor.startup(function () {

	Meteor.autosubscribe(function () {
		Meteor.subscribe('keynotes-list');
	});

	Template.keynotesList.keynotes = function () {
		return Keynotes.find({}, {sort: {id: -1}});
	};

	Template.keynotesList.events({
		'click .js-new': function (e) {
			Meteor.call('addNewKeynote', function (err, _id) {
				Session.set('keynoteEdit', _id);
			});
		},
		'click .js-edit': function () {
			Session.set('keynoteEdit', this._id);
		}
	});

});