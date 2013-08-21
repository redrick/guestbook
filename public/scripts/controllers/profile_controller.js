angular.module('ProfileCtrl', []).
controller('ProfileCtrl',
function($rootScope, $scope, $filter, $location, $cookies,
  $route, $log, $exceptionHandler, $routeParams, User, $cookieStore) {

  if ($scope.current_user) {
    $scope.user = new User();
    $scope.user.id = $scope.current_user.id;
    $scope.user.name = $scope.current_user.name;
    $scope.user.location = $scope.current_user.location;
  }

  $scope.updateProfile = function() {
    $scope.user.$save(function(user) {
      $scope.current_user = user;
      $cookieStore.put('current_user', user);
      $rootScope.editingProfile = false;
    })
  }

});