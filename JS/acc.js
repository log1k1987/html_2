const dimenu = document.querySelector('.menu-full');
//if (document.querySelector('.menu-full--active'))

dimenu.addEventListener('click', function (e) {
    if (e.target.classList.contains('menu-full__link')) {
        dimenu.classList.toggle('menu-full--active');
    }
});

function addonacc(c, ca, y) {
    const acc = document.querySelector(c);
    acc.addEventListener('click', function (e) {
        let sumActive = document.getElementsByClassName(ca);



        if (e.target.tagName === 'A') {

            if (y) {
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
                e.target.classList.add(ca);
                //
            }
        } else {
            for (let i of sumActive) {
                i.classList.remove(ca);
            }
        }
    });
}
const stopScroll = document.querySelector('.maincontent');

function oneAct(c, cy, ca) {
    let el = document.querySelector(c);
    let elAct = document.querySelector(cy);
    el.addEventListener('click', function (e) {
        e.preventDefault();
        elAct.classList.toggle(ca);
    });
}

const left = document.querySelector('.arrow-left__link');
const right = document.querySelector('.arrow-right__link');
const items = document.querySelector('.slider__list');
const summSliders = document.querySelectorAll('.slider__item');

const minRight = 0;
const maxRight = summSliders.length - 1 + '00';
const step = 100;
let currentRight = 0;

items.style.right = currentRight;

right.addEventListener('click', function (e) {
    e.preventDefault();
    if (currentRight < maxRight) {
        currentRight += step;
        items.style.right = currentRight + '%';
    }
});

left.addEventListener('click', function (e) {
    e.preventDefault();
    if (currentRight > minRight) {
        currentRight -= step;
        items.style.right = currentRight + '%';
    }
});

addonacc('.nav__list', 'nav__link--active', false);
addonacc('.section--menu', 'accordeon-y__link--active', true);
addonacc('.team-right', 'accordeon__link--active', true);
oneAct('.hamburger-menu-link__bars', '.menu-full', 'menu-full--active');
oneAct('.nav-header__right-link', '.menu-full', 'menu-full--active');

const orderForm = document.querySelector('.form');
const send = document.querySelector('.form__choose-btn-send');

/////////////////////////////////////
send.addEventListener('click', function (e) {
    e.preventDefault();

    function createOverlay(content) {
        const overlayElement = document.createElement('div');
        overlayElement.classList.add('overlay');

        const template = document.querySelector('#overlayTemplate');
        overlayElement.innerHTML = template.innerHTML;

        const closeElement = overlayElement.querySelector('.btn-close');
        closeElement.addEventListener('click', function (e) {
            e.preventDefault();
            document.body.removeChild(overlayElement);
            //  document.body.style.overflow = 'visible';
        });

        const contentElement = overlayElement.querySelector('.content');
        contentElement.innerHTML = content;

        return overlayElement;
    }

    if (validateForm(orderForm)) {
        const data = {
            name: orderForm.elements.name.value,
            phone: orderForm.elements.phone.value,
            comment: orderForm.elements.phone.value,
            email: 'vasya@mail.com',
            street: orderForm.elements.street.value,
            house: orderForm.elements.house.value,
            corps: orderForm.elements.corps.value,
            room: orderForm.elements.room.value,
            floor: orderForm.elements.floor.value,
        };
        // console.log(data);
        const xhr = new XMLHttpRequest();
        xhr.responseType = 'json';
        url = 'https://webdev-api.loftschool.com/sendmail/fail';
        url1 = 'https://webdev-api.loftschool.com/sendmail/';
        xhr.open('POST', url);
        xhr.send(JSON.stringify(data));
        xhr.addEventListener('load', function (e) {
            // document.body.style.overflow = 'hidden';
            // console.log(xhr);
            const successOverlay =
                xhr.response !== null && xhr.response.status === 0 ?
                createOverlay(xhr.response.message) :
                createOverlay('Сообщение отправлено');

            ///////

            document.body.appendChild(successOverlay);

            ///////
        });
    } else {
        document.body.appendChild(createOverlay('Заполните поля выделенные красным'));

    }
});

function validateForm(form) {
    let valid = true;

    if (!validateField(form.elements.name)) {
        valid = false;
    }
    if (!validateField(form.elements.phone)) {
        valid = false;
    }
    if (!validateField(form.elements.comment)) {
        valid = false;
    }
    if (!validateField(form.elements.street)) {
        valid = false;
    }
    if (!validateField(form.elements.house)) {
        valid = false;
    }
    return valid;
}



