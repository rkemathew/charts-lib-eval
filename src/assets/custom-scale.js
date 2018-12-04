(function (factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory;
  } else {
    factory(Highcharts);
  }
}(function (Highcharts) {
  (function (H) {
    H.wrap(H.Axis.prototype, 'translate', function(proceed) {
      // Normal Translation
      let result = proceed.apply(this, [].slice.call(arguments, 1));

      // Conditionally change scaling
      if (this.options.scaling) {
        // Just an example function
        result = 50 * arguments[1] + 10 * arguments[1] * arguments[1];
      }
      return result;
    });
  }(Highcharts));
}));