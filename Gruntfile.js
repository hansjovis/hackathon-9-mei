/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
    clean: {
      dist: ['dist']
    },
    sass: {
      dist: {
        options: {
          style: 'compressed',
          sourcemap: 'none',
        },
        files: {
          'dist/assets/css/style.css': 'source-files/css/style.scss',
          'dist/assets/css/conditional-style.css': 'source-files/css/conditional-style.scss',
        }
      }
    },
    babel: {
      options: {
        presets: ['minify', '@babel/preset-env']
      },
      dist: {
        files: [
          {
            expand: true,
            cwd: 'source-files/js',
            src: ['*.js'],
            dest: 'dist/assets/js'
          }
        ]
      }
    },
    copy: {
      assets: {
        expand: true,
        src: ['*/**'],
        dest: 'dist/assets',
        flatten: false,
        cwd: 'source-files',
        filter: filepath => ! filepath.endsWith(".scss")
      },
      root: {
        expand: true,
        src: ['*'],
        dest: 'dist/',
        flatten: false,
        cwd: 'source-files',
        filter: filepath => filepath.endsWith(".php")
      }
    },
    compress: {
      main: {
        options: {
          archive: 'dist.zip'
        },
        files: [
          { cwd: 'dist/', src: ['**'], dest: '/', expand: true }
        ]
      }
    }
  });

  // Load tasks here.
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-compress');
  grunt.loadNpmTasks('grunt-babel');

  // Define aliases here.
  grunt.registerTask('build', 'Build for production.', ['clean', 'copy', 'sass', 'babel']);
  grunt.registerTask('artifact', 'Runs ALL the tasks.', ['build', 'compress']);
  grunt.registerTask('default', 'Runs ALL the tasks.', ['build', 'compress']);

};
