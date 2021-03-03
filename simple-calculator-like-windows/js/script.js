// get btns elements from html
const numBtnsElements = Array.from(document.querySelectorAll(".num"));
const optBtnsElements = Array.from(document.querySelectorAll(".opt"));
const optFBtnsElement = Array.from(document.querySelectorAll(".optF"));
// declarating result and preResult
const preResult = document.getElementById("pre-result");
const Result = document.getElementById("result");
// declarating btns
const numBtns = [
  {
    element: numBtnsElements[9],
    string: "0",
  },
  {
    element: numBtnsElements[6],
    string: "1",
  },
  {
    element: numBtnsElements[7],
    string: "2",
  },
  {
    element: numBtnsElements[8],
    string: "3",
  },
  {
    element: numBtnsElements[3],
    string: "4",
  },
  {
    element: numBtnsElements[4],
    string: "5",
  },
  {
    element: numBtnsElements[5],
    string: "6",
  },
  {
    element: numBtnsElements[0],
    string: "7",
  },
  {
    element: numBtnsElements[1],
    string: "8",
  },
  {
    element: numBtnsElements[2],
    string: "9",
  },
  {
    element: numBtnsElements[10],
    string: ".",
  },
];
const optBtns = [
  {
    element: optBtnsElements[0],
    string: "%",
  },
  {
    element: optBtnsElements[1],
    string: "^",
  },
  {
    element: optBtnsElements[2],
    string: "/",
  },
  {
    element: optBtnsElements[3],
    string: "*",
  },
  {
    element: optBtnsElements[4],
    string: "-",
  },
  {
    element: optBtnsElements[5],
    string: "+",
  },
];
const optFBtns = [
  {
    element: optFBtnsElement[0],
    string: "del",
  },
  {
    element: optFBtnsElement[1],
    string: "clear",
  },
  {
    element: optFBtnsElement[2],
    string: "=",
  },
];

// showing in preResult <p>
numBtns.forEach((value) => {
  value.element.addEventListener("click", function () {
    setInPreResult("num", value.string);
  });
});
optBtns.forEach((value) => {
  value.element.addEventListener("click", function () {
    setInPreResult("opt", value.string);
  });
});
optFBtns.forEach((value) => {
  if (value.string === "=") {
    value.element.addEventListener("click", function () {
      setInPreResult("equ", value.string);
    });
  } else if (value.string === "del") {
    value.element.addEventListener("click", function () {
      deleteChar();
    });
  } else {
    value.element.addEventListener("click", function () {
      clearPreResult();
      clearResult();
      enableOptsBtns();
    });
  }
});
function deleteChar() {
  let content = Array.from(preResult.innerHTML);
  let lastItem = content[content.length - 1];
  if (lastItem === " ") {
    content.pop();
    content.pop();
    content.pop();
  } else content.pop();

  preResult.innerHTML = content.join("");
  checkingPreResult(preResult.innerHTML);
}
function setInPreResult(which, str) {
  let content = preResult.innerHTML;
  let state = findFirstEqIndex(content);
  switch (which) {
    case "num":
      {
        if (state) {
          clearPreResult();
          clearResult();
        }
        preResult.innerHTML += `${str}`;
      }
      break;
    case "opt":
      {
        if (state) {
          preResult.innerHTML = `${Result.innerHTML}`;
          clearResult();
        }
        preResult.innerHTML += ` ${str} `;
      }
      break;

    default:
      preResult.innerHTML += ` ${str} `;
      break;
  }
  checkingPreResult(preResult.innerHTML);
}
// check after operation press key> 2+1=?
function findFirstEqIndex(content) {
  let contentArr = Array.from(content);
  let equIndex;
  contentArr.map((value, index) => {
    if (value === "=") {
      equIndex = index;
    }
  });
  if (equIndex) return true;
  else return false;
}

// clear pre result & final result
function clearPreResult() {
  preResult.innerHTML = "";
}
function clearResult() {
  result.innerHTML = 0;
}
// disabling opts btns
function disableOptsBtns() {
  optBtns.forEach((value) => {
    value.element.disabled = true;
  });
}
// enabling opts btns
function enableOptsBtns() {
  optBtns.forEach((value) => {
    value.element.disabled = false;
  });
}
// checking preResult Change
function checkingPreResult(content) {
  var contentArr = Array.from(content);
  enableOptsBtns();

  // forbidden press opts at first
  if (
    content[1] === "%" ||
    content[1] === "^" ||
    content[1] === "/" ||
    content[1] === "*" ||
    content[1] === "-" ||
    content[1] === "+" ||
    content[1] === "="
  ) {
    clearPreResult();
    clearResult();
  } else {
    // one operation is valid

    contentArr.forEach((value) => {
      if (
        value === "%" ||
        value === "^" ||
        value === "/" ||
        value === "*" ||
        value === "-" ||
        value === "+"
      ) {
        disableOptsBtns();
      } else if (value === "=") getNumsOptFunc(contentArr);
    });
  }
}
// get the nums and operation
function getNumsOptFunc(contentArray) {
  let optIndex,
    optValue,
    equIndex,
    firstNumArr,
    secondNumArr,
    firstNum,
    secondNum;
  contentArray.forEach((value, index) => {
    if (
      value === "%" ||
      value === "^" ||
      value === "/" ||
      value === "*" ||
      value === "-" ||
      value === "+"
    ) {
      optValue = value;
      optIndex = index;
    } else if (value === "=") {
      equIndex = index;
    }
  });
  firstNumArr = contentArray.slice(0, optIndex - 1);
  secondNumArr = contentArray.slice(optIndex + 2, equIndex - 1);
  firstNum = parseFloat(firstNumArr.join(""));
  secondNum = parseFloat(secondNumArr.join(""));
  operationFunc(firstNum, secondNum, optValue);
}
function operationFunc(n1, n2, opt) {
  let result;
  switch (opt) {
    case "%":
      result = (n1 / n2) * 100;
      break;
    case "^":
      result = Math.pow(n1, n2);
      break;
    case "/":
      result = n1 / n2;
      break;
    case "*":
      result = n1 * n2;
      break;
    case "-":
      result = n1 - n2;
      break;
    case "+":
      result = n1 + n2;
      break;
    default:
      result = `the operation not defined!`;
      break;
  }
  Result.innerHTML = Number(result.toFixed(6));
  enableOptsBtns();
  optDone("true");
}
// ==============UP================///==========>>>>>>>should Fixe!!!

function optDone(state) {
  let ss = state;
  if (ss === "true") return true;
  else return false;
}
