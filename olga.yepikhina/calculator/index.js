let firstNumber = '';
let secondNumber = '';
let operation = null;

const resultElement = document.querySelector('.result');

document.querySelectorAll('.number').forEach(
  function (element) {
    element.addEventListener('click', function () {
      if (operation == null) {
        if (firstNumber.indexOf('.') >= 0 && element.innerText === '.') {
          return;
        }
        firstNumber = firstNumber + element.innerText;
        resultElement.innerText = firstNumber;
      }
      else {
        if (secondNumber.indexOf('.') >= 0 && element.innerText === '.') {
          return;
        }
        secondNumber = secondNumber + element.innerText;
        resultElement.innerText = secondNumber;
      }
    }
    );
  }
)

document.querySelectorAll('.operation').forEach(
  function (element) {
    element.addEventListener('click', function () {
      operation = element.innerText;
      if (firstNumber === ''){
        firstNumber = resultElement.innerText;
      }
    }
    )
  }
)

document.querySelector('.equal').addEventListener('click', function () {
  resultElement.innerText = calculate().toString();
  firstNumber = ''
  secondNumber = '';
  operation = null;

})


document.querySelector('.reset').addEventListener('click', function () {
  firstNumber = ''
  secondNumber = '';
  operation = null;
  resultElement.innerText = "0";
})

function calculate() {
  return performOperation(
    parseFloat(firstNumber),
    parseFloat(secondNumber),
    operation
  );
}

function performOperation(a, b, op) {
  switch (op) {
    case "+":
      return a + b;

    case "-":
      return a - b;

    case "/":
      return a / b;

    case "*":
      return a * b;
  }
}

