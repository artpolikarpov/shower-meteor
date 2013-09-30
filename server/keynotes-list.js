Meteor.startup(function () {
	Meteor.publish('keynotes-list', function (userId) {
		return this.userId && Keynotes.find({userId: this.userId}, {fields: {title: 1, createdAt: 1, show: 1}});
	});

	Meteor.methods({
		'addNewKeynote': function () {
			var userId = Meteor.userId();
      return Keynotes.insert({
				userId: userId,
				title: 'New Presentation',
        slides: ['', '', ''],
        createdAt: +new Date,
        show: 'none'
      });
		}
	});
});