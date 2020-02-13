'use strict';

(function () {
  var PHOBOS_MAX = 3;
  var HEAT_MIN = 1;
  var HEAT_MAX = 3;
  var EFFECT_DEFAULT = 100;
  var EFFECT_MAX = 100;
  var SCALE_MIN = 25;
  var SCALE_MAX = 100;
  var SCALE_DEFAULT = 100;
  var SCALE_INC = 25;
  var EFFECT_NAME_DEFAULT = 'effect-none';

  var HASHTAG_MIN_LENGTH = 2;
  var HASHTAG_MAX_LENGTH = 20;
  var HASHTAG_MAX_COUNT = 5;
  var COMMENT_LENGTH = 140;

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
    setScaleValue(SCALE_DEFAULT);
    setEffectClass(EFFECT_NAME_DEFAULT);
    pageBody.classList.add('modal-open');
    document.addEventListener('keydown', onCloseUploadEscPress);
  };

  var closeUploadForm = function () {
    imgUploadOverlay.classList.add('hidden');
    if (pageBody.classList.contains('modal-open')) {
      pageBody.classList.remove('modal-open');
    }
    document.removeEventListener('keydown', onCloseUploadEscPress);
    uploadFileInput.value = '';
  };


  uploadFileInput.addEventListener('change', function () {
    openUploadForm();
  });

  closeUploadFormButton.addEventListener('click', function () {
    closeUploadForm();
  });

  var onCloseUploadEscPress = function (evt) {
    if ((document.activeElement !== hashtagsInput) && (document.activeElement !== commentInput)) {
      if (evt.key === window.gallery.escKey) {
        closeUploadForm();
      }
    }
  };

  // .effect-level__pin mouseup

  var effectLine = uploadPhotoForm.querySelector('.effect-level__line');
  var effectLevelInput = uploadPhotoForm.querySelector('.effect-level__value');
  var effectLevelPin = uploadPhotoForm.querySelector('.effect-level__pin');

  var getEffectLevel = function () {
    var lineX = Math.round(effectLine.getBoundingClientRect().x);
    var lineWidth = effectLine.getBoundingClientRect().width;
    var pinX = Math.round(effectLevelPin.getBoundingClientRect().x);
    var pinWidth = effectLevelPin.getBoundingClientRect().width;

    return Math.round((100 * (pinX + (pinWidth / 2) - lineX) / (lineWidth)));
  };

  var getEffectValue = function (effectLevel, effectName) {
    var effectValue = 1;

    switch (effectName) {
      case 'effect-chrome': {
        effectValue = effectLevel / EFFECT_MAX;
        break;
      }
      case 'effect-sepia': {
        effectValue = effectLevel / EFFECT_MAX;
        break;
      }
      case 'effect-marvin': {
        effectValue = effectLevel;
        break;
      }
      case 'effect-phobos': {
        effectValue = effectLevel * PHOBOS_MAX / EFFECT_MAX;
        break;
      }
      case 'effect-heat': {
        effectValue = ((effectLevel < HEAT_MIN) ? 1 : effectLevel) * HEAT_MAX / EFFECT_MAX;
        break;
      }
      default: {
        effectValue = effectLevel;
      }
    }

    return effectValue;
  };

  effectLevelPin.addEventListener('mouseup', function () {
    effectLevelInput.value = getEffectValue(getEffectLevel(), currentEffect);
    setEffectClass(currentEffect);
  });

  var effectRadio = uploadPhotoForm.querySelectorAll('.effects__radio');
  var currentEffect;

  var previewPhoto = uploadPhotoForm.querySelector('.img-upload__preview');

  var setEffectClass = function (effectClassName) {
    var effectLevel = uploadPhotoForm.querySelector('.img-upload__effect-level');
    previewPhoto.className = '';
    previewPhoto.classList.add('img-upload__preview');
    previewPhoto.style.filter = '';

    effectLevel.style.display = '';

    switch (effectClassName) {
      case 'effect-chrome': {
        previewPhoto.classList.add('.effects__preview--chrome');
        previewPhoto.style.filter = 'grayscale(' + effectLevelInput.value + ')';
        break;
      }
      case 'effect-sepia': {
        previewPhoto.classList.add('.effects__preview--sepia');
        previewPhoto.style.filter = 'sepia(' + effectLevelInput.value + ')';
        break;
      }
      case 'effect-marvin': {
        previewPhoto.classList.add('.effects__preview--marvin');
        previewPhoto.style.filter = 'invert(' + effectLevelInput.value + '%)';
        break;
      }
      case 'effect-phobos': {
        previewPhoto.classList.add('.effects__preview--phobos');
        previewPhoto.style.filter = 'blur(' + effectLevelInput.value + 'px)';
        break;
      }
      case 'effect-heat': {
        previewPhoto.classList.add('.effects__preview--heat');
        previewPhoto.style.filter = 'brightness(' + effectLevelInput.value + ')';
        break;
      }
      default: {
        effectLevel.style.display = 'none';
      }
    }
  };

  setEffectClass(currentEffect);

  var onEffectRadioChange = function (radioEffect) {
    radioEffect.addEventListener('change', function () {
      currentEffect = radioEffect.id;
      effectLevelInput.value = getEffectValue(EFFECT_DEFAULT, currentEffect);
      setEffectClass(currentEffect);
    });
  };

  var setEventsOnEffectRadio = function () {
    for (var er = 0; er < effectRadio.length; er++) {
      if (effectRadio[er].checked) {
        currentEffect = effectRadio[er].id;
      }
      onEffectRadioChange(effectRadio[er]);
    }
  };

  setEventsOnEffectRadio();

  // scale controls
  var scalePlusButton = uploadPhotoForm.querySelector('.scale__control--bigger');
  var scaleMinusButton = uploadPhotoForm.querySelector('.scale__control--smaller');
  var scaleValueInput = uploadPhotoForm.querySelector('.scale__control--value');

  var setScaleValue = function (scaleValue) {
    scaleValueInput.value = scaleValue;
    previewPhoto.style.transform = 'scale(' + scaleValueInput.value / SCALE_MAX + ')';
  };

  var increaseImageSize = function () {
    scaleValueInput.value = parseInt(scaleValueInput.value, 10) + SCALE_INC;
    if (scaleValueInput.value > SCALE_MAX) {
      scaleValueInput.value = SCALE_MAX;
    }
    setScaleValue(scaleValueInput.value);
  };

  scalePlusButton.addEventListener('click', function () {
    increaseImageSize();
  });

  var decreaseImageSize = function () {
    scaleValueInput.value = parseInt(scaleValueInput.value, 10) - SCALE_INC;
    if (scaleValueInput.value < SCALE_MIN) {
      scaleValueInput.value = SCALE_MIN;
    }
    setScaleValue(scaleValueInput.value);
  };

  scaleMinusButton.addEventListener('click', function () {
    decreaseImageSize();
  });

  var onHashtagsCheck = function (evt) {
    var target = evt.target;

    if (target.value === '') {
      target.setCustomValidity('');
      return;
    }

    var hashtags = target.value.split(' ');

    var noHash = false;
    var invalidSymbols = false;
    var minLength = false;
    var maxLength = false;
    var noRepeat = false;
    var maxCount = false;

    var customValidityString = '';

    if (hashtags.length > HASHTAG_MAX_COUNT) {
      maxCount = true;
    }
    for (var i = 0; i < hashtags.length; i++) {
      if (hashtags[i][0] !== '#') {
        noHash = true;
      }

      if (hashtags[i].length < HASHTAG_MIN_LENGTH) {
        minLength = true;
      }

      if (hashtags[i].length > HASHTAG_MAX_LENGTH) {
        maxLength = true;
      }

      var regExpr = /(^)([#a-zA-Zа-яА-Я\d]*$)/ig;
      if (!regExpr.test(hashtags[i])) {
        invalidSymbols = true;
      }

      for (var j = i + 1; j < hashtags.length; j++) {
        if (hashtags[i].toLowerCase() === hashtags[j].toLowerCase()) {
          noRepeat = true;
        }
      }
    }

    if (maxCount) {
      customValidityString += 'Нельзя указывать более ' + HASHTAG_MAX_COUNT + ' хэштегов;   ';
    }
    if (noRepeat) {
      customValidityString += 'Хэштеги не должны повторяться;   ';
    }
    if (maxLength) {
      customValidityString += 'Максимальная длина хэштега не должна превышать ' + HASHTAG_MAX_LENGTH + ' символов;   ';
    }
    if (minLength) {
      customValidityString += 'Минимальная длина хэштега составляет ' + HASHTAG_MIN_LENGTH + ' символа;   ';
    }
    if (noHash) {
      customValidityString += 'Хэштег должен начинаться с символа "#";   ';
    }
    if (invalidSymbols) {
      customValidityString += 'В хэштеге используются недопустимые символы;   ';
    }

    target.setCustomValidity(customValidityString);
  };

  var onCommentCheck = function (evt) {
    var target = evt.target;
    if (target.value.length > COMMENT_LENGTH) {
      target.setCustomValidity('Длина комментария не должна превышать ' + COMMENT_LENGTH + ' символов');
    } else {
      target.setCustomValidity('');
    }
  };

  hashtagsInput.addEventListener('input', onHashtagsCheck);
  commentInput.addEventListener('input', onCommentCheck);
})();
