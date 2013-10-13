module.exports = function (grunt) {
  'use strict';
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    // Compile themes
    less: {
      bootstrap: {
        files: {
          'shower/themes/bootstrap-3/styles/boostrap/bootstrap.scss': 'shower/themes/bootstrap-3/styles/boostrap/bootstrap.less'
        }
      }
    },
    sass: {
      bootstrap: {
        files: {
          'shower/themes/bootstrap-3/styles/screen.css': 'shower/themes/bootstrap-3/styles/screen.scss'
        }
      }
    },
    autoprefixer: {
      bootstrap: {
        files: {
          'shower/themes/bootstrap-3/styles/screen.css': 'shower/themes/bootstrap-3/styles/screen.css'
        }
      }
    },
    watch: {
      options: {
        atBegin: true
      },
      bootstrap: {
        files: ['shower/themes/bootstrap-3/fonts/*', 'shower/themes/bootstrap-3/styles/*.scss', 'shower/themes/bootstrap-3/styles/boostrap/*.less'],
        tasks: ['less:bootstrap', 'sass:bootstrap', 'autoprefixer:bootstrap']
      }
    },
    s3: {
      // Upload themes
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
      bootstrap: {
        upload: [
          {
            src: 'shower/themes/*',
            dest: '/'
          },
          // Bootstrap 3
          {
            src: 'shower/themes/bootstrap-3/fonts/*',
            dest: '/bootstrap-3/fonts/'
          },
          {
            src: 'shower/themes/bootstrap-3/styles/*.css',
            dest: '/bootstrap-3/styles/'
          }
        ]
      },
      bright: {
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
            src: 'shower/themes/bright/styles/*.css',
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
            src: 'shower/themes/ribbon/styles/*.css',
            dest: '/ribbon/styles/'
          }
        ]
      },
      ribbon: {
        upload: [
          {
            src: 'shower/themes/*',
            dest: '/'
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
            src: 'shower/themes/ribbon/styles/*.css',
            dest: '/ribbon/styles/'
          }
        ]
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-s3');

};