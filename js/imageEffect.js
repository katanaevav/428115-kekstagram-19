'use strict';

(function () {
  var EFFECT_DEFAULT = 100;
  var EFFECT_MAX = 100;
  var EFFECT_NAME_DEFAULT = 'effect-none';

  var effects = {
    'effect-chrome': {
      name: 'chrome',
      attribute: 'grayscale',
      minValue: '0',
      maxValue: '1',
      unit: ''
    },
    'effect-sepia': {
      name: 'sepia',
      attribute: 'sepia',
      minValue: '0',
      maxValue: '1',
      unit: ''
    },
    'effect-marvin': {
      name: 'marvin',
      attribute: 'invert',
      minValue: '0',
      maxValue: '100',
      unit: '%'
    },
    'effect-phobos': {
      name: 'phobos',
      attribute: 'blur',
      minValue: '0',
      maxValue: '3',
      unit: 'px'
    },
    'effect-heat': {
      name: 'heat',
      attribute: 'brightness',
      minValue: '1',
      maxValue: '3',
      unit: ''
    }
  };

  var uploadPhotoForm = document.querySelector('.img-upload');
  var effectLine = uploadPhotoForm.querySelector('.effect-level__line');
  var effectLevelInput = uploadPhotoForm.querySelector('.effect-level__value');
  var effectLevelPin = uploadPhotoForm.querySelector('.effect-level__pin');
  var effectLevelDepth = uploadPhotoForm.querySelector('.effect-level__depth');
  var effectRadio = uploadPhotoForm.querySelectorAll('.effects__radio');
  var previewPhoto = uploadPhotoForm.querySelector('.img-upload__preview');
  var currentEffect;

  var getEffectLevel = function () {
    var lineX = Math.round(effectLine.getBoundingClientRect().x);
    var lineWidth = effectLine.getBoundingClientRect().width;
    var pinX = Math.round(effectLevelPin.getBoundingClientRect().x);
    var pinWidth = effectLevelPin.getBoundingClientRect().width;

    return Math.round((100 * (pinX + (pinWidth / 2) - lineX) / (lineWidth)));
  };

  var getEffectValue = function (effectLevel, effectName) {
    var effectValue = 1;
    var effect = effects[effectName];

    switch (effectName) {
      case 'effect-chrome':
      case 'effect-sepia': {
        effectValue = effectLevel / EFFECT_MAX;
        break;
      }
      case 'effect-phobos': {
        effectValue = effectLevel * effect.maxValue / EFFECT_MAX;
        break;
      }
      case 'effect-heat': {
        effectValue = ((effectLevel < effect.minValue) ? 1 : effectLevel) * effect.maxValue / EFFECT_MAX;
        break;
      }
      default: {
        effectValue = effectLevel;
      }
    }

    return effectValue;
  };

  var setDefaultEffectPinPosition = function () {
    effectLevelPin.style.left = effectLine.getBoundingClientRect().width + 'px';
    effectLevelDepth.style.width = effectLine.getBoundingClientRect().width + 'px';
    effectLevelInput.value = getEffectValue(getEffectLevel(), currentEffect);
  };

  effectLevelPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var dragged = false;

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      dragged = true;
      var minEffectPinPosition = effectLine.getBoundingClientRect().x;
      var maxEffectPinPosition = effectLine.getBoundingClientRect().x + effectLine.getBoundingClientRect().width;
      var posX = moveEvt.clientX - Math.round(effectLine.getBoundingClientRect().x);

      if ((posX + effectLine.getBoundingClientRect().x) < minEffectPinPosition) {
        posX = 0;
      } else if ((posX + effectLine.getBoundingClientRect().x) > maxEffectPinPosition) {
        posX = effectLine.getBoundingClientRect().width;
      }

      effectLevelPin.style.left = (posX) + 'px';
      effectLevelDepth.style.width = (posX) + 'px';

      effectLevelInput.value = getEffectValue(getEffectLevel(), currentEffect);
      setEffectClass(currentEffect);
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      if (dragged) {
        var onClickPreventDefault = function (clickEvt) {
          clickEvt.preventDefault();
          effectLevelPin.removeEventListener('click', onClickPreventDefault);
        };
        effectLevelPin.addEventListener('click', onClickPreventDefault);
      }
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  var setEffectClass = function (effectClassName) {
    var effectLevel = uploadPhotoForm.querySelector('.img-upload__effect-level');
    previewPhoto.className = '';
    previewPhoto.classList.add('img-upload__preview');
    previewPhoto.style.filter = '';

    effectLevel.style.display = '';
    if (effectClassName === 'effect-none') {
      effectLevel.style.display = 'none';
    }

    var effect = effects[effectClassName];
    if (effect) {
      previewPhoto.classList.add('.effects__preview--' + effect.name);
      previewPhoto.style.filter = effect.attribute + '(' + effectLevelInput.value + effect.unit + ')';
    }
  };

  setEffectClass(currentEffect);

  var onEffectRadioChange = function (radioEffect) {
    radioEffect.addEventListener('change', function () {
      currentEffect = radioEffect.id;
      effectLevelInput.value = getEffectValue(EFFECT_DEFAULT, currentEffect);

      setEffectClass(currentEffect);
      setDefaultEffectPinPosition();
    });
  };

  var setEventsOnEffectRadio = function () {
    effectRadio.forEach(function (item) {
      if (item.checked) {
        currentEffect = item.id;
      }
      onEffectRadioChange(item);
    });
  };

  setEventsOnEffectRadio();

  var setDefaultEffectClass = function () {
    setEffectClass(EFFECT_NAME_DEFAULT);
  };

  window.imageEffect = {
    setDefaultEffect: setDefaultEffectClass
  };
})();
