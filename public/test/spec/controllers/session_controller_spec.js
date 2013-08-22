describe('Controller: SessionCtrl', function () {
  'use strict';
  var scope,
      cookies = {},
      exceptionHandler,
      ctrl;

  // load the controller's module
  beforeEach(module('SessionCtrl'));

  // Initialize the controller and a mock scope
  beforeEach(function () {

    module(function($provide, $exceptionHandlerProvider) {
      $exceptionHandlerProvider.mode('log');
      $provide.value('$cookies', cookies);
      $provide.value('$cookieStore', guestbookMocks.$cookieStore);
      $provide.value('Session', guestbookMocks.Session);
      $provide.value('User', guestbookMocks.User);
    });

    inject(function ($controller, $injector, $rootScope, $exceptionHandler) {
      scope = $rootScope.$new();
      exceptionHandler = $exceptionHandler;
      window = $injector.get('$window');
      ctrl = $controller('SessionCtrl', {$scope:scope, $routeParams: {}});
    });

  });


  describe('on initialization', function () {

    it("should init user and session models", function() {
      expect(scope.new_user).toEqual(new guestbookMocks.User());
      expect(scope.session).toEqual(new guestbookMocks.Session());
    });

  });

  describe('when creating a user', function() {

    it('should save to the server and set a cookie if succesful', function() {
      scope.createUser();
      expect(scope.current_user).toBe(guestbookFixtures.user1);
      expect(guestbookMocks.$cookieStore.put).toHaveBeenCalledWith('current_user', guestbookFixtures.user1);
      expect(scope.signingUp).toBe(false);
    });

  });

  describe('when logging a user', function() {

    it('should authenticate with the server and set a cookie if succesful', function() {
      guestbookMocks.$cookieStore.put.reset();
      scope.signinUser();
      expect(scope.current_user).toBe(guestbookFixtures.user1);
      expect(guestbookMocks.$cookieStore.put).toHaveBeenCalledWith('current_user', guestbookFixtures.user1);
      expect(scope.signingIn).toBe(false);
    });

  });


});
