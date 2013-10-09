Keynotes = new Meteor.Collection('Keynotes');
CurrentSlides = new Meteor.Collection('CurrentSlides');

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

__.keynotes = {};

__.keynotes.themes = {'Ribbon': 'ribbon', 'Bright': 'bright'};

__.keynotes.emptySlide = function () {
  return {code: '', class: ''};
}

__.keynotes.emptyKeynote = function () {
  var slides = [];

  _.times(3, function () {
    slides.push(__.keynotes.emptySlide());
  });

  return {
    userId: Meteor.userId(),
    title: 'New Presentation',
    slides: slides,
    createdAt: +new Date,
    show: 'none',
    theme: 'ribbon'
  }
};

__.keynotes.idOrUrl = function (_id) {
  return {$or: [{_id: _id}, {url: _id}]};
}