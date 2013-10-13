Meteor.autosubscribe(function () {
  Session.set('keynoteEditReady', false);
  Meteor.subscribe('keynote-edit', Session.get('keynoteEdit'), function () {
    //console.log('Subscribed to `keynote-edit`');
    Session.set('keynoteEditReady', true);
  });
});

var keynote = function () {
  return Keynotes.findOne(Session.get('keynoteEdit'));
}

Template.keynoteEdit.keynote = keynote;

Template.keynoteEdit.slides = function () {
  return _.map(this.slides, function (slide, i) {
    return _.extend(slide, {i: i, no: i + 1, first: i === 0, last: i === this.length - 1});
  }, this.slides);
}

Template.keynoteEdit.showOptions = function () {
  return __.selectOptions({'Hidden': 'none', 'Active slide only': 'active', 'Visible': 'all'}, this.show);
}

Template.keynoteEdit.themeOptions = function () {
  return __.selectOptions(__.keynotes.themes, this.theme);
}

Template.keynoteEdit.themeHelp = function (theme) {
  return __.keynotes.themes[theme].help;
}

Template.keynoteEdit.url = function () {
  return Session.get('keynoteURL') || this.url || this._id;
}

Template.keynoteEditSlide.focus = function () {
  return (typeof Session.get('keynoteCurrentSlideNumber') === 'number' ? this.i === Session.get('keynoteCurrentSlideNumber') : this.last) ? 'focus' : '';
}

var _saveKeynote = function (e, template) {
      e.preventDefault();
      Meteor.clearTimeout(saveKeynote.tSaved);

      saveKeynote.tUnsaved = Meteor.setTimeout(function () {
        Session.set('_keynoteUnsaved', true);
      }, 1000);

      var now = $.now();

      Keynotes.update(this._id, {$set: __.serializeForm(template.find('form'))}, function (err) {
        Session.set('keynoteUnsaved', false);

        if (err) return console.log(err);

        Meteor.clearTimeout(saveKeynote.tUnsaved);

        saveKeynote.tSaved = Meteor.setTimeout(function () {
          Session.set('_keynoteUnsaved', false);
        }, Math.max(1500 - ($.now() - now), 0));
      });
    },
    saveKeynote = _.debounce(_saveKeynote, 500);

var removeSlide = function (i) {
  var _keynote = keynote(),
        $set = {},
        slides = _keynote.slides;

  slides.splice(i, 1);

  if (!slides.length) return;

  $set.slides = slides;
  if (_keynote.currentSlideNumber >= slides.length || _keynote.currentSlideNumber === i) {
    $set.currentSlideNumber = 0;
  }

  Session.set('keynoteToRemoveSlide', false);
  Session.set('keynoteCurrentSlideNumber', false);
  Keynotes.update(_keynote._id, {$set: $set});
}

var removePresentation = function (_id) {
  Session.set('keynoteToRemove', false);
  Keynotes.remove(_id);
  Template.body.$backToList();
}

