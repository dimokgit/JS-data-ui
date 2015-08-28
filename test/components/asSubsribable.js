define(['knockout', 'asSubscribable'], function (ko,asSubsribable) {
  function SubscribableChild() {
    asSubsribable.call(this);
    var obs = ko.observable();
    this.subscribe(obs, function (v) {
    });
  }

  describe('asSubsribable test', function () {

    var sc = new SubscribableChild();
    var element = $("<div/>");
    var elementClicked = "";
    it('should subscribe', function () {
      expect(sc.subscribe(ko.observable()).length).toEqual(2);
    });
    it('should add on ', function () {
      expect(sc.addOn(element, "click", function () { elementClicked = 'clicked'; }).length).toEqual(1);
      $(element).click();

    });
    it('should click ', function () {
      $(element).click();
      expect(elementClicked).toEqual('clicked');
    });
    it('should unsubscribe', function () {
      var d = sc.dispose();
      debugger;
      expect(d.subs.length).toEqual(0);
      expect(d.ons.length).toEqual(0);
    });
    it('should not click ', function () {
      var elementClicked = "";
      $(element).click();
      expect(elementClicked).toEqual('');
    });

  });

});
