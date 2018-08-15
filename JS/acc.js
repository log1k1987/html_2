function addonacc(c, ca, y=true) {
  const acc = document.querySelector(c);
  acc.addEventListener('click', function (e) {
    
    let sumActive = document.getElementsByClassName(ca);
    
    if(e.target.tagName === "A") {
      if(y) {
         e.preventDefault();
         e.stopPropagation();
      }
      
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

addonacc('.nav__list', 'nav__link--active', false);
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

  if(validateForm(myForm)) {
    const data = {
      name : myForm.elements.name.value,
      phone : myForm.elements.phone.value,
      comment : myForm.elements.phone.value,
      email : 'vasya@mail.com',
      street : myForm.elements.street.value,
      house : myForm.elements.house.value,
      corps : myForm.elements.sorps.value,
      room : myForm.elements.room.value,
      floor : myForm.elements.floor.value
    };
   // console.log(data);
    const xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    url =  "https://webdev-api.loftschool.com/sendmail/fail";
    url1 = "https://webdev-api.loftschool.com/sendmail/";
    xhr.open('POST', url);
    
    xhr.send(JSON.stringify(data));
    xhr.addEventListener('load', function (e) {
      console.log(xhr);
      const successOverlay = (xhr.response !== null && xhr.response.status === 0) ? createOverlay(xhr.response.message) : createOverlay("Сообщение отправлено");

      ///////

        document.body.appendChild(successOverlay);
      
      
      function createOverlay(content) {
        const overlayElement = document.createElement("div");
        overlayElement.classList.add("overlay");
      
        const template = document.querySelector("#overlayTemplate");
        overlayElement.innerHTML = template.innerHTML;
      
        const closeElement = overlayElement.querySelector(".btn-close");
        closeElement.addEventListener("click", function(e) {
          e.preventDefault();
          document.body.removeChild(overlayElement);
        });
      
        const contentElement = overlayElement.querySelector(".content");
        contentElement.innerHTML = content;
      
        return overlayElement;
      }

      ///////



    })
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
  if(!field.checkValidity()) {
    field.placeholder = field.validationMessage;
    field.style.backgroundColor = 'red';
    return false;
  } else {
    field.placeholder = '';
    field.style.backgroundColor = '#fff';
    return true;
  }
}