'use strict';

window.utils = (function () {
  var ESC_KEY = 'Escape';
  var ENTER_KEY = 'Enter';

  // var userPhotos = window.data.getUserPhotos();

  return {
    // photos: userPhotos,
    getRandomValue: function (maxValue) {
      return Math.floor(Math.random() * Math.floor(maxValue));
    },
    escKey: ESC_KEY,
    enterKey: ENTER_KEY
  };
})();
