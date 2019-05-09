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
          style: 'compressed'
        },
        files: {
          'dist/assets/style.css': 'source-files/style.scss',
        }
      }
    },
    copy: {
      assets: {
        expand: true,
        src: ['source-files/*'],
        dest: 'dist/assets',
        flatten: true,
        filter: filepath => ! filepath.endsWith(".scss")
      },
      index: {
        expand: true,
        src: ['*'],
        dest: 'dist/',
        flatten: true,
        filter: filepath => filepath.endsWith(".html")
      }
    }
  });

  // Load tasks here.
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-clean');

  // Define aliases here.
  grunt.registerTask('default', 'My default task description', ['clean', 'sass', 'copy']);

};
