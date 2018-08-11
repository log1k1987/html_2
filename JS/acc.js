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
addonacc('.section--menu', 'accordeon-y__link--active');
addonacc('.team-right', 'accordeon__link--active');