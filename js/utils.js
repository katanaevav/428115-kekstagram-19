'use strict';

(function () {
  var getRandomNumbers = function (minNumber, maxNumber, count) {
    var array = [];
    var number;
    while (array.length < count) {
      number = Math.floor((minNumber + Math.random()) * maxNumber);
      if (array.indexOf(number) === -1) {
        array.push(number);
      }
    }
    return array;
  };

  window.utils = {
    getRandomNumbers: getRandomNumbers
  };
})();
