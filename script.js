//! global constrain
const copyImgBtn = document.getElementById("copy-text");
const warningMessageDiv = document.getElementById("warning-message");
const searchInput = document.getElementById("search-input");

//! fetch data from api
const loadData = (adviceId) => {
  const URL = `https://api.adviceslip.com/advice${adviceId}`;

  try {
    fetch(URL)
      .then((res) => res.json())
      .then((data) => displayData(data.slip));
  } catch (err) {
    console.log(err);
  }
  copyImgBtn.src = "./images/copy.png";
  copyImgBtn.style.cursor = "pointer";
};

//! search advice by id
document.getElementById("search-btn").addEventListener("click", () => {
  warningMessageDiv.style.visibility = "hidden";

  loadData(`/${searchInput.value}`);
  searchInput.value = "";
});

//! search advice by id with enter button click
searchInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    warningMessageDiv.style.visibility = "hidden";

    loadData(`/${searchInput.value}`);
    searchInput.value = "";
  }
});

//! display api data
const displayData = (advice) => {
  try {
    document.getElementById("advice-id").innerText = advice.id;
    document.getElementById("advice-body").innerText = `${advice.advice}`;
  } catch (err) {
    warningMessageDiv.style.visibility = "visible";
  }
};

//! warning message remove
document.getElementById("warning-remove").addEventListener("click", () => {
  warningMessageDiv.style.visibility = "hidden";
});

//! copy button functionality
copyImgBtn.addEventListener("click", () => {
  const adviceBodyText = document.getElementById("advice-body").innerText;
  navigator.clipboard.writeText(adviceBodyText);
  copyImgBtn.src = "./images/checkmark.png";
  copyImgBtn.style.cursor = "not-allowed";
});

//! refresh button functionality
document.getElementById("refresh-btn").addEventListener("click", () => {
  loadData("");
});
loadData("");

//! loading animations
window.addEventListener("load", () => {
  const loader = document.getElementById("loader-section");
  setTimeout(function () {
    loader.style.display = "none";
  }, 1000);
});
