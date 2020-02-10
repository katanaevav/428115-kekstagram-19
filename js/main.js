'use strict';

var TEXT_COMMENTS_COUNT = 5;
var USER_NAMES_COUNT = 6;
var AVARARS_COUNT = 5;
var AVARARS_START_NUMBER = 1;
var MIN_COMMENTS_COUNT = 1;
var MAX_COMMENTS_COUNT = 10;
var MIN_LIKES_COUNT = 1;
var MAX_LIKES_COUNT = 200;
var PHOTOS_COUNT = 25;
var ESC_KEY = 'Escape';
var ENTER_KEY = 'Enter';
var PHOBOS_MAX = 3;
var HEAT_MIN = 1;
var HEAT_MAX = 3;
var EFFECT_DEFAULT = 100;
var EFFECT_MAX = 100;
var SCALE_MIN = 25;
var SCALE_MAX = 100;
var SCALE_DEFAULT = 100;
var SCALE_INC = 25;

var HASHTAG_MIN_LENGTH = 2;
var HASHTAG_MAX_LENGTH = 20;
var HASHTAG_MAX_COUNT = 5;
var COMMENT_LENGTH = 140;

var textComments = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];
var userNames = ['Иван', 'Артём', 'Мурзик', 'Жужа', 'Евгений', 'Петр', 'Маша'];

var pageBody = document.querySelector('body');

var getRandomValue = function (maxValue) {
  return Math.floor(Math.random() * Math.floor(maxValue));
};

var getComments = function (commentsCount) {
  var commentsArray = [];
  for (var i = 0; i < commentsCount; i++) {
    commentsArray.push({
      avatar: 'img/avatar-' + (getRandomValue(AVARARS_COUNT) + AVARARS_START_NUMBER) + '.svg',
      message: textComments[getRandomValue(TEXT_COMMENTS_COUNT)],
      name: userNames[getRandomValue(USER_NAMES_COUNT)]
    });
  }
  return commentsArray;
};

var getUserPhotos = function (count) {
  var photoArray = [];
  for (var i = 0; i < count; i++) {
    photoArray.push({
      url: 'photos/' + (i + 1) + '.jpg',
      id: i,
      description: 'Описание к фотографии № ' + (i + 1),
      likes: getRandomValue(MAX_LIKES_COUNT) - MIN_LIKES_COUNT,
      comments: getComments(getRandomValue(MAX_COMMENTS_COUNT) + MIN_COMMENTS_COUNT)
    });
  }
  return photoArray;
};

var userPhotos = getUserPhotos(PHOTOS_COUNT);

var pictureListElement = document.querySelector('.pictures');

var pictureTemplate = document.querySelector('#picture')
    .content
    .querySelector('.picture');

var createPictureElement = function (picture) {
  var pictureElement = pictureTemplate.cloneNode(true);
  pictureElement.querySelector('.picture__img').src = picture.url;
  pictureElement.querySelector('.picture__img').id = picture.id;
  pictureElement.querySelector('.picture__likes').textContent = picture.likes;
  pictureElement.querySelector('.picture__comments').textContent = picture.comments.length;
  return pictureElement;
};

var renderPhotos = function (photosList) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < photosList.length; i++) {
    fragment.appendChild(createPictureElement(userPhotos[i]));
  }
  pictureListElement.appendChild(fragment);
};

renderPhotos(userPhotos);

var bigPicture = document.querySelector('.big-picture');
var closeBigPictureButton = document.querySelector('#picture-cancel');

var showBigPicture = function () {
  if (bigPicture.classList.contains('hidden')) {
    bigPicture.classList.remove('hidden');
  }
  pageBody.classList.add('modal-open');
  document.addEventListener('keydown', oncloseBigPictureEscPress);
};

var closeBigPicture = function () {
  bigPicture.classList.add('hidden');
  if (pageBody.classList.contains('modal-open')) {
    pageBody.classList.remove('modal-open');
  }
  document.removeEventListener('keydown', oncloseBigPictureEscPress);
};

closeBigPictureButton.addEventListener('click', function () {
  closeBigPicture();
});

var oncloseBigPictureEscPress = function (evt) {
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
  commentsList.insertAdjacentHTML('beforeend', generateCommentsStructure(userPhotos[photoId].comments));
};

