Package.describe({
  summary: "Presentation engine"
});

Package.on_use(function (api) {
  api.use(['less'], 'client');

  api.add_files(['shower-options.js', 'shower.js'], 'client');

  // Bright theme
  //// CSS
  api.add_files(['themes/bright/styles/screen.less'], 'client');
  //// Fonts
  api.add_files([
    'themes/bright/fonts/Anka.Coder.Italic.woff',
    'themes/bright/fonts/Anka.Coder.woff',
    'themes/bright/fonts/OpenSans.Bold.Italic.woff',
    'themes/bright/fonts/OpenSans.Bold.woff',
    'themes/bright/fonts/OpenSans.Italic.woff',
    'themes/bright/fonts/OpenSans.Light.woff',
    'themes/bright/fonts/OpenSans.woff'
  ], 'client');
  //// Images
  api.add_files([
    'themes/bright/images/grid-4x3.svg',
    'themes/bright/images/grid-16x10.svg',
    'themes/bright/images/mesh.png',
    'themes/bright/images/mesh@2x.png'
  ], 'client');

  // Ribbon theme
  //// CSS
  api.add_files(['themes/ribbon/styles/screen.less'], 'client');
  //// Fonts
  api.add_files([
    'themes/ribbon/fonts/PTMono.woff',
    'themes/ribbon/fonts/PTSans.Bold.Italic.woff',
    'themes/ribbon/fonts/PTSans.Bold.woff',
    'themes/ribbon/fonts/PTSans.Italic.woff',
    'themes/ribbon/fonts/PTSans.Narrow.Bold.woff',
    'themes/ribbon/fonts/PTSans.woff'
  ], 'client');
  //// Images
  api.add_files([
    'themes/ribbon/images/grid-4x3.svg',
      'themes/ribbon/images/grid-16x10.svg',
      'themes/ribbon/images/linen.png',
      'themes/ribbon/images/linen@2x.png',
      'themes/ribbon/images/progress.svg',
      'themes/ribbon/images/ribbon.svg'
  ], 'client');

  api.add_files(['themes-override.less'], 'client');
});
