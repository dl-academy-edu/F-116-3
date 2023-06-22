const books = document.querySelector(".books");
const buttonBack = document.querySelector(".button_back");
const buttonNext = document.querySelector(".button_next");
let activeStr;

const strArray = [
  "LocalStorage и SessionStorage являются веб-хранилищами для локального хранения данных внутри браузера пользователя, в них вы можете хранить информацию в формате ключ-значение. Ключ и значение – это всегда строки.",
  "Отличие между этими хранилищами сводится только к периоду времени, в течение которого они могут хранить данные, помещенные в них.",
  "LocalStorage - привязана к источнику (домену, протоколу и порту), а SessionStorage ограничена только одной вкладкой браузера."
];

const updateStrCount = () => {
  +localStorage.getItem("activeStr")
    ? (activeStr = +localStorage.getItem("activeStr"))
    : (activeStr = 1);
};

const createStr = () => {
  const div = document.createElement("div");
  div.classList.add("str");
  div.innerText = activeStr ? strArray[activeStr - 1] : strArray[0];
  books.prepend(div);
};

const createStrNumber = () => {
  const div = document.createElement("strong");
  div.classList.add("number-str");
  div.innerText = activeStr
    ? `${activeStr} из ${strArray.length}`
    : `1 из ${strArray.length}`;
  books.append(div);
};

const strChange = (type) => {
  switch (type) {
    case "next":
      if (activeStr < strArray.length) {
        localStorage.setItem("activeStr", activeStr + 1);
        updateStrCount();
        buttonBack.removeAttribute("disabled");
      }
      if (activeStr === strArray.length) {
        buttonNext.setAttribute("disabled", "disabled");
      }
      break;
    case "back":
      if (activeStr !== 1) {
        localStorage.setItem("activeStr", activeStr - 1);
        updateStrCount();
        buttonNext.removeAttribute("disabled");
      }
      if (activeStr === 1) {
        buttonBack.setAttribute("disabled", "disabled");
      }
      break;
  }
  document.querySelector(".str").remove();
  createStr();
  document.querySelector(".number-str").remove();
  createStrNumber();
};

updateStrCount();
createStr();
createStrNumber();

if (activeStr === 1) buttonBack.setAttribute("disabled", "disabled");

if (activeStr === strArray.length) {
  buttonNext.setAttribute("disabled", "disabled")
};

buttonBack.addEventListener("click", () => strChange("back"));
buttonNext.addEventListener("click", () => strChange("next"));
