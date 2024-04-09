let operator = '';
let currentInput = '';
let previousInput = '';

document.addEventListener("DOMContentLoaded", () => {
    //Store all components on the HTML to Javascript
    let clear = document.querySelector("#clear");
    let equal = document.querySelector("#equals");
    let decimal = document.querySelector("#decimal");

    let numbers = document.querySelectorAll(".button-number");
    let operators = document.querySelectorAll(".button-operator");

    let currentScreen = document.querySelector(".currentScreen");
    let previousScreen = document.querySelector(".previousScreen");

    numbers.forEach((number) => number.addEventListener("click", (e) => {
        if (!currentInput.includes(".")) {
            handleNumber(e.target.textContent); //e.target.textContent gets button text after clicking on it
            currentScreen.textContent = currentInput;
        }
    }))

    operators.forEach((op) => op.addEventListener("click", (e) => {
        if (currentInput === "" && previousInput === "") {
            currentInput = 0;
        }
        handleOperator(e.target.textContent);   //initial value switches from current value to previous value after calling operator
        previousScreen.textContent = previousInput + " " + operator;
        currentScreen.textContent = currentInput;
    }))

    clear.addEventListener("click", () => {
        currentInput = "";
        previousInput = "";
        operator = "";
        previousScreen.textContent = currentInput;
        currentScreen.textContent = currentInput;
    })

    equal.addEventListener("click", () => {
        if (currentInput != "" && previousInput != "") {
            calculate();
            previousScreen.textContent = "";
            currentScreen.textContent = previousInput;
        }
    })
})

function handleNumber(num) {
    if (currentInput.length < 5) {
        currentInput += num;
    }   
}

function handleOperator(op) {
    operator = op;
    previousInput = currentInput;
    currentInput = '';  //current value is emptied and awaits next value
}

function calculate() {
    previousInput = Number(previousInput);
    currentInput = Number(currentInput);

    if (operator === "+") {
        previousInput += currentInput;
    }
    else if (operator === "-") {
        previousInput -= currentInput;
    }
    else if (operator === "*") {
        previousInput *= currentInput;
    }
    else if (operator === "/") {
        previousInput /= currentInput;
    }

    previousInput = roundNumber(previousInput); //round number to 4 decimal places after calculating
    previousInput = previousInput.toString();
    currentInput = previousInput.toString();
}

function roundNumber(num) {
    return Math.round(num * 1000) / 1000;
}
