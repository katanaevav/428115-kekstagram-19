'use strict';

(function () {
  var usersPictureList = document.querySelector('.pictures');
  var photos = [];
  var filteredPhotos = [];

  var userPictureTemplate = document.querySelector('#picture')
      .content
      .querySelector('.picture');

  var createUserPicture = function (picture, pictureId) {
    var userPicture = userPictureTemplate.cloneNode(true);
    userPicture.querySelector('.picture__img').src = picture.url;
    userPicture.querySelector('.picture__img').id = pictureId;
    userPicture.querySelector('.picture__likes').textContent = picture.likes;
    userPicture.querySelector('.picture__comments').textContent = picture.comments.length;
    return userPicture;
  };

  var renderPhotos = function (photosList) {
    var fragment = document.createDocumentFragment();
    // for (var i = 0; i < photosList.length; i++) {
    //   fragment.appendChild(createUserPicture(photosList[i], i));
    //   photos.push(photosList[i]);
    //   filteredPhotos.push(photosList[i]);
    // }
    photosList.forEach(function (item, index) {
      fragment.appendChild(createUserPicture(item, index));
      photos.push(item);
      filteredPhotos.push(item);
    });
    usersPictureList.appendChild(fragment);

    window.filter.showButtons();
  };

  var removeUsersPhotos = function () {
    var userPictures = usersPictureList.querySelectorAll('.picture');
    userPictures.forEach(function (item) {
      item.remove();
    });
  };

  var renderFilteredPhotos = function (photosList) {
    removeUsersPhotos();
    var fragment = document.createDocumentFragment();
    // for (var i = 0; i < photosList.length; i++) {
    //   fragment.appendChild(createUserPicture(photosList[i], i));
    // }
    photosList.forEach(function (item, index) {
      fragment.appendChild(createUserPicture(item, index));
    });
    usersPictureList.appendChild(fragment);
  };

  window.backend.load(renderPhotos, window.backend.error);

  window.picture = {
    userPhotos: photos,
    filteredPhotos: filteredPhotos,
    renderFilteredPhotos: renderFilteredPhotos
  };
})();
