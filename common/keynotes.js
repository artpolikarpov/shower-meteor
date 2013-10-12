Keynotes = new Meteor.Collection('Keynotes');
CurrentSlides = new Meteor.Collection('CurrentSlides');

if (Meteor.isServer) {
  Keynotes.allow({
    insert: function (userId, doc) {
      return userId && _.isEqual(_.omit(doc, 'createdAt', '_id'), _.omit(__.keynotes.emptyKeynote(), 'createdAt'));
    },
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

__.keynotes.themes = {
  'bootstrap-3': {
    name: 'Bootstrap 3',
    help: 'Use any Bootstrap <nobr><a href="http://getbootstrap.com/css/" target="_blank">elements</a></nobr> <nobr>and <a href="http://getbootstrap.com/components/" target="_blank">components</a></nobr> within slides.'
  },
  'ribbon': {
    name: 'Ribbon',
    help: 'Original Shower theme. More details in the <a href="https://github.com/shower/ribbon" target="_blank">Ribbon GitHub repository</a>.'
  },
  'bright': {
    name: 'Bright',
    help: 'Original Shower theme. More details in the <a href="https://github.com/shower/bright" target="_blank">Bright GitHub repository</a>.'
  }
};

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
    theme: 'bootstrap-3'
  }
};

__.keynotes.idOrUrl = function (_id) {
  return {$or: [{_id: _id}, {url: _id}]};
}