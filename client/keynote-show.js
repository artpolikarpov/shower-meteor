Meteor.startup(function () {

	Meteor.autosubscribe(function () {
		Meteor.subscribe('keynote-show', Session.get('keynoteShow'));
	});

	Template.keynoteShow.keynote = function () {
		return Keynotes.findOne({id: Session.get('keynoteShow')});
	}


});