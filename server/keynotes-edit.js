Meteor.startup(function () {
	Meteor.publish('keynote-edit', function (_id) {
		return _id && Keynotes.find(_id);
	});

	Meteor.methods({
		'validateKeynoteURL': function (oldUrl, newUrl) {
			console.log('validateKeynoteURL', newUrl);
			return newUrl ? Keynotes.find({url: newUrl}, {fields: {_id: 1}}).count() && oldUrl !== newUrl ? 'error' : 'success' : '';
		}
	});
});