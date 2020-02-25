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
  var RANDOM_PHOTOS = 'filter-random';
  var DISSCUSSED_PHOTOS = 'filter-discussed';

  var filterPanel = document.querySelector('.img-filters');
  if (filterPanel.classList.contains('img-filters--inactive')) {
    filterPanel.classList.remove('img-filters--inactive');
  }
  var filterForm = filterPanel.querySelector('.img-filters__form');

  var setFilter = window.debounce(function (target) {
    switch (target.id) {
      case RANDOM_PHOTOS:
        window.picture.filteredPhotos.pop();
        window.picture.filteredPhotos.pop();
        window.picture.filteredPhotos.pop();
        console.log(window.picture.filteredPhotos);
        console.log(window.picture.userPhotos);
        window.picture.renderFilteredPhotos(window.picture.filteredPhotos);
        break;
      case DISSCUSSED_PHOTOS:
        console.log(window.picture.filteredPhotos);
        console.log(window.picture.userPhotos);
        window.picture.renderFilteredPhotos(window.picture.filteredPhotos);
        break;
      default:
        window.picture.filteredPhotos = window.picture.userPhotos.map(function (item) {
          return item;
        });
        console.log(window.picture.filteredPhotos);
        console.log(window.picture.userPhotos);
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
