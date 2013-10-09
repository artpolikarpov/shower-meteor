__.scrollToTop = function (time) {
  __.$body && __.$body.animate({scrollTop: 0, scrollLeft: 0},
      typeof time === 'undefined' ? 333 : time);
}