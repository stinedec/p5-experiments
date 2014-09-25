/*jshint maxstatements:false */
/**
 * build.config
 */
module.exports = function(grunt) {
  'use strict';

  // Define grunt config option
  grunt.config.set('config', require('./Gruntconfig')());

  // Load project configuration
  require('grunt-config-dir')(grunt, {
    configDir: require('path').resolve('build/config')
  });

  // Measures the time each task takes
  require('time-grunt')(grunt);

  grunt.registerTask('serve', 'start the server and preview your app, --allow-remote for remote access', function (target) {
    if (grunt.option('allow-remote')) {
      grunt.config.set('connect.options.hostname', '0.0.0.0');
    }
    if (target === 'dist') {
      return grunt.task.run(['build', 'connect:dist:keepalive']);
    }

    grunt.task.run([
      'clean:dev',
      'bower:dev',
      'concurrent:dev',
      'concat',
      'connect:dev',
      'watch',
      'modernizr:dev'
    ]);
  });

  grunt.registerTask('dist', 'build all static files', [
    'clean:dist',
    'bower:dist',
    'compass:dist',
    'concat',
    'imagemin:dist',
    'svgmin:dist',
    'cssmin:dist',
    'htmlmin:dist',
    'copy:dist',
    'modernizr:dist'
  ]);
};