function validateField(field) {
    if (!field.checkValidity()) {
        //field.placeholder = field.validationMessage;

        field.style.backgroundColor = 'red';
        return false;
    } else {
        field.placeholder = '';
        field.style.backgroundColor = '#fff';
        return true;
    }
}

const reviews = document.querySelector('.section--reviews');
const reviewsOverlay = document.querySelector('.reviews-overlay');
const reviewsOverlayText = document.querySelector('.reviews-overlay__text');
const reviewsOverlayTitle = document.querySelector('.reviews-overlay__title');

reviews.addEventListener('click', e => {
    e.preventDefault();
    let el = e.target;

    if (el.classList.contains('btn--reviews')) {
        let modalText = el.previousElementSibling.innerHTML;
        let modalTitle = el.previousElementSibling.previousElementSibling.innerHTML;
        reviewsOverlayText.innerHTML = modalText;
        reviewsOverlayTitle.innerHTML = modalTitle;
        reviewsOverlay.style.display = 'block';
    }
    if (el.classList.contains('reviews-overlay__btn-close')) {
        reviewsOverlay.style.display = 'none';
    }
});

reviews.addEventListener('keyup', e => {
    if (e.keyCode === 27) {
        reviewsOverlay.style.display = 'none';
    }
});

//yandex maps
ymaps.ready(init);

let placemarks = [{
            latitude: 59.97,
            longitude: 30.31,
            hintContent: '<div class="map__hint">Ул. Литераторов, д. 19</div>',
            balloonContent: [
                '<div class="map__balloon">',
                '<img class="map__burger-img" src="img/section--header/big-burger.png" alt="Бургер"/>',
                'Самые вкусные бургеры у нас! Заходите по адресу: Ул. Литераторов, д. 19',
                '</div>',
            ],
        },
        {
            latitude: 59.93,
            longitude: 30.34,
            hintContent: '<div class="map__hint">Малый проспект В Щ. д. 64</div>',
            balloonContent: [
                '<div class="map__balloon">',
                '<img class="map__burger-img" src="img/section--header/big-burger.png" alt="Бургер"/>',
                'Самые вкусные бургеры у нас! Заходите по адресу: Малый проспект В Щ. д. 64',
                '</div>',
            ],
        },
        {
            latitude: 59.94,
            longitude: 30.32,
            hintContent: '<div class="map__hint">Набережная реки фонтанкиб д. 56</div>',
            balloonContent: [
                '<div class="map__balloon">',
                '<img class="map__burger-img" src="img/section--header/big-burger.png" alt="Бургер"/>',
                'Самые вкусные бургеры у нас! Заходите по адресу: Набережная реки фонтанкиб д. 56',
                '</div>',
            ],
        },
    ],
    geoObjects = [];

function init() {
    let map = new ymaps.Map('map', {
        center: [59.94, 30.32],
        zoom: 12,
        controls: ['zoomControl'],
        behaviors: ['drag'],
    });

    for (let i = 0; i < placemarks.length; i++) {
        geoObjects[i] = new ymaps.Placemark(
            [placemarks[i].latitude, placemarks[i].longitude], {
                hintContent: placemarks[i].hintContent,
                balloonContent: placemarks[i].balloonContent.join(''),
            }, {
                iconLayout: 'default#image',
                iconImageHref: 'img/map-marker.png',
                iconImageSize: [46, 57],
                iconImageOffset: [-23, -57],
            }
        );
    }

    let clusterer = new ymaps.Clusterer({
        clusterIcons: [{
            href: 'img/bg.png',
            size: [100, 100],
            offset: [-50, -50],
        }, ],
        clusterIconContentLayout: null,
    });

    map.geoObjects.add(clusterer);
    // map.geoObjects.add(placemark);
    clusterer.add(geoObjects);
}


// console.log(orderForm.elements.phone);  //////////////////////////
const filterPhone = orderForm.elements.phone;

filterPhone.addEventListener('keydown', (e) => {
    let isDigit = false;
    let isControl = false;

    if (event.key >= 0 || event.key <= 9) {
        isDigit = true;
    }
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight' || event.key === 'Backspace') {
        isControl = true;
    }
    if (!isDigit && !isControl) {
        e.preventDefault();
    }
})