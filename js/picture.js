'use strict';

window.picture = (function () {
  var usersPictureList = document.querySelector('.pictures');
  var photos = [];

  var userPictureTemplate = document.querySelector('#picture')
      .content
      .querySelector('.picture');

  var createUserPicture = function (picture, pid) {
    var userPicture = userPictureTemplate.cloneNode(true);
    userPicture.querySelector('.picture__img').src = picture.url;
    userPicture.querySelector('.picture__img').id = pid;
    userPicture.querySelector('.picture__likes').textContent = picture.likes;
    userPicture.querySelector('.picture__comments').textContent = picture.comments.length;
    return userPicture;
  };

  var renderPhotos = function (photosList) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < photosList.length; i++) {
      fragment.appendChild(createUserPicture(photosList[i], i));
      photos.push(photosList[i]);
    }
    usersPictureList.appendChild(fragment);
  };

  window.backend.load(renderPhotos, window.backend.error);

  return {
    userPhotos: photos
  };
})();
