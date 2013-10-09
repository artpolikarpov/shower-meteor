__.serializeForm = function (form) {

	var array = $(form).serializeArray(),
      object = _.object(
        _.map(array, function (obj) {
          // Разделители __ в поле name превращаем в точку
          return obj.name.replace(/__/g, '.')
        }),
        _.pluck(array, 'value')
      );

	return object;
};