let userInput;
let prefix;
let postfix;
let evaluate;
let result;

document.addEventListener("DOMContentLoaded", loadPage);

function evaluate_equation() {
    const expression = userInput.value.trim(); 
    if (!expression) {
        result.innerHTML = "Please enter the equation!";
    }

    let output;
    if (prefix.checked) {
        if (check_validity(expression)) {
            output = evaluatePrefix(expression);
        } 
        else {
            output = "Invalid prefix expression.";
        }
    } 
    else if (postfix.checked) {
        if (check_validity(expression)) {
            output = evaluatePostfix(expression);
        } 
        else {
            output = "Invalid postfix expression.";
        } 
    }
    else {
        output = "Please select Prefix or Postfix!";
    }
    
    result.innerHTML = output;
}
function check_validity(expression) {
    const items = expression.trim().split(/\s+/);
    if (items.length > 0) {
        for (let i = 0; i < items.length; i++) {
            if (!isNum(items[i]) && !isOperator(items[i])) {
                return false;
            }
        }
        return true;
    } 
    return false;
}

function evaluatePrefix(expression) {
    let items = expression.split(/\s+/); 
    let stack = []; 

    for (let i = items.length - 1; i >= 0; i--) {
        if (isNum(items[i])) {
            stack.push(parseInt(items[i]));
        } 
        else if (isOperator(items[i])) {
            const num1 = stack.pop();
            const num2 = stack.pop();

            if (num1 === undefined || num2 === undefined) {
                return "Invalid prefix expression";
            }
            const result = operate(num2, num1, items[i]);
            stack.push(result);
        } 
    }
    if (stack.length !== 1) {
        return "Invalid prefix expression"; 
    }
    return stack.pop(); 
}

function evaluatePostfix(expression) {
    let items = expression.split(/\s+/);
    let operation = [];

    for (let i = 0; i < items.length; i++) { 
        if (isNum(items[i])) {
            operation.push(parseInt(items[i]));
        } else if (isOperator(items[i])) {
            const num2 = operation.pop();
            const num1 = operation.pop();

            if (num1 === undefined || num2 === undefined) {
                return "Invalid postfix expression";
            }
            const result = operate(num1, num2, items[i]);
            operation.push(result);
        } 
    }
    if (operation.length !== 1) {
        return "Invalid postfix expression";
    }
    return operation.pop();
}

function isNum(item) {
    return !isNaN(item);
}

function isOperator(item) {
    if(item === "+" || item === "-" || item === "*" || item === "/"){
        return true;
    }
    return false;
}

function operate(num1, num2, operator) {
    switch (operator) {
        case "+":
            return num1 + num2;
        case "-":
            return num1 - num2;
        case "*":
            return num1 * num2;
        case "/":
            if (num2 === 0) {
                return "Error(Division by 0)";
            }
            return num1 / num2;
        default:
            return null;
    }
}

function loadPage() {
    userInput = document.getElementById("userInput");
    prefix = document.getElementById("prefix_radio");
    postfix = document.getElementById("postfix_radio");
    evaluate = document.getElementById("evaluate");
    result = document.getElementById("result");

    evaluate.addEventListener("click", evaluate_equation);
}
