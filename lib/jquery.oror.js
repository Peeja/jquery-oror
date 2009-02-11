(function($) {
  $.fn.oror = function(alternate) {
    if (this.length == 0) {
      if ($.isFunction(alternate)) {
        return alternate();
      } else {
        return $(alternate);
      };
    } else {
      return this;
    };
  };
})(jQuery)
