'use strict';

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

  var getRandomPhotos = function (photos) {
    var randomArray = window.utils.getRandomNumbers(RANDOM_PHOTOS_START, window.picture.userPhotos.length - 1, RANDOM_PHOTOS_COUNT);
    window.picture.filteredPhotos = [];
    for (var i = 0; i < RANDOM_PHOTOS_COUNT; i++) {
      window.picture.filteredPhotos.push(photos[randomArray[i]]);
    }
  };

  var getDisscussedPhotos = function (photos) {
    window.picture.filteredPhotos = photos.map(function (item) {
      return item;
    });
    window.picture.filteredPhotos.sort(function (first, second) {
      if (first.comments.length < second.comments.length) {
        return 1;
      } else if (first.comments.length > second.comments.length) {
        return -1;
      } else {
        return 0;
      }
    });
  };

  var getPhotos = function (photos) {
    window.picture.filteredPhotos = photos.map(function (item) {
      return item;
    });
  };

  var setFilter = window.debounce(function (target) {
    switch (target.id) {
      case RANDOM_PHOTOS:
        getRandomPhotos(window.picture.userPhotos);
        break;
      case DISSCUSSED_PHOTOS:
        getDisscussedPhotos(window.picture.userPhotos);
        break;
      default:
        getPhotos(window.picture.userPhotos);
    }
    window.picture.renderFilteredPhotos(window.picture.filteredPhotos);
  });

  var filterFormButtonClick = function (evt) {
    filterForm.querySelector('.img-filters__button--active').classList.remove('img-filters__button--active');
    evt.target.classList.add('img-filters__button--active');
    setFilter(evt.target);
  };

  filterForm.addEventListener('click', filterFormButtonClick);

})();
