Template.body.show = function () {
  return !__.pathname();
}

Template.body.$backToList = function () {
  Session.set('keynoteEdit', false);
  Session.set('keynoteEditURL', false);
  Session.set('keynoteURL', false);
  Session.set('keynoteURLState', false);
  Session.set('keynoteToRemove', false);
  Session.set('keynoteToRemoveSlide', false);
  Session.set('keynoteCurrentSlideNumber', false);
  Session.set('_keynoteUnsaved', false);
  Session.set('keynoteShow', false);

  __.scrollToTop(100);
}

Template.body.keynoteURL = function () {
  return Template.keynoteEdit.url.call(Template.keynoteEdit.keynote());
}

Template.body.events({
  'click .navbar': function (e) {
    if ($(e.target).is('.js-scroll-top')) {
      __.scrollToTop();
    }
  },
  'click .js-back': function (e) {
    e.preventDefault();

    __.waitFor(function () {
      return !Session.get('keynoteUnsaved')
    }, function () {
      Template.body.$backToList();
    });
  },
  'click .js-new': function () {
    var _id = Keynotes.insert(__.keynotes.emptyKeynote(), function (err) {
      if (err) {
        console.log(err);
        Template.body.$backToList();
      }
    });

    Session.set('keynoteEdit', _id);
    Session.set('keynoteFirstFocus', true);
  },
  'click .js-save': function () {
    $('form input').change();
  }
});

Template.body.rendered = function () {
  var pathname = __.pathname();

  if (!pathname) {
    __.$html.addClass('bootstrap');
  }

  Session.set('keynoteShow', __.pathname());
}