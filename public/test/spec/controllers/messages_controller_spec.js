describe('Controller: MessagesCtrl', function () {
  'use strict';
  var scope,
      cookies = {},
      exceptionHandler,
      ctrl;

  // load the controller's module
  beforeEach(module('MessagesCtrl'));

  // Initialize the controller and a mock scope
  beforeEach(function () {

    module(function($provide, $exceptionHandlerProvider) {
      $exceptionHandlerProvider.mode('log');
      $provide.value('$cookies', cookies);
      $provide.value('Message', guestbookMocks.Message);
      $provide.value('User', guestbookMocks.User);
      $provide.value('progressbar', guestbookMocks.progressbar);
    });

  });

  describe('when displaying all messages', function() {

    beforeEach(function() {
      inject(function ($controller, $injector, $rootScope, $exceptionHandler) {
        scope = $rootScope.$new();
        exceptionHandler = $exceptionHandler;
        window = $injector.get('$window');
        ctrl = $controller('MessagesCtrl', {$scope:scope, $routeParams: {}});
      });
    });

    describe('on initialization', function () {

      it("should setup and start the progressbar", function() {
        expect(guestbookMocks.progressbar.color).toHaveBeenCalled();
        expect(guestbookMocks.progressbar.start).toHaveBeenCalled();
      });

      it("should set default params", function() {
        expect(scope.params).toEqual({per_page: 20, page: 1})
      });

      it("should get total message count from server and set pagination details", function () {
        expect(guestbookMocks.Message.count).toHaveBeenCalled();
        expect(scope.message_count).toBe(30);
        expect(scope.total_pages).toBe(2);
        expect(scope.pages).toEqual([1,2]);
      });

      it("should initialize a new message", function() {
        expect(scope.new_message).toEqual(new guestbookMocks.Message())
      });

    });

    describe('when getting all messages', function() {

      it('should get the first page of messages from the server and set the right title', function() {

      });

    });

  });

  describe('when displaying all messages from a specific user', function() {

    beforeEach(function() {
      inject(function ($controller, $injector, $rootScope, $exceptionHandler) {
        scope = $rootScope.$new();
        exceptionHandler = $exceptionHandler;
        window = $injector.get('$window');
        ctrl = $controller('MessagesCtrl', {$scope:scope, $routeParams: {user_id: 1}});
      });
    })

    describe('when getting all messages', function() {

      it('should only get the first page of messages for the specific user in question', function() {

      })

    })

  });


});
