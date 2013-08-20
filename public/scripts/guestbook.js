angular.module('guestbook',
    [ 'MessagesCtrl', 'SessionCtrl', 'ngCookies', 'ngResource',
    'Message', 'User', 'ngAnimate', 'ngRoute', 'ui.bootstrap',
    'MainCtrl', 'Session'])
    .config(function($routeProvider, $locationProvider, $dialogProvider) {
  'use strict';

  // @if ENV='production'
  // $locationProvider.html5Mode(true);
  // @endif

  $dialogProvider.options({backdrop: true, dialogFade: false, backdropClick: true});

  $routeProvider
    .when('/', {
      templateUrl:'views/messages.html',
      controller:'MessagesCtrl'
    })
    .when('/users/:user_id/messages', {
      templateUrl:'views/messages.html',
      controller:'MessagesCtrl'
    })

    .otherwise({
      redirectTo:'/'
    })
})

.run(function($rootScope, $cookieStore, $animate) {
  $animate.enabled(true);
  $rootScope.current_user = $cookieStore.get('current_user');
});





