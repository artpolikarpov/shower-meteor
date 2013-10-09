Meteor.startup(function () {
	Meteor.publish('keynote-show', function (_id) {
		return _id && Keynotes.find({
        $or: [
          _.extend({userId: this.userId}, __.keynotes.idOrUrl(_id)),
          _.extend({show: {$ne: 'none'}}, __.keynotes.idOrUrl(_id))
        ]
    });
	});

  Meteor.publish('keynote-show-current-slide', function (_id) {
    var keynote = Keynotes.findOne(__.keynotes.idOrUrl(_id), {fields: {_id: 1}});
    _id = keynote && keynote._id;
		return _id && CurrentSlides.find({userId: {$ne: this.userId}, keynoteId: _id}, {fields: {currentSlide: 1}});
	});
});