//! global constrain
const copyImgBtn = document.getElementById("copy-text");

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
  copyImgBtn.src = "./copy.png";
  copyImgBtn.style.cursor = "pointer";
};


//! search advice by id
document.getElementById("search-btn").addEventListener("click", () => {
  const searchInput = document.getElementById("search-input");
  loadData(`/${searchInput.value}`);
  searchInput.value = "";
});


//! display api data
const displayData = (advice) => {
  document.getElementById("advice-id").innerText = advice.id;
  document.getElementById("advice-body").innerText = `${advice.advice}`;
};

//! copy button functionality
copyImgBtn.addEventListener("click", () => {
  const adviceBodyText = document.getElementById("advice-body").innerText;
  navigator.clipboard.writeText(adviceBodyText);
  copyImgBtn.src = "./checkmark.png";
  copyImgBtn.style.cursor = "not-allowed";
});

//! refresh button functionality
document.getElementById("refresh-btn").addEventListener("click", () => {
  loadData("");
});
loadData("");
