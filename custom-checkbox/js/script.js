const checkbox = document.querySelector("input[type=checkbox]");

checkbox.addEventListener("keydown", (e) => {
  //keyCode 32 is spacebar
  if (e.keyCode === 32) {
    e.preventDefault();
    checkbox.checked = !checkbox.checked;
  }
  //keyCode 32 is tab
  if (e.keyCode === 9) {
    checkbox.focus() ? checkbox.blur() : checkbox.focus();
  }
});
