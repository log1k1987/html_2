const summSections = document.querySelectorAll('.section');
const minTop = 0;
const maxTop = summSections.length - 1 + '00';
const stepSec = 100;
const itemsSec = document.querySelector('.wrapper');
let currentTop = 0;

itemsSec.style.top = currentTop;

function addOnWheel(elem, handler) {
  if (elem.addEventListener) {
    if ('onwheel' in document) {
      // IE9+, FF17+
      elem.addEventListener("wheel", handler);
    } else if ('onmousewheel' in document) {
      // устаревший вариант события
      elem.addEventListener("mousewheel", handler);
    } else {
      // 3.5 <= Firefox < 17, более старое событие DOMMouseScroll пропустим
      elem.addEventListener("MozMousePixelScroll", handler);
    }
  } else { // IE8-
    text.attachEvent("onmousewheel", handler);
  }
}

let scale = 1;

addOnWheel(window, function (e) {

  let delta = e.deltaY || e.detail || e.wheelDelta;

  // отмасштабируем при помощи CSS
  if (delta > 0) {
    if (currentTop > -maxTop) {
      currentTop -= stepSec;
      itemsSec.style.top = currentTop + '%';
    }
  } else {
    if (currentTop < minTop) {
      currentTop += stepSec;
      itemsSec.style.top = currentTop + '%';
    }
  }

  // отменим прокрутку
  e.preventDefault();
});