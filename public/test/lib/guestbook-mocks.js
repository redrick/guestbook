



guestbookMocks = {
  Message: function Message(data) {
    angular.copy(data || {}, this);
  },

  User: {},
  progressbar: {
    color: jasmine.createSpy('color'),
    start: jasmine.createSpy('start'),
    complete: jasmine.createSpy('complete')
  },
  $timeout: jasmine.createSpy('$timeout').andCallFake(function(callback, duration) {
    callback();
  })
}

guestbookFixtures = {
  pageOneMessages: function() {
    var messages = []
    for (i=1;i<20;i++) {
      messages.push({id: i, content: "message " + i})
    }
    return messages;
  },
  message1: {content: "test message 1", id: 1, user_id: 1},
  user1: {id: 1, name: 'test user 1', location: 'test location', email: 'testuser1@example.com'}
}

guestbookMocks.Message.count = jasmine.createSpy('count').andCallFake(function(callback) {
  callback({count: 30});
});

guestbookMocks.Message.index = jasmine.createSpy('index').andCallFake(function(params, callback) {
  callback(guestbookFixtures.pageOneMessages());
  return guestbookFixtures.pageOneMessages();
})

guestbookMocks.Message.prototype.$create = jasmine.createSpy('$create').andCallFake(function(callback) {
  callback(guestbookFixtures.message1)
})

guestbookMocks.User.get = jasmine.createSpy('get').andCallFake(function(params, callback) {
  callback(guestbookFixtures.user1);
});