var renderBigPicture = function (photoId) {
  var bigPictureImage = bigPicture.querySelector('.big-picture__img').querySelector('img');
  bigPictureImage.setAttribute('src', userPhotos[photoId].url);

  var bigPictureLikes = bigPicture.querySelector('.likes-count');
  bigPictureLikes.textContent = userPhotos[photoId].likes;

  var bigPictureComments = bigPicture.querySelector('.comments-count');
  bigPictureComments.textContent = userPhotos[photoId].comments.length;

  var bigPictureDescription = bigPicture.querySelector('.social__caption');
  bigPictureDescription.textContent = userPhotos[photoId].description;

  renderComments(photoId);
};

var socialCommentsCount = document.querySelector('.social__comment-count');
socialCommentsCount.classList.add('hidden');

var commentsLoader = document.querySelector('.comments-loader');
commentsLoader.classList.add('hidden');

var onClickUserPicture = function (evt) {
  if (evt.target && evt.target.matches('img')) {
    renderBigPicture(evt.target.id);
    showBigPicture();
  }
};

var onEnterPressUserPicture = function (evt) {
  var image = evt.target.querySelector('.picture__img');
  if (image && image.matches('img')) {
    if (evt.key === ENTER_KEY) {
      renderBigPicture(image.id);
      showBigPicture();
    }
  }
};

pictureListElement.addEventListener('click', onClickUserPicture);
pictureListElement.addEventListener('keydown', onEnterPressUserPicture);

// 1.2. Выбор изображения для загрузки осуществляется с помощью стандартного контрола загрузки файла #upload-file, который стилизован под букву «О» в логотипе. После выбора изображения (изменения значения поля #upload-file), показывается форма редактирования изображения. Элементу body задаётся класс modal-open.
// 1.3 Закрытие формы редактирования изображения производится либо нажатием на кнопку #upload-cancel, либо нажатием клавиши Esc. У элемента body удаляется класс modal-open.

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
  pageBody.classList.add('modal-open');
  document.addEventListener('keydown', oncloseUploadEscPress);
};

var closeUploadForm = function () {
  imgUploadOverlay.classList.add('hidden');
  if (pageBody.classList.contains('modal-open')) {
    pageBody.classList.remove('modal-open');
  }
  document.removeEventListener('keydown', oncloseUploadEscPress);
  uploadFileInput.value = '';
};


uploadFileInput.addEventListener('change', function () {
  openUploadForm();
});

closeUploadFormButton.addEventListener('click', function () {
  closeUploadForm();
});

var oncloseUploadEscPress = function (evt) {
  if ((document.activeElement !== hashtagsInput) && (document.activeElement !== commentInput)) {
    if (evt.key === ESC_KEY) {
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

  if (effectName === 'effect-chrome') {
    effectValue = effectLevel / EFFECT_MAX;
  } else if (effectName === 'effect-sepia') {
    effectValue = effectLevel / EFFECT_MAX;
  } else if (effectName === 'effect-marvin') {
    effectValue = effectLevel;
  } else if (effectName === 'effect-phobos') {
    effectValue = effectLevel * PHOBOS_MAX / EFFECT_MAX;
  } else if (effectName === 'effect-heat') {
    effectValue = ((effectLevel < HEAT_MIN) ? 1 : effectLevel) * HEAT_MAX / EFFECT_MAX;
  } else {
    effectValue = effectLevel;
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
  previewPhoto.className = '';
  previewPhoto.classList.add('img-upload__preview');
  previewPhoto.style.filter = '';

  if (effectClassName === 'effect-chrome') {
    previewPhoto.classList.add('.effects__preview--chrome');
    previewPhoto.style.filter = 'grayscale(' + effectLevelInput.value + ')';
  } else if (effectClassName === 'effect-sepia') {
    previewPhoto.classList.add('.effects__preview--sepia');
    previewPhoto.style.filter = 'sepia(' + effectLevelInput.value + ')';
  } else if (effectClassName === 'effect-marvin') {
    previewPhoto.classList.add('.effects__preview--marvin');
    previewPhoto.style.filter = 'invert(' + effectLevelInput.value + '%)';
  } else if (effectClassName === 'effect-phobos') {
    previewPhoto.classList.add('.effects__preview--phobos');
    previewPhoto.style.filter = 'blur(' + effectLevelInput.value + 'px)';
  } else if (effectClassName === 'effect-heat') {
    previewPhoto.classList.add('.effects__preview--heat');
    previewPhoto.style.filter = 'brightness(' + effectLevelInput.value + ')';
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

setScaleValue(SCALE_DEFAULT);

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
