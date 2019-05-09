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

  // Define aliases here.
  grunt.registerTask('build', 'Build for production.', ['clean', 'sass', 'copy']);
  grunt.registerTask('default', 'Runs ALL the tasks.', ['build', 'compress']);

};
