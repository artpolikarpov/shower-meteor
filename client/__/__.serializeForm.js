Meteor.startup(function () {

	__.serializeForm = function (form) {
		var array = $(form).serializeArray();

		return _.object(
				_.map(array, function (obj) {
					// Разделители __ в поле name превращаем в точку
					return obj.name.replace(/__/g, '.')
				}),
				_.pluck(array, 'value')
		);
	}

});