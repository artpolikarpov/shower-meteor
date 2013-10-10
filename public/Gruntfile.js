module.exports = function (grunt) {
  'use strict';
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    s3: {
      options: {
        key: '<%= grunt.file.readJSON("secret.json").s3.key %>',
        secret: '<%= grunt.file.readJSON("secret.json").s3.secret %>',
        bucket: 'fotorama',
        access: 'public-read',
        gzip: true,
        secure: false
      },
      product: {
        options: {
          headers: {'Cache-Control': 'max-age=2592000'}
        },
        upload: [
            // Separate version to separate folder
          {
            src: 'product/*',
            dest: '<%= pkg.version %>/'
          }
        ]
      },
      edge: {
        // Latest to the root
        options: {
          headers: {'Cache-Control': 'max-age=1'}
        },
        upload: [
          {
            src: 'product/fotorama.*',
            dest: ''
          },
          {
            src: 'product/fotorama@2x.png',
            dest: 'fotorama@2x.png'
          }
        ]
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-s3');

};