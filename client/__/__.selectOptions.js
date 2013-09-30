__.selectOptions = function (options, selected) {
  return _.map(options, function (value, key) {
    return {
      value: value,
      key: key,
      selected: selected === value ? 'selected' : ''
    }
  });
}