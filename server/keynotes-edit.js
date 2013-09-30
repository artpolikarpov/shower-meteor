Meteor.startup(function () {
	Meteor.publish('keynote-edit', function (_id) {
		return _id && Keynotes.find({userId: this.userId, _id: _id});
	});

	Meteor.methods({
		'validateKeynoteURL': function (_id, newUrl) {
      newUrl = _.str.trim(newUrl);
			console.log('validateKeynoteURL', newUrl);
			return newUrl ? Keynotes.find({url: newUrl, _id: {$ne: _id}}, {fields: {_id: 1}}).count() ? 'error' : 'success' : '';
		}
	});
});