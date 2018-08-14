function addonacc(c, ca) {
  const acc = document.querySelector(c);
  acc.addEventListener('click', function (e) {
    
    let sumActive = document.getElementsByClassName(ca);
    
    if(e.target.tagName === "A") {
      e.preventDefault();
      e.stopPropagation();
    if (e.target.classList.contains(ca)) {
      e.target.classList.remove(ca);
      //
    } else {
      for (let i = 0; i < sumActive.length; i++) {
        sumActive[i].classList.remove(ca);
      }
      e.target.classList.add(ca)
      //
    }
    } else {
      for(let i of sumActive) {
        i.classList.remove(ca);
      }
    }
})
}

function oneAct(c, cy, ca) {
  let el = document.querySelector(c);
  let elAct = document.querySelector(cy);
  el.addEventListener('click', function (e) {
    e.preventDefault();
    e.stopPropagation();
   console.log(e.target);
    if(e.target.className === 'hamburger-menu-link__bars') {
      document.body.style.overflow = "hidden";
    }
    if(e.target.className === 'nav-header__right-pic') {
      document.body.style.overflow = "visible";
    }
    elAct.classList.toggle(ca);
  })
}

const left = document.querySelector(".arrow-left");
const right = document.querySelector(".arrow-right");
const items = document.querySelector(".slider__list");

right.addEventListener("click", function(e) {
  let currentWidth = parseInt(getComputedStyle(items).width);
  e.preventDefault();
  if (parseInt(getComputedStyle(items).left) > -currentWidth*4) {
    items.style.left=parseInt(getComputedStyle(items).left)-currentWidth+'px';
  }
});

left.addEventListener("click", function(e) {
  let currentWidth = parseInt(getComputedStyle(items).width);
  e.preventDefault();
  if (parseInt(getComputedStyle(items).left) !== 0) {
    items.style.left=parseInt(getComputedStyle(items).left)+currentWidth+'px';
  }
});

addonacc('.section--menu', 'accordeon-y__link--active');
addonacc('.team-right', 'accordeon__link--active');
oneAct('.hamburger-menu-link__bars', '.menu-full', 'menu-full--active');
oneAct('.nav-header__right-link', '.menu-full', 'menu-full--active');

const myForm = document.querySelector('.form');
const send = document.querySelector('.form__choose-btn-send');

// console.log(myForm.elements.name);
// console.log(myForm.elements.phone);
// console.log(myForm.elements.comment);

send.addEventListener('click', function (e) {
  e.preventDefault();

  console.log(myForm.elements.name.value);
  console.log(myForm.elements.phone.value);
  console.log(myForm.elements.comment.value);

  if(validateForm(myForm)) {
    console.log('всё ок');
  }
})

function validateForm(form) {
  let valid = true;

  if(!validateField(form.elements.name)) {
    valid = false;
  }
  if(!validateField(form.elements.phone)) {
    valid = false;
  }
  if(!validateField(form.elements.comment)) {
    valid = false;
  }

  return valid;
}

function validateField(field) {
  if(!checkValidity()) {
    field.nextElementSibling.textContent = field.validationMessage;

    return false;
  } else {
    field.nextElementSibling.textContent = '';

    return true;
  }
}