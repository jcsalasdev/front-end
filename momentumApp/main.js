const currentDate = document.querySelector(".greetings_date");
const greeting = document.querySelector(".greetings_text");
const user = document.querySelector(".greetings_name");
const currentTime = document.querySelector(".time");
const addToDo = document.querySelector(".todo_add");
const list = document.querySelector(".todo_list");
const dQ = document.querySelector(".quotation_text");
const dA = document.querySelector(".quotation_author");

//edit-save Name/qoutes/author
user.textContent = localStorage.getItem("name") || "Boss";
events(user, "name");

function addEdit(edit) {
  return function (e) {
    const content = e.target.textContent;
    localStorage.setItem(edit, content);
  };
}

function events(element, entryName, entryQoutation, entryAuthor) {
  element.addEventListener("blur", addEdit(entryQoutation));
  element.addEventListener("blur", addEdit(entryAuthor));
  element.addEventListener("blur", addEdit(entryName));
  element.addEventListener("keydown", (e) => {
    if (e.keyCode === 13) {
      element.blur();
      element.dataset.custom = "true";
      user.style.color = "white";
      dQ.style.color = "white";
      dA.style.color = "white";
    }
  });
}

user.addEventListener("click", function () {
  user.style.color = "lightgreen";
});

//background-changer

function change_background(num) {
  if (num >= 3 && num <= 12) {
    document.body.className = "day";
  }
  if (num > 12 && num <= 17) {
    document.body.className = "afternoon";
  } else {
    document.body.className = "night";
  }
}

//Date&Greetings
const dayNames = {
  0: "Sunday",
  1: "Monday",
  2: "Tuesday",
  3: "Wednesday",
  4: "Thursday",
  5: "Friday",
  6: "Saturday",
};

const monthNames = {
  0: "January",
  1: "February",
  2: "March",
  3: "April",
  4: "May",
  5: "June",
  6: "July",
  7: "August",
  8: "September",
  9: "October",
  10: "November",
  11: "December",
};

function zero(num) {
  return num.toString().length <= 1 ? "0" + num : num;
}

function displayGreeting(num) {
  if (num === 0 && num <= 2) return "Silent midnight";
  if (num >= 3 && num <= 12) return "Good morning";
  if (num >= 13 && num < 17) return "Good afternoon";
  if (num >= 17 && num < 20) return "Good evening";
  if (num >= 20) return "Good night";
}

//Local Time and Date
function displayTimeAndDate() {
  const date = new Date();
  const month = monthNames[date.getMonth()];
  const dayNum = date.getDate();
  const day = dayNames[date.getDay()];
  const year = date.getFullYear();

  const minutes = date.getMinutes();
  const hours = date.getHours();
  const livehours = hours % 12 || 12;
  const ampm = hours < 12 || hours === 24 ? "AM" : "PM";
  greeting.textContent = displayGreeting(hours);

  currentTime.textContent = `${zero(livehours)} : ${zero(minutes)} ${ampm}`;
  currentDate.textContent = `${day}, ${month} ${dayNum}, ${year}`;
  requestAnimationFrame(displayTimeAndDate);
  change_background(hours);
}
requestAnimationFrame(displayTimeAndDate);

//qoutation generator
const qoutes = [
  {
    quote:
      "I can not change the direction of the wind, but I can adjust my sails to always reach my destination.",
    author: "–Jimmy Dean–",
  },
  {
    quote: "Keep your face to the sunshine and you cannot see a shadow.",
    author: "—Helen Keller—",
  },
  {
    quote: "The only time you fail is when you fall down and stay down",
    author: "—Stephen Richards—",
  },
  {
    quote:
      "Every day may not be good... but there’s something good in everyday.",
    author: "—Alice Morse Earle—",
  },
  {
    quote:
      "If you want light to come into your life, you need to stand where itis shining.",
    author: "—Guy Finley—",
  },
];

const randomQoutes = Math.floor(Math.random() * qoutes.length);

dQ.textContent =
  localStorage.getItem("qoutation") || qoutes[randomQoutes].quote;
events(dQ, "qoutation");
dA.textContent = localStorage.getItem("author") || qoutes[randomQoutes].author;
events(dA, "author");

[dQ, dA].forEach((item) => {
  item.addEventListener("click", function () {
    dQ.style.color = "lightgreen";
    dA.style.color = "lightgreen";
  });
});
