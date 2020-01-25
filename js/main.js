'use strict';

var userPhotos = [];

var getRandom = function (fromValue, toValue) {
  return Math.floor(fromValue + Math.random() * (toValue + 1 - fromValue));
};

var generateUserPhotos = function () {
  var TEXT_COMMENTS = [
    'Всё отлично!',
    'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
  ];
  var USER_NAMES = ['Иван', 'Артём', 'Мурзик', 'Жужа', 'Евгений', 'Петр', 'Маша'];

  for (var i = 0; i < 25; i++) {

    var commentsArray = [];

    for (var j = 0; j < getRandom(1, 30); j++) {
      commentsArray[j] = {
        avatar: 'img/avatar-' + getRandom(1, 6) + '.svg',
        message: TEXT_COMMENTS[getRandom(0, 5)],
        name: USER_NAMES[getRandom(0, 6)]
      };
    }

    userPhotos[i] = {
      url: 'photos/' + (i + 1) + '.jpg',
      description: 'Описание к фотографии № ' + i,
      likes: getRandom(15, 200),
      comments: commentsArray
    };
  }
};

generateUserPhotos();

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

var fragment = document.createDocumentFragment();

for (var i = 0; i < userPhotos.length; i++) {
  fragment.appendChild(renderPicture(userPhotos[i]));
}

pictureListElement.appendChild(fragment);
