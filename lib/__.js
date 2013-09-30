__ = {};

__.noop = function () {};

__.month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
	'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

__.getDate = function (utc) {
	var date = new Date(utc),
			nowYear = new Date().getFullYear(),
			year = date.getFullYear();

	return __.month[date.getMonth()] + ' ' + date.getDate() + (nowYear !== year ? ' ' + year : '');
};

__.getTime = function (utc) {
	var date = new Date(utc);
	return date.getHours() + ':' + _.str.pad(date.getMinutes(), 2, '0');
}