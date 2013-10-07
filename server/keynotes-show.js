Meteor.startup(function () {
	Meteor.publish('keynote-show', function (_id) {
		return _id && Keynotes.find({$or: [_.extend({userId: this.userId}, __.keynotes.idOrUrl(_id)), _.extend({show: {$ne: 'none'}}, __.keynotes.idOrUrl(_id))]});
	});
});