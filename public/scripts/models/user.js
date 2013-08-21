
angular.module('User', []).
  // 'name' that will be used to match injection requests - ['inject names to pull in']
    factory('User', function ($rootScope, $resource) {

 var User = $resource('/users/:id.json',
      {id:'@id'},
      {
       index: {method:'GET', isArray:true},
       create: {method: 'POST'},
       get: {method: 'GET'},
       save: {method: 'PATCH'}
      }
      );



  return User;

});