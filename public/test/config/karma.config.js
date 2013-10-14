

module.exports = function (config) {
  config.set({
    basePath : '../../',

    files : [
      'vendor/angular.js',
      'vendor/angular-*.js',
      'test/lib/angular-mocks.js',
      'test/lib/guestbook-mocks.js',
      'scripts/**/*.js',
      'test/spec/**/*.js'
    ],

    frameworks : ['jasmine'],

    // server port
    port : 8081,

    // runner port
    runnerPort : 9100,

    browsers : ['PhantomJS'],

    reporters : ['dots'],

    autoWatch : true,

    junitReporter : {
      outputFile: 'test/output/unit-results.xml'
    }
  });
}