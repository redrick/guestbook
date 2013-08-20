angular.module('MessagesCtrl', []).
controller('MessagesCtrl',
function($rootScope, $scope, $filter, $location, $cookies,
  $route, $log, $exceptionHandler, $routeParams, Message, User) {


  $scope.params = {per_page: 20, page: 1}

  setTimeout(function() {
    $scope.getMessages();
    $scope.$apply();
  }, 0);

   Message.count(function(data) {
    $scope.message_count = data.count
    $scope.pages = []
    $scope.total_pages = Math.round($scope.message_count/$scope.params.per_page)
    for (var i=0; i < $scope.total_pages; i++) {
      $scope.pages.push(i+1);
    }
  })

  $scope.new_message = new Message();

  $scope.nextPage = function() {
    if ($scope.params.page < $scope.total_pages) {
      $scope.params.page++;
      $scope.getMessages();
    }
  }

  $scope.previousPage = function() {
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
      $scope.messages = Message.index($scope.params);
      User.get({id: $scope.params.user_id}, function(data) {
        var name = data.name;
        $scope.title = name + "'s Messages";
      })
    } else {
      $scope.messages = Message.index($scope.params);
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


  // socket = new WebSocket("ws://0.0.0.0:9292/rt");
  // socket.onmessage = function(message) {
  //   alert(message.data);
  // }
  // setTimeout(function() {
  //   socket.send('zing!');
  // }, 3000);




});