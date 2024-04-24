document.addEventListener("DOMContentLoaded", function () {
  const display = document.getElementById("result");
  let currentInput = "";
  let result = null;
  let operator = null;

  function updateDisplay(value) {
    display.value = value;
  }

  function clear() {
    currentInput = "";
    result = null;
    operator = null;
    updateDisplay("0");
  }

  function handleOperator(op) {
    if (currentInput !== "") {
      if (result === null) {
        result = parseFloat(currentInput);
      } else {
        result = operate(operator, result, parseFloat(currentInput));
      }
      operator = op;
      currentInput = "";
      updateDisplay(result);
    }
  }

  function handleNumber(num) {
    currentInput += num;
    updateDisplay(currentInput);
  }

  function operate(op, a, b) {
    switch (op) {
      case "+":
        return a + b;
      case "-":
        return a - b;
      case "*":
        return a * b;
      case "/":
        if (b === 0) {
          return "Error";
        } else {
          return a / b;
        }
      default:
        return "Error";
    }
  }

  document.querySelectorAll(".button button").forEach((btn) => {
    btn.addEventListener("click", function () {
      const btnValue = this.textContent;

      if (btnValue === "AC") {
        clear();
      } else if (btnValue === "=") {
        handleOperator(operator);
        operator = null;
      } else if (btnValue === ".") {
        if (!currentInput.includes(".")) {
          handleNumber(btnValue);
        }
      } else if (isNaN(btnValue)) {
        handleOperator(btnValue);
      } else {
        handleNumber(btnValue);
      }
    });
  });
});
