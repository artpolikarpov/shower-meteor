Package.describe({
  summary: "HTML Presentation Engine"
});

Package.on_use(function (api) {
  api.use(['less'], 'client');

  api.add_files(['shower-options.js', 'shower.js'], 'client');
});
