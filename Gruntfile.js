'use strict';

module.exports = function (grunt) {

  // Load grunt tasks automatically, when needed
  require('jit-grunt')(grunt, {
    buildcontrol: 'grunt-build-control'
  });

  grunt.initConfig({
    clean: {
      demo: ['build']
    },
    less: {
      development: {
        options: {
          compress: true,
          yuicompress: true,
          optimization: 2
        },
        files: {
          'build/inputfile.css': 'src/inputfile.less', // destination file and source file
          'build/base.css': 'demo/base.less', // destination file and source file
        }
      }
    },
    copy: {
      demo: {
        files: {
          'build/index.html': ['demo/index.html'],
          'build/inputfile.css': ['demo/inputfile.css'],
          'build/assets/plus-white.svg': ['src/assets/plus-white.svg'],
        }
      }
    },

    browserify: {
      options: {
        alias: {
          'diffex': './src/index.js'
        }
      },
      demo: {
        files: {
          'build/index.js': ['demo/index.js']
        },
        options: {
          watch: true
        }
      }
    },

    buildcontrol: {
      options: {
        dir: 'build',
        commit: true,
        push: true,
        connectCommits: false,
        message: 'Built live demo from commit %sourceCommit%'
      },
      demo: {
        options: {
          // Update the remote to point to your github repo
          remote: 'git@github.com:theRealPadster/improved-file-input.git',
          branch: 'gh-pages',
        }
      }
    },

    connect: {
      dev: {
        options: {
          base: 'build',
          hostname: 'localhost',
          port: 3000,
          livereload: true
        }
      }
    },

    watch: {
      dev: {
        files: ['build/index.js', 'demo/index.html'],
        tasks: ['copy'],
        options: {
          livereload: true
        }
      },
      styles: {
        files: ['src/**/*.less', 'demo/**/*.less'], // which files to watch
        tasks: ['less'],
        options: {
          nospawn: true,
          livereload: true
        }
      }

    }
  });

  grunt.registerTask('build', ['clean', 'less', 'copy', 'browserify']);
  grunt.registerTask('serve', ['build', 'connect', 'watch']);
  grunt.registerTask('deploy', ['build', 'buildcontrol']);
  grunt.registerTask('default', ['serve']);
};
