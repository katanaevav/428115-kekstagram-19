'use strict';

(function () {
  var usersPictureList = document.querySelector('.pictures');

  var userPictureTemplate = document.querySelector('#picture')
      .content
      .querySelector('.picture');

  var createUserPicture = function (picture) {
    var userPicture = userPictureTemplate.cloneNode(true);
    userPicture.querySelector('.picture__img').src = picture.url;
    userPicture.querySelector('.picture__img').id = picture.id;
    userPicture.querySelector('.picture__likes').textContent = picture.likes;
    userPicture.querySelector('.picture__comments').textContent = picture.comments.length;
    return userPicture;
  };

  var renderPhotos = function (photosList) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < photosList.length; i++) {
      fragment.appendChild(createUserPicture(window.gallery.photos[i]));
    }
    usersPictureList.appendChild(fragment);
  };

  renderPhotos(window.gallery.photos);
})();
