module.exports = function (grunt) {
  'use strict';
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    s3: {
      options: {
        key: '<%= grunt.file.readJSON("secret.json").s3.key %>',
        secret: '<%= grunt.file.readJSON("secret.json").s3.secret %>',
        bucket: 'shower-themes',
        access: 'public-read',
        gzip: true,
        secure: false
      },
      themes: {
        options: {
          headers: {'Cache-Control': 'max-age=2592000'}
        },
        upload: [
          {
            src: 'shower/themes/**',
            dest: '/'
          }
        ]
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-s3');

};