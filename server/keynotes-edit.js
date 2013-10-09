Meteor.startup(function () {
	Meteor.publish('keynote-edit', function (_id) {
		return _id && Keynotes.find({userId: this.userId, _id: _id});
	});

	Meteor.methods({
		validateKeynoteURL: function (_id, newUrl) {
      newUrl = _.str.trim(newUrl);
			console.log('validateKeynoteURL', newUrl);
			return newUrl ? !newUrl.match(/^[a-z0-9-]+$/i) || Keynotes.find({url: newUrl, _id: {$ne: _id}}, {fields: {_id: 1}}).count() ? 'error' : 'success' : '';
		},
    createCurrentSlide: function (keynoteId) {
      console.log('createCurrentSlide', keynoteId);
      if (CurrentSlides.find({keynoteId: keynoteId}, {fields: {_id: 1}}).count()) return;
      CurrentSlides.insert({
        userId: this.userId,
        keynoteId: keynoteId
      });
    },
    removeCurrentSlide: function (keynoteId) {
      console.log('removeCurrentSlide', keynoteId);
      CurrentSlides.remove({
        userId: this.userId,
        keynoteId: keynoteId
      });
    },
    updateCurrentSlide: function (keynoteId, currentSlide) {
      console.log('updateCurrentSlide', keynoteId, currentSlide);
      CurrentSlides.update({
        userId: this.userId,
        keynoteId: keynoteId
      }, {
        $set: {currentSlide: currentSlide}
      });
    }
	});
});