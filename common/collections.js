Meteor.startup(function () {

	Keynotes = new Meteor.Collection('Keynotes');

	if (Meteor.isServer) {
		Keynotes.allow({
//			insert: function (userId, doc) {
//				console.log('Keynotes.insert()', userId, doc);
//				// the doc must be owned by the user
//				return userId === doc.userId;
//			},
			update: function (userId, doc, fields, modifier) {
				// can only change your own docs
				return userId === doc.userId
						&& !_.contains(fields, 'userId')
						&& (!modifier.$set.url || Meteor.call('validateKeynoteURL', doc.url, modifier.$set.url) === 'success');
			},
			remove: function (userId, doc) {
		    // can only remove your own docs
		    return doc.userId === userId;
		  },
			fetch: ['userId', 'url']
		});
	}

});