
angular.module('Message', []).
  // 'name' that will be used to match injection requests - ['inject names to pull in']
    factory('Message', function ($rootScope, $resource) {

 var Message = $resource('/messages/:id.json',
      {},
      {
       index: {method:'GET', isArray:true},
       create: {method: 'POST'},
       count: {method: 'GET', url: '/messages_count.json'}
      }
      );



  return Message;

});