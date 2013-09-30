Meteor.autosubscribe(function () {
  Session.set('keynoteListReady', false);
  Meteor.subscribe('keynotes-list', Meteor.userId(), function () {
    Session.set('keynoteListReady', true);
  });
});

Template.keynotesList.keynotes = function () {
  return Keynotes.find({}, {sort: {createdAt: -1}});
};

Template.keynotesList.events({
  'click .js-edit': function (e) {
    e.preventDefault();
    Session.set('keynoteEdit', this._id);
    Session.set('keynoteFirstFocus', true);
  }
});