Template.keynoteEdit.events({
  'input form, click label.btn, change form': function (e, template) {
    Session.set('keynoteUnsaved', true);

    if (e.type === 'change') {
      _saveKeynote.call(keynote(), e, template);
    } else {
      saveKeynote.call(keynote(), e, template);
    }
  },
  'click .js-to-remove': function (e, template) {
    e.preventDefault();
    e.stopPropagation();

    if (!_.some(_.omit(__.serializeForm(template.find('form')), 'show', 'url', 'theme', 'title'))
        && (!this.title || this.title === __.keynotes.emptyKeynote().title)) {
      // remove immediately if empty
      removePresentation(this._id);
    } else {
      Session.set('keynoteToRemove', true);
    }
  },
  'click .js-no-remove': function (e) {
    e.preventDefault();
    e.stopPropagation();

    Session.set('keynoteToRemove', false);
  },
  'click .js-remove': function (e) {
    e.preventDefault();
    e.stopPropagation();

    removePresentation(this._id);
  },
  'click .js-add-slide': function (e) {
    e.preventDefault();
    var _keynote = keynote(),
        $set = {},
        slides = _keynote.slides,
        newIndex = this.i + 1;

    slides.splice(newIndex, 0, __.keynotes.emptySlide());
    $set.slides = slides;

    //console.log('newIndex', newIndex);

    Session.set('keynoteSlideFocus', newIndex);
    Keynotes.update(_keynote._id, {$set: $set});
  },
  'click .js-to-remove-slide': function (e) {
    //console.log('click .js-to-remove-slide', this, this.i);

    e.preventDefault();
    e.stopPropagation();

    if (_.isEqual(__.keynotes.emptySlide(), _.omit(this, 'i', 'no', 'first', 'last'))) {
      // remove immediately if empty
      removeSlide(this.i);
    } else {
      Session.set('keynoteToRemoveSlide', this.i);
    }
  },
  'click .js-no-remove-slide': function (e) {
    e.preventDefault();
    e.stopPropagation();

    Session.set('keynoteToRemoveSlide', false);
  },
  'click .js-remove-slide': function (e) {
    e.preventDefault();
    e.stopPropagation();

    removeSlide(this.i);
  },
  'click .js-edit-url': function (e) {
    e.preventDefault();

    var flag = !Session.get('keynoteURLState') ? !Session.get('keynoteEditURL') : true;

    Session.set('keynoteEditURL', flag);
    Session.set('keynoteURLFocus', flag);
  },
  'click .one-slide, focus .one-slide': function () {
    var _keynote = keynote();

    Session.set('keynoteCurrentSlideNumber', this.i);

    if (this.i >= 0 && _keynote.show === 'active') {
      Meteor.call('updateCurrentSlide', _keynote._id, this.i);
    }
  },
  'click .js-move-slide': function (e) {
    e.preventDefault();
    e.stopPropagation();

    var _keynote = keynote(),
        $set = {},
        slides = _keynote.slides,
        $button = $(e.currentTarget),
        direction = +$button.data('direction'),
        newIndex = this.i + direction;

    //console.log('newIndex', newIndex);

    slides = _.reject(slides, function (slide, i) {
      //console.log('slide', slide);
      //console.log('this', this);
      return i === this.i;
    }, this);

    //console.log('slides', slides);

    if (!slides.length || !direction) return;

    slides.splice(newIndex, 0, this);

    $set.slides = slides;

    Session.set('keynoteSlideFocus', newIndex);
    Keynotes.update(_keynote._id, {$set: $set});
  }
});

Template.keynoteEdit.rendered = function () {
  //console.log('Template.keynoteEdit.rendered');

  emmet.require('textarea').setup({
      pretty_break: false,
      use_tab: true
  });

  var _keynote = keynote(),
      $url = $('#url'),
      url = $url.val(),
      keynoteEdit = Session.get('keynoteEdit');

  if (_keynote && _keynote.slides && _keynote.slides.length === 1) {
    $('.js-to-remove-slide').attr('disabled', true);
  }

  if (!$(':focus').length) {
    if (Session.get('keynoteFirstFocus')) {
      $('input:first', this.find('form')).select().focus();
      Session.set('keynoteFirstFocus', false);
    }

    if (Session.get('keynoteURLFocus')) {
      $url.select().focus();
      Session.set('keynoteURLFocus', false);
    }

    if (Session.get('keynoteSlideFocus') >= 0) {
      $('.one-slide textarea', this.find('form')).eq(Session.get('keynoteSlideFocus')).select().focus();
      Session.set('keynoteSlideFocus', -1);
    }
  }

  if (_keynote) {
    Meteor.call('validateKeynoteURL', _keynote._id, $url.val(), function (err, result) {
      if (err) return console.log(err);
      if (keynoteEdit === Session.get('keynoteEdit')) {

        if (result === 'error') {
          Session.set('keynoteURL', url);
          Session.set('keynoteURLState', 'has-error');
        } else {
          Session.set('keynoteURL', false);
          Session.set('keynoteURLState', '');
        }
      }
    });

    if (_keynote.show === 'active') {
      Meteor.call('createCurrentSlide', _keynote._id);
    } else {
      Meteor.call('removeCurrentSlide', _keynote._id);
    }
  }
};