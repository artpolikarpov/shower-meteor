Meteor.startup(function () {
	Meteor.publish('keynote-show', function (_id) {
		return _id && Keynotes.find({$or: [{$or: [{_id: _id}, {url: _id}], userId: this.userId}, {$or: [{_id: _id}, {url: _id}], show: {$ne: 'none'}}]});
	});
});