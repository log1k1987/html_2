function addonacc(c, ca, y = true) {
    const acc = document.querySelector(c);
    acc.addEventListener('click', function(e) {
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

function oneAct(c, cy, ca) {
    let el = document.querySelector(c);
    let elAct = document.querySelector(cy);
    el.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        console.log(e.target);
        if (e.target.className === 'hamburger-menu-link__bars') {
            document.body.style.overflow = 'hidden';
        }
        if (e.target.className === 'nav-header__right-pic') {
            document.body.style.overflow = 'visible';
        }
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

right.addEventListener('click', function(e) {
    e.preventDefault();
    if (currentRight < maxRight) {
        currentRight += step;
        items.style.right = currentRight + '%';
    }
});

left.addEventListener('click', function(e) {
    e.preventDefault();
    if (currentRight > minRight) {
        currentRight -= step;
        items.style.right = currentRight + '%';
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

send.addEventListener('click', function(e) {
    e.preventDefault();

    if (validateForm(myForm)) {
        const data = {
            name: myForm.elements.name.value,
            phone: myForm.elements.phone.value,
            comment: myForm.elements.phone.value,
            email: 'vasya@mail.com',
            street: myForm.elements.street.value,
            house: myForm.elements.house.value,
            corps: myForm.elements.corps.value,
            room: myForm.elements.room.value,
            floor: myForm.elements.floor.value,
        };
        // console.log(data);
        const xhr = new XMLHttpRequest();
        xhr.responseType = 'json';
        url = 'https://webdev-api.loftschool.com/sendmail/fail';
        url1 = 'https://webdev-api.loftschool.com/sendmail/';
        xhr.open('POST', url);
        xhr.send(JSON.stringify(data));
        xhr.addEventListener('load', function(e) {
            document.body.style.overflow = 'hidden';
            console.log(xhr);
            const successOverlay =
                xhr.response !== null && xhr.response.status === 0
                    ? createOverlay(xhr.response.message)
                    : createOverlay('Сообщение отправлено');

            ///////

            document.body.appendChild(successOverlay);

            function createOverlay(content) {
                const overlayElement = document.createElement('div');
                overlayElement.classList.add('overlay');

                const template = document.querySelector('#overlayTemplate');
                overlayElement.innerHTML = template.innerHTML;

                const closeElement = overlayElement.querySelector('.btn-close');
                closeElement.addEventListener('click', function(e) {
                    e.preventDefault();
                    document.body.removeChild(overlayElement);
                    document.body.style.overflow = 'visible';
                });

                const contentElement = overlayElement.querySelector('.content');
                contentElement.innerHTML = content;

                return overlayElement;
            }

            ///////
        });
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

    return valid;
}

function validateField(field) {
    if (!field.checkValidity()) {
        field.placeholder = field.validationMessage;
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

reviews.addEventListener('click', e => {
    e.preventDefault();
    let el = e.target;

    if (el.classList.contains('btn--reviews')) {
        let modalText = el.previousElementSibling.innerHTML;
        reviewsOverlayText.innerHTML = modalText;
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

let placemarks = [
        {
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
    let map = new ymaps.Map('8', {
        center: [59.94, 30.32],
        zoom: 12,
        controls: ['zoomControl'],
        behaviors: ['drag'],
    });

    for (let i = 0; i < placemarks.length; i++) {
        geoObjects[i] = new ymaps.Placemark(
            [placemarks[i].latitude, placemarks[i].longitude],
            {
                hintContent: placemarks[i].hintContent,
                balloonContent: placemarks[i].balloonContent.join(''),
            },
            {
                iconLayout: 'default#image',
                iconImageHref: 'img/map-marker.png',
                iconImageSize: [46, 57],
                iconImageOffset: [-23, -57],
            }
        );
    }

    let clusterer = new ymaps.Clusterer({
        clusterIcons: [
            {
                href: 'img/map-marker.png',
                size: [100, 100],
                offset: [-50, -50],
            },
        ],
        clusterIconContentLayout: null,
    });

    map.geoObjects.add(clusterer);
    // map.geoObjects.add(placemark);
    clusterer.add(geoObjects);
}
