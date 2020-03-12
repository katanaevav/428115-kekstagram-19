'use strict';

(function () {
  var pageBody = document.querySelector('body');
  var uploadPhotoForm = document.querySelector('.img-upload');
  var uploadFileInput = uploadPhotoForm.querySelector('.img-upload__input');
  var imgUploadOverlay = uploadPhotoForm.querySelector('.img-upload__overlay');
  var closeUploadFormButton = uploadPhotoForm.querySelector('.img-upload__cancel');
  var hashtagsInput = uploadPhotoForm.querySelector('.text__hashtags');
  var commentInput = uploadPhotoForm.querySelector('.text__description');

  var onOpenUploadForm = function () {
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

  var onCloseUploadForm = function () {
    hashtagsInput.value = '';
    commentInput.value = '';
    hashtagsInput.oninput();
    imgUploadOverlay.classList.add('hidden');
    if (pageBody.classList.contains('modal-open')) {
      pageBody.classList.remove('modal-open');
    }
    document.removeEventListener('keydown', onCloseUploadEscPress);
    uploadFileInput.value = '';
    window.preview.uploadFormOpened = false;
  };

  var onOpenFile = function (evt) {
    if (pageBody.classList.contains('modal-open')) {
      evt.preventDefault();
    }
  };

  uploadFileInput.addEventListener('keypress', onOpenFile);
  uploadFileInput.addEventListener('change', onOpenUploadForm);
  closeUploadFormButton.addEventListener('click', onCloseUploadForm);

  var onCloseUploadEscPress = function (evt) {
    if ((document.activeElement !== hashtagsInput) && (document.activeElement !== commentInput)) {
      if (evt.key === window.preview.escKey) {
        onCloseUploadForm();
      }
    }
  };

  var form = document.querySelector('.img-upload__form');

  var onSuccessSave = function () {
    onCloseUploadForm();
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

    var onCloseMessage = function () {
      messageWindow.remove();
      document.removeEventListener('keydown', onEscButtonPress);
    };

    var onEscButtonPress = function (evt) {
      if (evt.key === window.preview.escKey) {
        onCloseMessage();
      }
    };

    var button = document.querySelector('.success__button');

    button.addEventListener('click', onCloseMessage);
    messageWindow.addEventListener('click', onCloseMessage);
    document.addEventListener('keydown', onEscButtonPress);
  };

  var onErrorSave = function () {
    closeUploadForm();
    var messageTemplate = document.querySelector('#error')
      .content
      .querySelector('.error');
    var message = messageTemplate.cloneNode(true);
    var fragment = document.createDocumentFragment();
    fragment.appendChild(message);
    var mainBlock = document.querySelector('main');
    mainBlock.appendChild(fragment);
    var messageWindow = document.querySelector('.error');

    var onCloseButtonClick = function () {
      onCloseMessage();
      uploadFileInput.click();
    };

    var onEscButtonPress = function (evt) {
      if (evt.key === window.preview.escKey) {
        onCloseMessage();
      }
    };

    var button = document.querySelector('.error__button');

    button.addEventListener('click', onCloseButtonClick);
    messageWindow.addEventListener('click', onCloseMessage);
    document.addEventListener('keydown', onEscButtonPress);
  };

  form.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.backend.save(new FormData(form), onSuccessSave, onErrorSave);
  });
})();
