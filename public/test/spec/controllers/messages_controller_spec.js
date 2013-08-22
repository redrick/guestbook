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
      $provide.value('$timeout', guestbookMocks.$timeout)
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

      it("should get messages in a timeout function to ensure animation happens", function() {
        expect(guestbookMocks.$timeout).toHaveBeenCalledWith(jasmine.any(Function), 0);
      })

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

      beforeEach(function() {
        guestbookMocks.progressbar.start.reset();
      })

      it('should get the first page of messages from the server and set the right title', function() {
        scope.getMessages();
        expect(scope.messages).toEqual(guestbookFixtures.pageOneMessages());
        expect(scope.title).toEqual("All Messages");
        expect(guestbookMocks.progressbar.complete).toHaveBeenCalled();
      });

      it('should get allow getting of next and previous pages', function() {
        scope.nextPage();
        expect(guestbookMocks.progressbar.start).toHaveBeenCalled();
        expect(scope.params.page).toBe(2);
        scope.previousPage();
        expect(guestbookMocks.progressbar.start).toHaveBeenCalled();
        expect(scope.params.page).toBe(1);
      })

    });

    it('should allow posting of messages', function() {
      scope.new_message.content = guestbookFixtures.message1.content;
      scope.messages = [];
      scope.postMessage();
      expect(scope.messages[0]).toEqual(guestbookFixtures.message1)
    })

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
        scope.getMessages();
        expect(scope.params.user_id).toBe(1);
        expect(guestbookMocks.User.get).toHaveBeenCalledWith({id: 1}, jasmine.any(Function))
        expect(scope.title).toEqual("test user 1's Messages")
      })

    })

  });


});
