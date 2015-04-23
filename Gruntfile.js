module.exports = function(grunt) {
  grunt.initConfig({
    exec: {
      jest: 'node node_modules/jest-cli/bin/jest'
    },
    watch: {
      files: ['js/**/*.js'],
      tasks: ['exec:jest']
    },
    notify_hooks: {
      options: {
        enabled: true,
        max_jshint_notifications: 5, // maximum number of notifications from jshint output
        title: "Sopos", // defaults to the name in package.json, or will use project directory's name
        success: true, // whether successful grunt executions should be notified automatically
        duration: 3 // the duration of notification in seconds, for `notify-send only
      }
    }
  });
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-exec');
  // Load the task
  grunt.loadNpmTasks('grunt-notify');

  // This is required if you use any options.
  grunt.task.run('notify_hooks');
};
