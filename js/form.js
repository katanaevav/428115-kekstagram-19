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
    window.imageScale.setDefaultScale();
    window.imageEffect.setDefaultEffect();
    pageBody.classList.add('modal-open');
    document.addEventListener('keydown', onCloseUploadEscPress);
    window.preview.uploadFormOpened = true;
  };

  var closeUploadForm = function () {
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

    (function () {
      var successMessageTemplate = document.querySelector('#success')
      .content
      .querySelector('.success');
      var successMessage = successMessageTemplate.cloneNode(true);
      var fragment = document.createDocumentFragment();
      fragment.appendChild(successMessage);
      var mainBlock = document.querySelector('main');
      mainBlock.appendChild(fragment);

      var messageWindow = document.querySelector('.success');

      var closeMessage = function () {
        messageWindow.remove();
        document.removeEventListener('keydown', onEscPress);
      };

      var onEscPress = function (evt) {
        if (evt.key === window.preview.escKey) {
          closeMessage();
        }
      };

      var successButton = document.querySelector('.success__button');
      successButton.addEventListener('click', closeMessage);
      messageWindow.addEventListener('click', closeMessage);
      document.addEventListener('keydown', onEscPress);
    })();
  };

  var onErrorSave = function () {
    closeUploadForm();
    var errorMessageTemplate = document.querySelector('#error')
    .content
    .querySelector('.error');
    var errorMessage = errorMessageTemplate.cloneNode(true);
    var fragment = document.createDocumentFragment();
    fragment.appendChild(errorMessage);
    var mainBlock = document.querySelector('main');
    mainBlock.appendChild(fragment);

    var messageWindow = document.querySelector('.error');

    var closeMessage = function () {
      messageWindow.remove();
      document.removeEventListener('keydown', onEscPress);
    };

    var closeMessageWithButton = function () {
      closeMessage();
      uploadFileInput.click();
    };

    var onEscPress = function (evt) {
      if (evt.key === window.preview.escKey) {
        closeMessage();
      }
    };

    var errorButton = document.querySelector('.error__button');
    errorButton.addEventListener('click', closeMessageWithButton);
    messageWindow.addEventListener('click', closeMessage);
    document.addEventListener('keydown', onEscPress);
  };

  form.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.backend.save(new FormData(form), onSuccessSave, onErrorSave);
  });
})();
