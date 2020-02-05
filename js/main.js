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

var ulpoadPhotoPhorm = document.querySelector('.img-upload');
var uploadFileInput = ulpoadPhotoPhorm.querySelector('#upload-file');

var imgUploadOverlay = ulpoadPhotoPhorm.querySelector('.img-upload__overlay');
var closeUploadFormButton = ulpoadPhotoPhorm.querySelector('#upload-cancel');

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
