Keynotes = new Meteor.Collection('Keynotes');

if (Meteor.isServer) {
  Keynotes.allow({
    update: function (userId, doc, fields, modifier) {
      // can only change your own docs
      return userId === doc.userId
          && !_.contains(fields, 'userId')
          && (!modifier.$set || !modifier.$set.url || Meteor.call('validateKeynoteURL', doc._id, modifier.$set.url) === 'success');
    },
    remove: function (userId, doc) {
      // can only remove your own docs
      return doc.userId === userId;
    },
    fetch: ['_id', 'userId', 'url']
  });
}