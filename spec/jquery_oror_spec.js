// Note that oror() currently screws up the selection stack, so end() won't
// work well.  This will be addressed in future versions.

Screw.Unit(function() {
  describe("#oror", function() {
    before(function() {
      $("#dom_test").append('<div id="thing_1"></div>');
      $("#dom_test").append('<div id="thing_2"></div>');
    });
    
    it("should replace an empty selection with the given object", function() {
      var thing = $("#thing_nonexistent").oror("#thing_2");
      expect(thing).to(equal, $("#thing_2"));
    });
    
    it("should pass a non-empty selection through", function() {
      var thing = $("#thing_1").oror("#thing_2");
      expect(thing).to(equal, $("#thing_1"));
    });
    
    
    describe("given a thunk", function() {
      it("should replace an empty selection with the thunk's value", function() {
        var thing = $("#thing_3").oror(function() {
          return $('<div id="thing_new"></div>').appendTo("#dom_test");
        });
        
        expect(thing).to(equal, $("#thing_new"));
      });
      
      it("should not call the thunk when the selection is non-empty", function() {
        var thing = $("#thing_1").oror(function() {
          return $('<div id="thing_never_built"></div>').appendTo("#dom_test");
        });
        
        expect(thing).to(equal, $("#thing_1"));
        expect($("#thing_never_built")).to(be_empty);
      });
    });
  });
});
