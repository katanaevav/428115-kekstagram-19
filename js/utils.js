'use strict';

window.utils = (function () {
  var ESC_KEY = 'Escape';
  var ENTER_KEY = 'Enter';

  return {
    escKey: ESC_KEY,
    enterKey: ENTER_KEY,
    getRandomValue: function (maxValue) {
      return Math.floor(Math.random() * Math.floor(maxValue));
    }
  };
})();
