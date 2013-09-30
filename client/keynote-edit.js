Meteor.autosubscribe(function () {
  Session.set('keynoteEditReady', false);
  Meteor.subscribe('keynote-edit', Session.get('keynoteEdit'), function () {
    Session.set('keynoteEditReady', true);
  });
});

var keynote = function () {
  return Keynotes.findOne(Session.get('keynoteEdit'));
}

Template.keynoteEdit.keynote = keynote;

Template.keynoteEdit.slides = function () {
  return _.map(this.slides, function (slide, i) {
    return {i: i, slide: slide}
  });
}

Template.keynoteEdit.showOptions = function () {
  return __.selectOptions({'Nothing': 'none', 'One active slide': 'active', 'Whole presentation': 'all'}, this.show);
}

Template.keynoteEdit.url = function () {
  return Session.get('keynoteURL') || this.url || this._id;
}

var _saveKeynote = function (e, template) {
      console.log('saveKeynote');

      e.preventDefault();
      Meteor.clearTimeout(saveKeynote.tSaved);

      saveKeynote.tUnsaved = Meteor.setTimeout(function () {
        Session.set('_keynoteUnsaved', true);
      }, 500);

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

Template.keynoteEdit.events({
  'input form, change form': function (e, template) {
    Session.set('keynoteUnsaved', true);

    if (e.type === 'input') {
      saveKeynote.call(this, e, template);
    } else {
      _saveKeynote.call(this, e, template);
    }
  },
  'click .js-to-remove': function (e) {
    Session.set('keynoteToRemove', true);
  },
  'click .js-no-remove': function (e) {
    Session.set('keynoteToRemove', false);
  },
  'click .js-remove': function (e) {
    Keynotes.remove(this._id);
    Template.body.$backToList();
  },
  'click .js-add-slide': function (e) {
    e.preventDefault();
    Keynotes.update(this._id, {$push: {slides: ''}});
    Session.set('keynoteLastFocus', true);
  },
  'click .js-remove-slide': function (e) {
    e.preventDefault();
    e.stopPropagation();
    var _keynote = keynote(),
        $set = {},
        slides = _keynote.slides;

    slides.splice(this.i, 1);

    if (!slides.length) return;

    $set.slides = slides;
    if (_keynote.currentSlideNumber >= slides.length || _keynote.currentSlideNumber === this.i) {
      console.log('new currentSlideNumber');
      $set.currentSlideNumber = 0;
    }

    Keynotes.update(_keynote._id, {$set: $set});
  }
});

Template.keynoteEditSlide.events({
  'click textarea, focus textarea': function () {
    console.log('click, focus');

    var _keynote = keynote();

    if (_keynote && this.i >= 0) {
      Keynotes.update(_keynote._id, {$set: {
        currentSlideNumber: this.i
      }});
    }
  }
});

Template.keynoteEdit.rendered = function () {
  console.log('Template.keynoteEdit.rendered');

  var $removeSlide = $('.js-remove-slide');
  if ($removeSlide.length === 1) {
    $removeSlide.remove();
  }

  if (!$(':focus').length) {
    if (Session.get('keynoteFirstFocus')) {
      $('input:first', this.find('form')).select().focus();
      Session.set('keynoteFirstFocus', false);
    }

    if (Session.get('keynoteLastFocus')) {
      $('textarea:last', this.find('form')).select().focus();
      Session.set('keynoteLastFocus', false);
    }
  }

  var _keynote = keynote(),
      $url = $('#url'),
      url = $url.val(),
      keynoteEdit = Session.get('keynoteEdit');

  if (_keynote) {
    Meteor.call('validateKeynoteURL', _keynote._id, $url.val(), function (err, result) {
      if (err) return console.log(err);
      if (keynoteEdit === Session.get('keynoteEdit')) {
        Session.set('keynoteURLState', result === 'error' ? 'has-error' : '');
        Session.set('keynoteURL', url);
      }
    });

    //Session.set('keynoteShow', $('#show').val());
  }
}