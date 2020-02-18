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
    if (!pageBody.classList.contains('modal-open')) {
      if (imgUploadOverlay.classList.contains('hidden')) {
        imgUploadOverlay.classList.remove('hidden');
      }
      window.imageScale.setDefaultScale();
      window.imageEffect.setDefaultEffect();
      pageBody.classList.add('modal-open');
      document.addEventListener('keydown', onCloseUploadEscPress);
    }
  };

  var closeUploadForm = function () {
    imgUploadOverlay.classList.add('hidden');
    if (pageBody.classList.contains('modal-open')) {
      pageBody.classList.remove('modal-open');
    }
    document.removeEventListener('keydown', onCloseUploadEscPress);
    uploadFileInput.value = '';
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
})();
