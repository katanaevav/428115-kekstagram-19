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
var BIG_PICTURE_ID = 0;
var ESC_KEY = 'Escape';
var PHOBOS_MAX = 3;
var HEAT_MIN = 1;
var HEAT_MAX = 3;
var EFFECT_DEFAULT = 100;
var EFFECT_MAX = 100;
var SCALE_MIN = 25;
var SCALE_MAX = 100;
var SCALE_DEFAULT = 100;
var SCALE_INC = 25;

var textComments = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];
var userNames = ['Иван', 'Артём', 'Мурзик', 'Жужа', 'Евгений', 'Петр', 'Маша'];


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

var showBigPicture = function () {
  if (bigPicture.classList.contains('hidden')) {
    bigPicture.classList.remove('hidden');
  }
};

// showBigPicture();

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
  commentsList.insertAdjacentHTML('afterend', generateCommentsStructure(userPhotos[photoId].comments));
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

renderBigPicture(BIG_PICTURE_ID);

var socialCommentsCount = document.querySelector('.social__comment-count');
socialCommentsCount.classList.add('hidden');

var commentsLoader = document.querySelector('.comments-loader');
commentsLoader.classList.add('hidden');

// var pageBody = document.querySelector('body');
// pageBody.classList.add('modal-open');

// 1.2. Выбор изображения для загрузки осуществляется с помощью стандартного контрола загрузки файла #upload-file, который стилизован под букву «О» в логотипе. После выбора изображения (изменения значения поля #upload-file), показывается форма редактирования изображения. Элементу body задаётся класс modal-open.
// 1.3 Закрытие формы редактирования изображения производится либо нажатием на кнопку #upload-cancel, либо нажатием клавиши Esc. У элемента body удаляется класс modal-open.

var pageBody = document.querySelector('body');

var ulpoadPhotoForm = document.querySelector('.img-upload');
var uploadFileInput = ulpoadPhotoForm.querySelector('#upload-file');

var imgUploadOverlay = ulpoadPhotoForm.querySelector('.img-upload__overlay');
var closeUploadFormButton = ulpoadPhotoForm.querySelector('#upload-cancel');

var openUploadForm = function () {
  imgUploadOverlay.classList.remove('hidden');
  pageBody.classList.add('modal-open');
  document.addEventListener('keydown', oncloseUploadEscPress);
};

var closeUploadForm = function () {
  imgUploadOverlay.classList.add('hidden');
  pageBody.classList.remove('modal-open');
  document.removeEventListener('keydown', oncloseUploadEscPress);
  uploadFileInput.value = '';
};

var uploadPhoto = function () {
  openUploadForm();
};

uploadFileInput.addEventListener('change', function () {
  uploadPhoto();
});

closeUploadFormButton.addEventListener('click', function () {
  closeUploadForm();
});

var oncloseUploadEscPress = function (evt) {
  if (evt.key === ESC_KEY) {
    closeUploadForm();
  }
};

// .effect-level__pin mouseup

var effectLine = ulpoadPhotoForm.querySelector('.effect-level__line');
var effectLevelInput = ulpoadPhotoForm.querySelector('.effect-level__value');
var effectLevelPin = ulpoadPhotoForm.querySelector('.effect-level__pin');

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

var effectRadio = ulpoadPhotoForm.querySelectorAll('.effects__radio');
var currentEffect;

var previewPhoto = ulpoadPhotoForm.querySelector('.img-upload__preview');

var setEffectClass = function (effectClassName) {
  previewPhoto.className = '';
  previewPhoto.classList.add('img-upload__preview');
  previewPhoto.style.filter = '';

  if (effectClassName === 'effect-chrome') {
    previewPhoto.classList.add('.effects__preview--chrome');
    previewPhoto.style.filter = 'grayscale(' + effectLevelInput.value + ')';
    // previewPhoto.style.cssText = 'filter: grayscale(' + effectLevelInput.value + ')';
  } else if (effectClassName === 'effect-sepia') {
    previewPhoto.classList.add('.effects__preview--sepia');
    // previewPhoto.style.cssText = 'filter: sepia(' + effectLevelInput.value + ')';
    previewPhoto.style.filter = 'sepia(' + effectLevelInput.value + ')';
  } else if (effectClassName === 'effect-marvin') {
    previewPhoto.classList.add('.effects__preview--marvin');
    // previewPhoto.style.cssText = 'filter: invert(' + effectLevelInput.value + '%)';
    previewPhoto.style.filter = 'invert(' + effectLevelInput.value + '%)';
  } else if (effectClassName === 'effect-phobos') {
    previewPhoto.classList.add('.effects__preview--phobos');
    // previewPhoto.style.cssText = 'filter: blur(' + effectLevelInput.value + 'px)';
    previewPhoto.style.filter = 'blur(' + effectLevelInput.value + 'px)';
  } else if (effectClassName === 'effect-heat') {
    previewPhoto.classList.add('.effects__preview--heat');
    // previewPhoto.style.cssText = 'filter: brightness(' + effectLevelInput.value + ')';
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

for (var i = 0; i < effectRadio.length; i++) {
  if (effectRadio[i].checked) {
    currentEffect = effectRadio[i].id;
  }
  onEffectRadioChange(effectRadio[i]);
}

// scale controls
var scalePlusButton = ulpoadPhotoForm.querySelector('.scale__control--bigger');
var scaleMinusButton = ulpoadPhotoForm.querySelector('.scale__control--smaller');
var scaleValueInput = ulpoadPhotoForm.querySelector('.scale__control--value');

var setScaleValue = function (scaleValue) {
  scaleValueInput.value = scaleValue;
  previewPhoto.style.transform = 'scale(' + scaleValueInput.value / SCALE_MAX + ')';
};

setScaleValue(SCALE_DEFAULT);

scalePlusButton.addEventListener('click', function () {
  scaleValueInput.value = parseInt(scaleValueInput.value, 10) + SCALE_INC;
  if (scaleValueInput.value > SCALE_MAX) {
    scaleValueInput.value = SCALE_MAX;
  }
  setScaleValue(scaleValueInput.value);
});

scaleMinusButton.addEventListener('click', function () {
  scaleValueInput.value = parseInt(scaleValueInput.value, 10) - SCALE_INC;
  if (scaleValueInput.value < SCALE_MIN) {
    scaleValueInput.value = SCALE_MIN;
  }
  setScaleValue(scaleValueInput.value);
});
