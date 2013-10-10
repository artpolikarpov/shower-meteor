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
        secure: false,
        headers: {
          // Two Year cache policy (1000 * 60 * 60 * 24 * 730)
          "Cache-Control": "max-age=630720000, public",
          "Expires": new Date(Date.now() + 63072000000).toUTCString()
        }
      },
      themes: {
        upload: [
          {
            src: 'shower/themes/*',
            dest: '/'
          },
          // Bright
          {
            src: 'shower/themes/bright/fonts/*',
            dest: '/bright/fonts/'
          },
          {
            src: 'shower/themes/bright/images/*',
            dest: '/bright/images/'
          },
          {
            src: 'shower/themes/bright/styles/*',
            dest: '/bright/styles/'
          },

          // Ribbon
          {
            src: 'shower/themes/ribbon/fonts/*',
            dest: '/ribbon/fonts/'
          },
          {
            src: 'shower/themes/ribbon/images/*',
            dest: '/ribbon/images/'
          },
          {
            src: 'shower/themes/ribbon/styles/*',
            dest: '/ribbon/styles/'
          }
        ]
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-s3');

};