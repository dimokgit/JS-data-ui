define(['knockout', 'asSubscribable'], function (ko,asSubsribable) {
  function SubscribableChild() {
    asSubsribable.call(this);
    var obs = ko.observable();
    this.subscribe(obs, function (v) {
    });
  }

  describe('asSubsribable test', function () {

    var sc = new SubscribableChild();
    it('should subscribe', function () {
      expect(sc.subscribe(ko.observable()).length).toEqual(2);
    });
    it('should unsubscribe', function () {
      expect(sc.dispose().length).toEqual(0);
    });

  });

});
