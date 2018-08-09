function addonacc(c, ca) {
  const acc = document.querySelector(c);
  acc.addEventListener('click', function (e) {
    if(e.target.tagName === "A") {
      e.preventDefault();
      e.target.classList.toggle(ca);
    }
})
}
addonacc('.section--menu', 'accordeon-y__link--active');
addonacc('.team-right', 'accordeon__link--active');
