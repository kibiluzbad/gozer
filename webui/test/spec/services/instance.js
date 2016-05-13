'use strict';

describe('Service: instance', function () {

  // load the service's module
  beforeEach(module('gozerWebApp'));

  // instantiate service
  var instance;
  beforeEach(inject(function (_instance_) {
    instance = _instance_;
  }));

  it('should do something', function () {
    expect(!!instance).toBe(true);
  });

});
