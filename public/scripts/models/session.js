
angular.module('Session', []).
  // 'name' that will be used to match injection requests - ['inject names to pull in']
    factory('Session', function ($rootScope, $resource) {


 var Session = $resource('/sessions/:id.json',
      {},
      {
       login: {method:'POST'},
       logout: {method: 'DELETE'}
      }
      );

  Session.current_user = null;

  return Session;

});