Package.describe({
  summary: "Emmet for textarea"
});

Package.on_use(function (api) {
  api.add_files(['emmet.js'], 'client');
});
