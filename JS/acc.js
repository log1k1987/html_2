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


addonacc('.section--menu', 'accordeon-y__link--active');
addonacc('.team-right', 'accordeon__link--active');
oneAct('.hamburger-menu-link__bars', '.menu-full', 'menu-full--active');
oneAct('.nav-header__right-link', '.menu-full', 'menu-full--active');