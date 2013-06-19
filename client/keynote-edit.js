Meteor.startup(function () {

	Meteor.autosubscribe(function () {
		Meteor.subscribe('keynote-edit', Session.get('keynoteEdit'));
	});

	var code;
	var onInputURL = _.debounce(function (url, target) {
		console.log('debounced input [name="url"]', target);
		var $url = $(target);
		Meteor.call('validateKeynoteURL', url, $url.val(), function (err, status) {
			err || $url.parents('.control-group').attr('class', 'control-group ' + status);
		});
	}, 1000);

	Template.keynoteEdit.keynote = function () {
		return Keynotes.findOne(Session.get('keynoteEdit'));
	}



	Template.keynoteEdit.events({
		'input [name="url"]': function (e) {
			console.log('input [name="url"]', e);
			onInputURL(this.url, e.currentTarget);
		},
		'submit form': function (e) {
			e.preventDefault();

			Keynotes.update(this._id, {$set: __.serializeForm(e.currentTarget)});
		},
		'click .js-back': function () {
			Session.set('keynoteEdit', null);
		},
		'click .js-remove': function (e) {
			Session.set('keynoteEdit', null);
			Keynotes.remove(this._id);
		}
	});

	Template.keynoteEdit.rendered = function () {
		code = CodeMirror.fromTextArea(document.getElementById('code'))
	}

});