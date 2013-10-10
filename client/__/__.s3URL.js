__.s3URL = function () {
  if (!__.isProduction()) {
    return 'http://shower-themes.s3.amazonaws.com';
  } else {
    return '/shower/themes';
  }
};