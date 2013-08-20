angular.module('SessionCtrl', []).
controller('SessionCtrl',
function($rootScope, $scope, $filter, $location, $cookies, $cookieStore,
  $route, $log, $exceptionHandler, User, Session) {

  $scope.new_user = new User();
  $scope.session = new Session();

  $scope.createUser = function() {
    $scope.new_user.$create(function(data) {
      $rootScope.current_user = data;
      $cookieStore.put('current_user', data);
      $rootScope.signingUp = false;
    });
  }

  $scope.signinUser = function() {
    $scope.session.$login(function(data) {
      $rootScope.current_user = data;
      $cookieStore.put('current_user', data);
      $rootScope.signingIn = false;
    })
  };



});