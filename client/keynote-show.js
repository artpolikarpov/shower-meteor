Meteor.autosubscribe(function () {
  Session.set('keynoteShowReady', false);
  Meteor.subscribe('keynote-show', Session.get('keynoteShow'), function () {
    Session.set('keynoteShowReady', true);
  });
  Meteor.subscribe('keynote-show-current-slide', Session.get('keynoteShow'));
});

var keynote = function () {
      return Keynotes.findOne({$or: [{_id: Session.get('keynoteShow')}, {url: Session.get('keynoteShow')}]});
    },
    currentSlide = function () {
      return CurrentSlides.findOne();
    },
    isGuest = function (keynote) {
      return keynote && keynote.userId !== Meteor.userId() && keynote.show === 'active';
    };

Template.keynoteShow.cacheStamp = function () {
  return $('link[rel="stylesheet"]').attr('href').replace(/(.*)\/(.*)$/, '$2').replace(/[/.?]+/g, '');
}

Template.keynoteShow.keynote = function () {
  var _keynote = keynote(),
      _currentSlide;

  if (!_keynote) return;

  _keynote.slides = _.map(_keynote.slides, function (slide, i) {
    var _isGuest = isGuest(_keynote),
        active = (_currentSlide = currentSlide()) && i === (_currentSlide.currentSlide >= 0 ? _currentSlide.currentSlide || 0 : 0);
    return _.extend(slide, {
      active: _isGuest && active ? 'active' : '',
      safeCode: !_isGuest || active ? slide.code : '',
      'class': (slide.class || '').replace(/\.|,/g, ' ').split(' ').join(' ')
    });
  });

  return _keynote;
};

Template.keynoteShow.themes = function () {
  return _.map(__.keynotes.themes, function (value, key) {
    return {theme: key};
  });
};

Template.keynoteShow.isGuest = function () {
  return isGuest(this);
};

Template.keynoteShow.ready = function () {
  return Session.get('keynoteShowReady');
};

Template.keynoteShow.rendered = function () {
  if (!$('.slide').length) return;

  var _keynote = keynote(),
      _currentSlide = currentSlide();

  $('#' + _keynote.theme + '-theme')
      .attr('disabled', false)
      .siblings('link.js-stylesheet')
      .attr('disabled', true);

  __.waitFor(function () {
      var $slide = $('.slide'),
          ratio = $slide.width() / $slide.height();
      return (ratio === 16 / 10 || ratio === 4 / 3);
  }, function () {
    $('head > link[rel="stylesheet"]').attr('disabled', true);
    shower._listeners['window resize']();
    Session.set('keynoteThemeLoaded', true);
  });

  document.title = _keynote.title || 'Sho.io';

  shower._addEventListeners(false);
  shower.on = false;
  shower.slideList = [];

  if (isGuest(_keynote)) {
    __.$body
        .removeClass('list')
        .addClass('full guest');

    shower.guest = true;

    __.$window
        .off('resize', shower._listeners['window resize'])
        .on('resize', shower._listeners['window resize'])
        .resize();

    _currentSlide && shower.updateProgress(_currentSlide.currentSlide, _keynote.slides.length);
  } else {
    __.$body
        .removeClass('full guest')
        .addClass('list');

    shower.guest = false;

    shower.change = function () {
      if (_keynote.userId !== Meteor.userId() || _keynote.show !== 'active') return;
      Meteor.call('updateCurrentSlide', _keynote._id, shower.getCurrentSlideNumber());
    };

    shower.init();
  }
};
