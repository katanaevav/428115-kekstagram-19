'use strict';

(function () {
  var FILE_TYPES = ['jpg', 'jfif', 'pipeg', 'jpeg', 'pjp', 'png'];
  var DEFAULT_PHOTO = 'img/upload-default-image.jpg';
  var fileSelect = document.querySelector('.img-upload__input');
  var bigPreview = document.querySelector('.img-upload__preview img');
  var loadedPicture = '';

  var loadPreviewImages = function (image) {
    var effectsPreview = document.querySelectorAll('.effects__item .effects__preview');
    effectsPreview.forEach(function (item) {
      if (image) {
        item.style.backgroundImage = 'url(' + image + ')';
      } else {
        item.style = '';
      }
    });
  };

  fileSelect.addEventListener('change', function () {
    var file = fileSelect.files[0];

    var fileName = file.name.toLowerCase();
    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();
      reader.addEventListener('load', function (evt) {
        loadedPicture = evt.target.result;
        bigPreview.src = loadedPicture;
        loadPreviewImages(loadedPicture);
      });
      reader.readAsDataURL(file);
    } else {
      bigPreview.src = DEFAULT_PHOTO;
      loadPreviewImages();
    }
  });

})();
