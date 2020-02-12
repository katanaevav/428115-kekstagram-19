'use strict';

window.gallery = (function () {
  var ESC_KEY = 'Escape';
  var ENTER_KEY = 'Enter';

  var userPhotos = window.data.getUserPhotos();

  return {
    photos: userPhotos,
    escKey: ESC_KEY,
    enterKey: ENTER_KEY
  };
})();
