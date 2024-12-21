import "./styles.css";
import { compareAsc } from "date-fns";
import rocketImage from "./images/rocket.jpg";
import canyonImage from "./images/canyon.jpg";
//import { function name } from "./jsFile";
//import odinImage from "./odin.png";

if (process.env.NODE_ENV !== "production") {
  console.log("Looks like we are in development mode!");
}

const toggle = document.getElementById("myToggle");
const body = document.querySelector("body");
const form = document.getElementById("practiceForm");
const title = document.getElementById("inputTitle");
const email = document.getElementById("inputEmail");
const date = document.getElementById("inputDate");
const submitBtn = document.getElementById("submitBtn");
const cancelBtn = document.getElementById("cancelBtn");
const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

toggle.addEventListener("change", () => {
  if (toggle.checked) {
    body.style.backgroundImage = `url(${rocketImage})`;
    return 1;
  }
  body.style.backgroundImage = `url(${canyonImage})`;
  return 1;
});

title.addEventListener("keyup", () => {
  if (title.validity.valueMissing) {
    title.setCustomValidity("This field must be completed");
  } else {
    title.setCustomValidity("");
  }
  title.reportValidity();
});

date.addEventListener("focusout", () => {
  let currentDate = new Date().toString();
  let inputDate = new Date(date.value).toString();

  console.log(compareAsc(inputDate, currentDate));

  if (inputDate == "Invalid Date") {
    date.setCustomValidity("This field must be completed");
  } else if (compareAsc(inputDate, currentDate) === -1) {
    date.setCustomValidity("You must provide a future date");
  } else {
    date.setCustomValidity("");
  }
  date.reportValidity();
});

email.addEventListener("keyup", () => {
  if (email.validity.valueMissing) {
    email.setCustomValidity("This field must be completed");
  } else if (!emailRegex.test(email.value)) {
    email.setCustomValidity(
      "Invalid email address. Format must be in 'name@x.xx'",
    );
  } else {
    email.setCustomValidity("");
  }
  email.reportValidity();
});

submitBtn.addEventListener("click", () => {
  title.reportValidity();
  date.reportValidity();
  email.reportValidity();
  if (title.validity.valid && date.validity.valid && email.validity.valid) {
    form.submit();
  }
});

cancelBtn.addEventListener("click", () => {
  form.reset();
});
