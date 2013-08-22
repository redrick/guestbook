describe('Controller: ProfileCtrl', function () {
  'use strict';
  var scope,
      cookies = {},
      exceptionHandler,
      ctrl;

  // load the controller's module
  beforeEach(module('ProfileCtrl'));

  // Initialize the controller and a mock scope
  beforeEach(function () {

    module(function($provide, $exceptionHandlerProvider) {
      $exceptionHandlerProvider.mode('log');
      $provide.value('$cookies', cookies);
      $provide.value('$cookieStore', guestbookMocks.$cookieStore);
      $provide.value('User', guestbookMocks.User);
    });

    inject(function ($controller, $injector, $rootScope, $exceptionHandler) {
      scope = $rootScope.$new();
      scope.current_user = guestbookFixtures.user1
      exceptionHandler = $exceptionHandler;
      window = $injector.get('$window');
      ctrl = $controller('ProfileCtrl', {$scope:scope, $routeParams: {}});
    });

  });


  describe('on initialization', function () {

    it("should instantiate a user model with the current_user's data", function() {
      var user = new guestbookMocks.User();
      user.id = guestbookFixtures.user1.id;
      user.name = guestbookFixtures.user1.name;
      user.location = guestbookFixtures.user1.location;
      expect(scope.user).toEqual(user);
    });

  });

  describe("when updating a user's profile", function () {

    it("should save the user's new info to the server, update current_user, and update the cookie", function() {
      guestbookFixtures.user1.location = "new location";
      scope.updateProfile();
      expect(scope.current_user.location).toEqual("new location");
      expect(guestbookMocks.$cookieStore.put).toHaveBeenCalledWith('current_user', guestbookFixtures.user1);
      expect(scope.editingProfile).toBe(false);
    });

  });


});
