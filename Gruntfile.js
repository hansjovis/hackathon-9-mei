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
    },
    'update-version': {
      files: [
          'source-files/index.php',
          'source-files/classes/class.php',
          'source-files/js/script.js'
      ]
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

  grunt.registerTask('update-version', 'Updates the version number.', version_number => {
    // Validate input.
    if ( ! version_number.match(/[0-9]+\.[0-9]+\.[0-9]+/) ) {
      grunt.fail.fatal('please enter a valid version number');
    }

    grunt.log.writeln( 'updating version number to', version_number );

    const config = grunt.config.get('update-version');
    const files_to_process = config.files;

    files_to_process.forEach( filepath => {
      grunt.log.writeln( `  updating "${filepath}"`);

      let contents = grunt.file.read(filepath);
      contents = contents.replace(/[0-9]+\.[0-9]+\.[0-9]+/, version_number);
      grunt.file.write(filepath, contents);
    });

  });

};
