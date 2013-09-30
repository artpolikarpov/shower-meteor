Meteor.autosubscribe(function () {
  Session.set('keynoteShowReady', false);
  Meteor.subscribe('keynote-show', Session.get('keynoteShow'), function () {
    Session.set('keynoteShowReady', true);
  });
});

var keynote = function () {
      return Keynotes.findOne({$or: [{_id: Session.get('keynoteShow')}, {url: Session.get('keynoteShow')}]});
    },
    isGuest = function (keynote) {
      return keynote && (keynote.userId !== Meteor.userId() && keynote.show === 'active');
    };

Template.keynoteShow.keynote = function () {
  var _keynote = keynote();

  if (isGuest(_keynote)) {
    _keynote.slides = _.filter(_keynote.slides, function (slide, i) {
      return i === (_keynote.currentSlideNumber >= 0 ? _keynote.currentSlideNumber || 0 : 0);
    });
  }

  return _keynote;
};

Template.keynoteShow.isGuest = function () {
  return isGuest(this);
};

Template.keynoteShow.ready = function () {
  return Session.get('keynoteShowReady');
};

Template.keynoteShow.rendered = function () {
  __.load('/shower/themes/bright/styles/screen.css', function () {
    if (!$('.slide').length) return;

    var _keynote = keynote();

    shower._addEventListeners(false);
    shower.on = false;
    shower.slideList = [];

    if (isGuest(_keynote)) {
      __.$body
          .removeClass('bootstrap list')
          .addClass('shower full');

      shower.guest = true;

      $('.slide').addClass('active');

      __.$window
          .off('resize', shower._listeners['window resize'])
          .on('resize', shower._listeners['window resize'])
          .resize();
    } else {
      __.$body
          .removeClass('bootstrap full')
          .addClass('shower list');

      shower.guest = false;

      shower.change = function () {
        if (_keynote.userId !== Meteor.userId() || _keynote.show !== 'active') return;

        var currentSlideNumber = shower.getCurrentSlideNumber();

        if (_keynote.currentSlideNumber !== currentSlideNumber) {
          Keynotes.update(_keynote._id, {$set: {
            currentSlideNumber: currentSlideNumber
          }});
        }
      };

      shower.init();
    }
  });
};
