'use strict';

window.preview = (function () {
  var ESC_KEY = 'Escape';
  var ENTER_KEY = 'Enter';

  var pageBody = document.querySelector('body');
  var usersPictureList = document.querySelector('.pictures');

  var bigPicture = document.querySelector('.big-picture');
  var closeBigPictureButton = document.querySelector('#picture-cancel');

  var closeBigPicture = function () {
    bigPicture.classList.add('hidden');
    if (pageBody.classList.contains('modal-open')) {
      pageBody.classList.remove('modal-open');
    }
    document.removeEventListener('keydown', onCloseBigPictureEscPress);
  };

  closeBigPictureButton.addEventListener('click', closeBigPicture);

  var onCloseBigPictureEscPress = function (evt) {
    if (evt.key === ESC_KEY) {
      closeBigPicture();
    }
  };

  var generateCommentsStructure = function (commentsArray) {
    var htmlStructure = '';
    for (var i = 0; i < commentsArray.length; i++) {
      htmlStructure += '<li class="social__comment">' +
        '<img ' +
        'class="social__picture" ' +
        'src="' + commentsArray[i].avatar + '" ' +
        'alt="' + commentsArray[i].name + '" ' +
        'width="35" height="35"> ' +
        '<p class="social__text">' + commentsArray[i].message + '</p> ' +
        '</li>';
    }
    return htmlStructure;
  };

  var renderComments = function (photoId) {
    var commentsList = bigPicture.querySelector('.social__comments');
    bigPicture.querySelectorAll('.social__comment').forEach(function (comment) {
      comment.remove();
    });
    commentsList.insertAdjacentHTML('beforeend', generateCommentsStructure(window.picture.userPhotos[photoId].comments));
  };

  var renderBigPicture = function (photoId) {
    var bigPictureImage = bigPicture.querySelector('.big-picture__img').querySelector('img');
    bigPictureImage.setAttribute('src', window.picture.userPhotos[photoId].url);

    var bigPictureLikes = bigPicture.querySelector('.likes-count');
    bigPictureLikes.textContent = window.picture.userPhotos[photoId].likes;

    var bigPictureComments = bigPicture.querySelector('.comments-count');
    bigPictureComments.textContent = window.picture.userPhotos[photoId].comments.length;

    var bigPictureDescription = bigPicture.querySelector('.social__caption');
    bigPictureDescription.textContent = window.picture.userPhotos[photoId].description;

    renderComments(photoId);
  };

  var showBigPicture = function (photoId) {
    renderBigPicture(photoId);
    if (bigPicture.classList.contains('hidden')) {
      bigPicture.classList.remove('hidden');
    }
    pageBody.classList.add('modal-open');
    document.addEventListener('keydown', onCloseBigPictureEscPress);
  };

  var socialCommentsCount = document.querySelector('.social__comment-count');
  socialCommentsCount.classList.add('hidden');

  var commentsLoader = document.querySelector('.comments-loader');
  commentsLoader.classList.add('hidden');

  var onClickUserPicture = function (evt) {
    if (evt.target && evt.target.matches('img')) {
      if (evt.target.classList.contains('picture__img')) {
        showBigPicture(evt.target.id);
      }
    }
  };

  var onEnterPressUserPicture = function (evt) {
    var image = evt.target.querySelector('.picture__img');
    if (image && image.matches('img') && !pageBody.classList.contains('modal-open')) {
      if (evt.key === ENTER_KEY) {
        showBigPicture(image.id);
      }
    }
  };

  usersPictureList.addEventListener('click', onClickUserPicture);
  usersPictureList.addEventListener('keydown', onEnterPressUserPicture);

  return {
    escKey: ESC_KEY
  };
})();
