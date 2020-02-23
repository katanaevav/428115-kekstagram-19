'use strict';

(function () {
  var QUERY_TIMEOUT = 10000;
  var TIME_TO_HIDE_MESSAGE = 7000;
  var StatusCode = {
    OK: 200
  };
  var URL = 'https://js.dump.academy/kekstagram';

  var setup = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === StatusCode.OK) {
        onLoad(xhr.response);
      } else {
        onError('Cервер ответил: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Ошибка соединения c сервером');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = QUERY_TIMEOUT;

    return xhr;
  };

  var load = function (onLoad, onError) {
    var xhr = setup(onLoad, onError);
    xhr.open('GET', URL + '/data');
    xhr.send();
  };

  var save = function (data, onLoad, onError) {
    var xhr = setup(onLoad, onError);
    xhr.open('POST', URL);
    xhr.send(data);
  };

  var error = function errorMessage(message) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; padding: 10px; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = '10px';
    node.style.right = '10px';
    node.style.top = '10px';
    node.style.fontSize = '30px';
    node.textContent = 'Ошибка:  "' + message + '"';
    document.body.insertAdjacentElement('afterbegin', node);

    setTimeout(function () {
      node.remove();
    }, TIME_TO_HIDE_MESSAGE);
  };

  window.backend = {
    load: load,
    save: save,
    error: error
  };
})();
