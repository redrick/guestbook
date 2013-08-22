angular.module('SessionCtrl', []).
controller('SessionCtrl',
function($rootScope, $scope, $filter, $location, $cookies, $cookieStore,
  $log, $exceptionHandler, User, Session) {

  $scope.new_user = new User();
  $scope.new_user.user = {};
  $scope.session = new Session();
  $scope.session.user = {};

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

  $scope.isValidSession = function() {
    var re = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    var validEmail = re.test($scope.session.user.email);
    return $scope.session.user.email && validEmail && $scope.session.user.password
  }

  $scope.isValidUser = function() {
    var re = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    var validEmail = re.test($scope.new_user.user.email);
    return $scope.new_user.user.email && validEmail && $scope.new_user.user.password && $scope.new_user.user.password.length > 5 && $scope.new_user.user.location && $scope.new_user.user.name
  }

});