'use strict';

window.data = (function () {
  var TEXT_COMMENTS_COUNT = 5;
  var USER_NAMES_COUNT = 6;
  var AVARARS_COUNT = 5;
  var AVARARS_START_NUMBER = 1;
  var MIN_COMMENTS_COUNT = 1;
  var MAX_COMMENTS_COUNT = 10;
  var MIN_LIKES_COUNT = 1;
  var MAX_LIKES_COUNT = 200;
  var PHOTOS_COUNT = 25;

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

  return {
    getUserPhotos: function () {
      var photoArray = [];
      for (var i = 0; i < PHOTOS_COUNT; i++) {
        photoArray.push({
          url: 'photos/' + (i + 1) + '.jpg',
          id: i,
          description: 'Описание к фотографии № ' + (i + 1),
          likes: getRandomValue(MAX_LIKES_COUNT) - MIN_LIKES_COUNT,
          comments: getComments(getRandomValue(MAX_COMMENTS_COUNT) + MIN_COMMENTS_COUNT)
        });
      }
      return photoArray;
    }
  };
})();
