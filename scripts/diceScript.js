
const formula = document.querySelector("#formula");
const individualRolls = document.querySelector("#individualRolls");
const results = document.querySelector("#results");

let rolls = [];
const pemdas = { 'D': 0, '•': 1, '+': 2, '-': 2 }

// BUTTONS
// Numbers & Operators
const buttons = document.querySelectorAll(".largeButton, .smallButton:not(.delete)")
buttons.forEach(btn => {
    btn.addEventListener("click", addToFormula);
    btn.addEventListener("click", () => {
        individualRolls.textContent = "";
        results.textContent = "";
    });
}
);

// Delete
const deleteButton = document.querySelector(".delete")
deleteButton.addEventListener("click", deleteFromFormula);
deleteButton.addEventListener("click", () => {
    individualRolls.textContent = "";
    results.textContent = "";
});

// Calculate
const equalsButton = document.querySelector(".equalsButton")
equalsButton.addEventListener("click", () => {
    individualRolls.textContent = "";
});
equalsButton.addEventListener("click", calculateFormula);



// Adds Pressed Button to Formiula
function addToFormula() {
    formula.textContent += this.textContent == 'X' ? '•' : this.textContent;
}

// Removes Last Character from Formula
function deleteFromFormula() {
    formula.textContent = formula.textContent.slice(0, formula.textContent.length - 1);
}

// Evaluates Formula
function calculateFormula() {
    if (formula.textContent == "") {
        return;
    }
    const solution = calculate();

    // Invalid Formula Protection
    if (solution != "NaN") {
        results.textContent = solution;
    }

    // Individual Rolls
    if (rolls != []) {
        individualRolls.textContent = rolls.join(', ');
    }
}

// END OF BUTTONS

// Infix to Prefix, then evaluate
// modified from https://www.geeksforgeeks.org/expression-evaluation/
function calculate() {
    const infix = formula.textContent;
    let tokens = infix.split('');

    let nums = [];
    let ops = [];
    rolls = [];

    for (let i = 0; i < tokens.length; i++) {
        // Token is a Number
        if (isNumber(tokens[i])) {
            let subNum = "";

            while (i < tokens.length && isNumber(tokens[i])) {
                subNum += tokens[i++];
            }

            nums.push(parseInt(subNum));

            i--; // corrects while loop changes
        }
        // Token is an Operator
        else if (['+', '-', '•', 'D'].includes(tokens[i])) {
            while (ops.length > 0 && hasPrecedence(tokens[i], ops[ops.length - 1])) { // if new op has >= precedence to top op in ops, perform operation
                nums.push(performOp(ops.pop(), nums.pop(), nums.pop()));
            }

            // Add new op to ops
            ops.push(tokens[i]);
        }
    }

    // Do Remaining Ops
    while (ops.length > 0) {
        nums.push(performOp(ops.pop(), nums.pop(), nums.pop()));
    }

    return String(nums.pop());
}

function isNumber(char) {
    return /^\d+$/.test(char); // regex check if character is a digit
}

// Returns true if precedence of op2 >= op1, else false (higher precedence = lower number)
function hasPrecedence(op1, op2) {
    return pemdas[op1] >= pemdas[op2];
}

// Performs given operation on num1 and num2
function performOp(operator, num1, num2) {
    switch (operator) {
        case '+':
            return num1 + num2;
        case '-':
            return num2 - num1;
        case '•':
            return num1 * num2;
        case 'D':
            return roll(num2, num1);
    }
    return 0;
}

// Rolls numDice D numSides dice
function roll(numDice, numSides) {
    let total = 0;
    for (let i = 0; i < numDice; i++) {
        const singleRoll = Math.floor((Math.random() * numSides) + 1);
        rolls.push(singleRoll);
        total += singleRoll;
    }
    return total;
}