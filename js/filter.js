'use strict';

(function () {
  var DEBOUNCE_INTERVAL = 300; // ms

  window.debounce = function (cb) {
    var lastTimeout = null;

    return function () {
      var parameters = arguments;
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(function () {
        cb.apply(null, parameters);
      }, DEBOUNCE_INTERVAL);
    };
  };
})();

(function () {
  var randomNumbersArray = function (minNumber, maxNumber, count) {
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

  window.filter = {
    randomNumbersArray: randomNumbersArray
  };
})();

(function () {
  var RANDOM_PHOTOS = 'filter-random';
  var RANDOM_PHOTOS_START = 0;
  var RANDOM_PHOTOS_COUNT = 10;
  var DISSCUSSED_PHOTOS = 'filter-discussed';

  var filterPanel = document.querySelector('.img-filters');
  if (filterPanel.classList.contains('img-filters--inactive')) {
    filterPanel.classList.remove('img-filters--inactive');
  }
  var filterForm = filterPanel.querySelector('.img-filters__form');

  var setFilter = window.debounce(function (target) {
    switch (target.id) {
      case RANDOM_PHOTOS:
        var randomArray = window.filter.randomNumbersArray(RANDOM_PHOTOS_START, window.picture.userPhotos.length - 1, RANDOM_PHOTOS_COUNT);
        window.picture.filteredPhotos = [];
        for (var i = 0; i < RANDOM_PHOTOS_COUNT; i++) {
          window.picture.filteredPhotos.push(window.picture.userPhotos[randomArray[i]]);
        }
        window.picture.renderFilteredPhotos(window.picture.filteredPhotos);
        break;
      case DISSCUSSED_PHOTOS:

        window.picture.renderFilteredPhotos(window.picture.filteredPhotos);
        break;
      default:
        window.picture.filteredPhotos = window.picture.userPhotos.map(function (item) {
          return item;
        });
        window.picture.renderFilteredPhotos(window.picture.filteredPhotos);
    }
  });

  var filterFormButtonClick = function (evt) {
    filterForm.querySelector('.img-filters__button--active').classList.remove('img-filters__button--active');
    evt.target.classList.add('img-filters__button--active');
    setFilter(evt.target);
  };

  filterForm.addEventListener('click', filterFormButtonClick);

})();
