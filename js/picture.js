'use strict';

(function () {
  var pictureListElement = document.querySelector('.pictures');

  var pictureTemplate = document.querySelector('#picture')
      .content
      .querySelector('.picture');

  var createPictureElement = function (picture) {
    var pictureElement = pictureTemplate.cloneNode(true);
    pictureElement.querySelector('.picture__img').src = picture.url;
    pictureElement.querySelector('.picture__img').id = picture.id;
    pictureElement.querySelector('.picture__likes').textContent = picture.likes;
    pictureElement.querySelector('.picture__comments').textContent = picture.comments.length;
    return pictureElement;
  };

  var renderPhotos = function (photosList) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < photosList.length; i++) {
      fragment.appendChild(createPictureElement(window.gallery.photos[i]));
    }
    pictureListElement.appendChild(fragment);
  };

  renderPhotos(window.gallery.photos);
})();
