angular.module('MessagesCtrl', []).
controller('MessagesCtrl',
function($rootScope, $scope, $filter, $location, $cookies, $log,
  $exceptionHandler, $routeParams, Message, User, progressbar, $timeout) {

  progressbar.color("#1abc9c")
  progressbar.start();

  $scope.params = {per_page: 20, page: 1}

   Message.count(function(data) {
    $scope.message_count = data.count
    $scope.pages = [];
    $scope.total_pages = Math.round($scope.message_count/$scope.params.per_page)
    for (var i=0; i < $scope.total_pages; i++) {
      $scope.pages.push(i+1);
    }
  })

  $scope.new_message = new Message();

  $scope.nextPage = function() {
    progressbar.start();
    if ($scope.params.page < $scope.total_pages) {
      $scope.params.page++;
      $scope.getMessages();
    }
  }

  $scope.previousPage = function() {
    progressbar.start();
    if ($scope.params.page > 1) {
      $scope.params.page--;
      $scope.getMessages();
    }
  }

  $scope.jumpToPage = function(page) {
    $scope.params.page = page;
    $scope.getMessages();
  }

  $scope.getMessages = function() {
    if ($routeParams.user_id) {
      $scope.params.user_id = $routeParams.user_id;
      $scope.messages = Message.index($scope.params, function(data) {
        progressbar.complete();
      });
      User.get({id: $scope.params.user_id}, function(data) {
        var name = data.name;
        $scope.title = name + "'s Messages";
      })
    } else {
      $scope.messages = Message.index($scope.params, function(data) {
        console.log('got messages');
        progressbar.complete();
      });
      $scope.title = "All Messages";
    }
  }


  $scope.postMessage = function() {
    $scope.new_message.$create(function(data) {
      $rootScope.creatingMessage = false;
      $scope.new_message = new Message();
      $scope.messages.push(data);
    })
  }


  $timeout(function() {
    $scope.getMessages();
    $scope.$apply();
  }, 0);



});