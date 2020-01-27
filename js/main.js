'use strict';

var TEXT_COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];
var TEXT_COMMENTS_COUNT = 5;
var USER_NAMES = ['Иван', 'Артём', 'Мурзик', 'Жужа', 'Евгений', 'Петр', 'Маша'];
var USER_NAMES_COUNT = 6;
var AVARARS_COUNT = 5;
var AVARARS_START_NUMBER = 1;
var MIN_COMMENTS_COUNT = 1;
var MAX_COMMENTS_COUNT = 10;
var MIN_LIKES_COUNT = 1;
var MAX_LIKES_COUNT = 200;
var PHOTOS_COUNT = 25;

var getRandom = function (maxValue) {
  return Math.floor(Math.random() * Math.floor(maxValue));
};

var generateComments = function (commentsCount) {
  var commentsArray = [];

  for (var i = 0; i < commentsCount; i++) {
    commentsArray[i] = {
      avatar: 'img/avatar-' + (getRandom(AVARARS_COUNT) + AVARARS_START_NUMBER) + '.svg',
      message: TEXT_COMMENTS[getRandom(TEXT_COMMENTS_COUNT)],
      name: USER_NAMES[getRandom(USER_NAMES_COUNT)]
    };
  }
  return commentsArray;
};

var generateUserPhotos = function (photosCount) {
  var photoArray = [];
  for (var i = 0; i < photosCount; i++) {
    photoArray[i] = {
      url: 'photos/' + (i + 1) + '.jpg',
      description: 'Описание к фотографии № ' + i,
      likes: getRandom(MAX_LIKES_COUNT) - MIN_LIKES_COUNT,
      comments: generateComments(getRandom(MAX_COMMENTS_COUNT) + MIN_COMMENTS_COUNT)
    };
  }
  return photoArray;
};

var userPhotos = generateUserPhotos(PHOTOS_COUNT);

var pictureListElement = document.querySelector('.pictures');

var pictureTemplate = document.querySelector('#picture')
    .content
    .querySelector('.picture');

var renderPicture = function (picture) {
  var pictureElement = pictureTemplate.cloneNode(true);

  pictureElement.querySelector('.picture__img').src = picture.url;
  pictureElement.querySelector('.picture__likes').textContent = picture.likes;
  pictureElement.querySelector('.picture__comments').textContent = picture.comments.length;

  return pictureElement;
};

var putPhotos = function (photosList) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < photosList.length; i++) {
    fragment.appendChild(renderPicture(userPhotos[i]));
  }
  pictureListElement.appendChild(fragment);
};

putPhotos(userPhotos);
