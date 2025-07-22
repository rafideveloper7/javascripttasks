
let popupBox = document.querySelector(".popup-box");

function showPopUp() {
  popupBox.classList.add("showPopup");
  // close after 5 seconds
  setTimeout(() => {
    popupBox.classList.remove("showPopup");
  }, 5000);
}

function closePopUp() {
  popupBox.classList.remove("showPopup");
}