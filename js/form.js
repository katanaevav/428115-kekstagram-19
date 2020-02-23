'use strict';

(function () {
  var pageBody = document.querySelector('body');
  var uploadPhotoForm = document.querySelector('.img-upload');
  var uploadFileInput = uploadPhotoForm.querySelector('#upload-file');
  var imgUploadOverlay = uploadPhotoForm.querySelector('.img-upload__overlay');
  var closeUploadFormButton = uploadPhotoForm.querySelector('#upload-cancel');
  var hashtagsInput = uploadPhotoForm.querySelector('.text__hashtags');
  var commentInput = uploadPhotoForm.querySelector('.text__description');

  var openUploadForm = function () {
    if (imgUploadOverlay.classList.contains('hidden')) {
      imgUploadOverlay.classList.remove('hidden');
    }
    imgUploadOverlay.querySelector('#effect-none').checked = true;
    window.imageScale.setDefaultScale();
    window.imageEffect.setDefaultEffect();
    pageBody.classList.add('modal-open');
    document.addEventListener('keydown', onCloseUploadEscPress);
    window.preview.uploadFormOpened = true;
  };

  var closeUploadForm = function () {
    hashtagsInput.value = '';
    commentInput.value = '';
    imgUploadOverlay.classList.add('hidden');
    if (pageBody.classList.contains('modal-open')) {
      pageBody.classList.remove('modal-open');
    }
    document.removeEventListener('keydown', onCloseUploadEscPress);
    uploadFileInput.value = '';
    window.preview.uploadFormOpened = false;
  };

  var openFile = function (evt) {
    if (pageBody.classList.contains('modal-open')) {
      evt.preventDefault();
    }
  };

  uploadFileInput.addEventListener('keypress', openFile);
  uploadFileInput.addEventListener('change', openUploadForm);
  closeUploadFormButton.addEventListener('click', closeUploadForm);

  var onCloseUploadEscPress = function (evt) {
    if ((document.activeElement !== hashtagsInput) && (document.activeElement !== commentInput)) {
      if (evt.key === window.preview.escKey) {
        closeUploadForm();
      }
    }
  };

  var form = document.querySelector('.img-upload__form');

  var onSuccessSave = function () {
    imgUploadOverlay.classList.add('hidden');
    var messageTemplate = document.querySelector('#success')
      .content
      .querySelector('.success');
    var message = messageTemplate.cloneNode(true);
    var fragment = document.createDocumentFragment();
    fragment.appendChild(message);
    var mainBlock = document.querySelector('main');
    mainBlock.appendChild(fragment);
    var messageWindow = document.querySelector('.success');

    var closeMessage = function () {
      closeUploadForm();
      messageWindow.remove();
      document.removeEventListener('keydown', onEscButtonPress);
    };

    var onEscButtonPress = function (evt) {
      if (evt.key === window.preview.escKey) {
        closeMessage();
      }
    };

    var button = document.querySelector('.success__button');

    button.addEventListener('click', closeMessage);
    messageWindow.addEventListener('click', closeMessage);
    document.addEventListener('keydown', onEscButtonPress);
  };

  var onErrorSave = function () {
    var messageTemplate = document.querySelector('#error')
      .content
      .querySelector('.error');
    var message = messageTemplate.cloneNode(true);
    var fragment = document.createDocumentFragment();
    fragment.appendChild(message);
    var mainBlock = document.querySelector('main');
    mainBlock.appendChild(fragment);
    var messageWindow = document.querySelector('.error');

    var closeMessage = function () {
      closeUploadForm();
      messageWindow.remove();
      document.removeEventListener('keydown', onEscButtonPress);
    };

    var onCloseButtonClick = function () {
      closeMessage();
      uploadFileInput.click();
    };

    var onEscButtonPress = function (evt) {
      if (evt.key === window.preview.escKey) {
        closeMessage();
      }
    };

    var button = document.querySelector('.error__button');

    button.addEventListener('click', onCloseButtonClick);
    messageWindow.addEventListener('click', closeMessage);
    document.addEventListener('keydown', onEscButtonPress);
  };

  form.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.backend.save(new FormData(form), onSuccessSave, onErrorSave);
  });
})();
