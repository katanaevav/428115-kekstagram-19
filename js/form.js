'use strict';

(function () {
  var ERROR_MESSAGE = 'error';
  var SUCCESS_MESSAGE = 'success';

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
    window.imageScale.setDefaultScale();
    window.imageEffect.setDefaultEffect();
    pageBody.classList.add('modal-open');
    document.addEventListener('keydown', onCloseUploadEscPress);
    window.preview.uploadFormOpened = true;
  };

  var closeUploadForm = function () {
    var noEffectRadioButton = imgUploadOverlay.querySelector('#effect-none');
    noEffectRadioButton.checked = true;
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

  var generateMessage = function (messageType) {
    var messageTemplate = document.querySelector('#' + messageType)
      .content
      .querySelector('.' + messageType);
    var message = messageTemplate.cloneNode(true);
    var fragment = document.createDocumentFragment();
    fragment.appendChild(message);
    var mainBlock = document.querySelector('main');
    mainBlock.appendChild(fragment);
    var messageWindow = document.querySelector('.' + messageType);

    var closeMessage = function () {
      messageWindow.remove();
      document.removeEventListener('keydown', onEscButtonPress);
    };

    var onCloseButtonClick = function () {
      closeMessage();
      if (messageType === ERROR_MESSAGE) {
        uploadFileInput.click();
      }
    };

    var onEscButtonPress = function (evt) {
      if (evt.key === window.preview.escKey) {
        closeMessage();
      }
    };

    var button = document.querySelector('.' + messageType + '__button');
    button.addEventListener('click', onCloseButtonClick);
    messageWindow.addEventListener('click', closeMessage);
    document.addEventListener('keydown', onEscButtonPress);
  };

  var onSuccessSave = function () {
    imgUploadOverlay.classList.add('hidden');
    generateMessage(SUCCESS_MESSAGE);
  };

  var onErrorSave = function () {
    closeUploadForm();
    generateMessage(ERROR_MESSAGE);
  };

  form.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.backend.save(new FormData(form), onSuccessSave, onErrorSave);
  });
})();
