angular.module('MainCtrl', []).
controller('MainCtrl',
function($rootScope, $scope, $filter, $location, $cookies, $cookieStore,
  $route, $log, $exceptionHandler, User, Session) {

  $scope.session = new Session();

  $scope.openSignupForm = function () {
    $rootScope.signingUp = true;
  };

  $scope.closeSignupForm = function () {
    $rootScope.signingUp = false;
  };

  $scope.openSigninForm = function () {
    $rootScope.signingIn = true;
  };

  $scope.closeSigninForm = function () {
    $rootScope.signingIn = false;
  };

  $scope.openMessageForm = function () {
    if ($rootScope.current_user) {
      $rootScope.creatingMessage = true;
    } else {
      $rootScope.signingIn = true;
    }

  };

  $scope.closeMessageForm = function () {
    $rootScope.creatingMessage = false;
  };

  $scope.signoutUser = function() {
    $scope.session.$logout(function() {
      $rootScope.current_user = null;
      $cookieStore.remove('current_user');
    })
  }

});