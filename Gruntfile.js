/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
    copy: {
      assets: {
        expand: true,
        src: ['source-files/*'],
        dest: 'dist/assets',
        flatten: true,
        filter: 'isFile'
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

  // Define aliases here.
  grunt.registerTask('default', 'My default task description', function() {
    grunt.log.writeln( 'This is the default grunt task, create a new task and configure.' );
  });

};
