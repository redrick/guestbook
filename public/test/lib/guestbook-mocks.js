



guestbookMocks = {
  Message: function Message(data) {
    angular.copy(data || {}, this);
  },
  User: {},
  progressbar: {
    color: jasmine.createSpy('color'),
    start: jasmine.createSpy('start'),
    complete: jasmine.createSpy('complete')
  }
}

guestbookMocks.Message.count = jasmine.createSpy('count').andCallFake(function(callback) {
  callback({count: 30});
});