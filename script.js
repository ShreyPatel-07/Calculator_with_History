let input = document.getElementById("inputBox");
let buttons = document.querySelectorAll("button");
let historyContainer = document.getElementById("history");
let showHideHistory = document.querySelector(".hamburger");
let showHideHistory1 = document.querySelector("h3");
let clearHistoryBtn = document.getElementById("clearHistory");

let string = "";
let arr = Array.from(buttons);
let history = JSON.parse(localStorage.getItem("history")) || [];

const updateHistoryDisplay = () => {
  historyContainer.innerHTML = "";
  if (history.length === 0) {
    let li = document.createElement("li");
    li.textContent = "There's no history yet";
    historyContainer.appendChild(li);
  } else {
    history.forEach((item) => {
      let li = document.createElement("li");
      li.textContent = item;
      historyContainer.appendChild(li);
    });
  }
};

updateHistoryDisplay();

showHideHistory.addEventListener("click", () => {
  const historyDiv = document.querySelector(".history-container");
  if (historyDiv.classList.contains("fadeOut")) {
    historyDiv.classList.remove("fadeOut");
    historyDiv.classList.add("fadeIn");
  } else {
    historyDiv.classList.remove("fadeIn");
    historyDiv.classList.add("fadeOut");
  }
});
showHideHistory1.addEventListener("click", () => {
  const historyDiv = document.querySelector(".history-container");
  if (historyDiv.classList.contains("fadeOut")) {
    historyDiv.classList.remove("fadeOut");
    historyDiv.classList.add("fadeIn");
  } else {
    historyDiv.classList.remove("fadeIn");
    historyDiv.classList.add("fadeOut");
  }
});
clearHistoryBtn.addEventListener("click", () => {
  history = [];
  localStorage.setItem("history", JSON.stringify(history));
  updateHistoryDisplay();
});

arr.forEach((button) => {
  button.addEventListener("click", (e) => {
    if (e.target.innerHTML == "=") {
      try {
        let result = eval(string);
        if (typeof result !== "undefined") {
          let historyEntry = `${string} = ${result}`;
          history.push(historyEntry);
          localStorage.setItem("history", JSON.stringify(history));
          updateHistoryDisplay();
          string = result.toString();
          input.value = string;
        } else {
          input.value = "Error";
          string = "";
        }
      } catch {
        input.value = "Error";
        string = "";
      }
    } else if (e.target.innerHTML == "C") {
      string = "";
      input.value = string;
    } else if (e.target.classList.contains("backspace")) {
      string = string.substring(0, string.length - 1);
      input.value = string;
    } else if (e.target.innerHTML == "Delete") {
      string = string;
      input.value = string;
    } else if (e.target.innerHTML == "CE") {
      while (string.length > 0) {
        let lastChar = string.charAt(string.length - 1);
        if (!["+", "-", "*", "/"].includes(lastChar)) {
          string = string.substring(0, string.length - 1);
        } else {
          break;
        }
      }
      input.value = string;
    } else {
      string += e.target.innerHTML;
      input.value = string;
    }
  });
});
