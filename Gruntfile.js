/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
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
        src: ['index.html'],
        dest: 'dist/',
        flatten: true,
        filter: 'isFile'
      }
    }
  });

  // Load tasks here.
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-sass');

  // Define aliases here.
  grunt.registerTask('default', 'My default task description', ['sass', 'copy']);

};
