'use strict';

(function () {
  var SCALE_MIN = 25;
  var SCALE_MAX = 100;
  var SCALE_DEFAULT = '100';
  var SCALE_INC = 25;

  var uploadPhotoForm = document.querySelector('.img-upload');
  var previewPhoto = uploadPhotoForm.querySelector('.img-upload__preview');
  var scalePlusButton = uploadPhotoForm.querySelector('.scale__control--bigger');
  var scaleMinusButton = uploadPhotoForm.querySelector('.scale__control--smaller');
  var scaleValueInput = uploadPhotoForm.querySelector('.scale__control--value');

  var setScaleValue = function (scaleValue) {
    previewPhoto.style.transform = 'scale(' + scaleValue / SCALE_MAX + ')';
    scaleValueInput.value = scaleValue + '%';
  };

  var increaseImageSize = function () {
    scaleValueInput.value = parseInt(scaleValueInput.value, 10) + SCALE_INC;
    if (scaleValueInput.value > SCALE_MAX) {
      scaleValueInput.value = SCALE_MAX;
    }
    setScaleValue(scaleValueInput.value);
  };

  scalePlusButton.addEventListener('click', increaseImageSize);

  var decreaseImageSize = function () {
    scaleValueInput.value = parseInt(scaleValueInput.value, 10) - SCALE_INC;
    if (scaleValueInput.value < SCALE_MIN) {
      scaleValueInput.value = SCALE_MIN;
    }
    setScaleValue(scaleValueInput.value);
  };

  scaleMinusButton.addEventListener('click', decreaseImageSize);

  var setDefaultScaleValue = function () {
    setScaleValue(SCALE_DEFAULT);
  };

  window.imageScale = {
    setDefaultScale: setDefaultScaleValue
  };
})();
