const send = document.querySelector(".form__choose-btn-send");
const successOverlay = createOverlay("Привет, <b>loftschool</b>!");

send.addEventListener("click", function() {
  document.body.appendChild(successOverlay);
});

function createOverlay(content) {
  const overlayElement = document.createElement("div");
  overlayElement.classList.add("overlay");

  const template = document.querySelector("#overlayTemplate");
  overlayElement.innerHTML = template.innerHTML;

  const closeElement = overlayElement.querySelector(".close");
  closeElement.addEventListener("click", function() {
    document.body.removeChild(overlayElement);
  });

  const contentElement = overlayElement.querySelector(".content");
  contentElement.innerHTML = content;

  return overlayElement;
}