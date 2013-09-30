Template.body.show = function () {
  console.log('show', !__.pathname());

  return !__.pathname();
}

Template.body.$backToList = function () {
  Session.set('keynoteEdit', null);
  Session.set('keynoteURL', null);
  Session.set('keynoteURLState', null);
  Session.set('keynoteToRemove', null);
  Session.set('_keynoteUnsaved', null);
  Session.set('keynoteShow', null);
}

Template.body.events({
  'click .js-back': function (e) {
    e.preventDefault();

    __.waitFor(function () {
      return !Session.get('keynoteUnsaved')
    }, function () {
      Template.body.$backToList();
    });
  },
  'click .js-new': function () {
    Meteor.call('addNewKeynote', function (err, _id) {
      Session.set('keynoteEdit', _id);
      Session.set('keynoteFirstFocus', true);
    });
  },
  'click .js-save': function () {
    $('form input').change();
  }
});

Template.body.rendered = function () {
  Session.set('keynoteShow', __.pathname());
}