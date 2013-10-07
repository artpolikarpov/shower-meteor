__.selectOptions = function (options, selected) {
  return _.map(options, function (value, key) {
    var _selected = selected === value;

    return _.extend({
      value: value,
      key: key
    }, _.object(_.map(['selected', 'checked', 'active'], function (keyword) {
      return [keyword, _selected ? keyword : ''];
    })))
  });
}