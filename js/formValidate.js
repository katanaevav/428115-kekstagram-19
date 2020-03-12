'use strict';

(function () {
  var HASHTAG_MIN_LENGTH = 2;
  var HASHTAG_MAX_LENGTH = 20;
  var HASHTAG_MAX_COUNT = 5;
  var COMMENT_LENGTH = 140;

  var uploadPhotoForm = document.querySelector('.img-upload');
  var hashtagsInput = uploadPhotoForm.querySelector('.text__hashtags');
  var commentInput = uploadPhotoForm.querySelector('.text__description');

  var validateHashtags = function (textInput) {
    if (textInput.value === '') {
      textInput.setCustomValidity('');
      return;
    }

    var hashtags = textInput.value.split(' ');

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

    hashtags.forEach(function (item) {
      if (item[0] !== '#') {
        noHash = true;
      }

      if (item.length < HASHTAG_MIN_LENGTH) {
        minLength = true;
      }

      if (item.length > HASHTAG_MAX_LENGTH) {
        maxLength = true;
      }

      var regExpr = /(^)([#a-zA-Zа-яА-Я\d]*$)/ig;
      if (!regExpr.test(item)) {
        invalidSymbols = true;
      }

      var repeatingHashtags = hashtags.filter(function (hashtag) {
        return hashtag.toLowerCase() === item.toLowerCase();
      });

      if (repeatingHashtags.length > 1) {
        noRepeat = true;
      }
    });

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

    textInput.setCustomValidity(customValidityString);
  };

  var onCommentCheck = function (evt) {
    var target = evt.target;
    if (target.value.length > COMMENT_LENGTH) {
      target.setCustomValidity('Длина комментария не должна превышать ' + COMMENT_LENGTH + ' символов');
    } else {
      target.setCustomValidity('');
    }
  };

  hashtagsInput.oninput = function () {
    validateHashtags(this);
  };

  commentInput.addEventListener('input', onCommentCheck);
})();
