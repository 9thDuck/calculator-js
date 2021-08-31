window.addEventListener("DOMContentLoaded", () => {
  const btns = document.querySelectorAll(".btn");
  const inputDisplay = document.querySelector(".input-display");
  const outputDisplay = document.querySelector(".output-display");
  let varOne = "";
  let varTwo = "";

  let answer;
  const matheOpsExceptEqualsArr = ["+", "-", "/", "x"];
  let mathOp;
  let mathOpHistory = [];
  let btnHistory = [];
  let btnHistoryTemp = []; // btnHistory that will have a length 5 and it will be used to correct some bugs

  //output display bugs correction

  // when two signs other than . / = are pressed after one another

  const mathStageTwo = (varOne, varTwo, operation) => {
    // operations
    const operationSelector = () => {
      switch (operation) {
        case "+":
          addition(varOne, varTwo);
          break;
        case "-":
          subtraction(varOne, varTwo);
          break;
        case "x":
          multiplication(varOne, varTwo);
          break;
        case "/":
          division(varOne, varTwo);
          break;
      }
    };
    const multiplication = (varOne, varTwo) => (answer = varOne * varTwo);

    const division = (varOne, varTwo) => (answer = varOne / varTwo);

    const addition = (varOne, varTwo) => (answer = varOne + varTwo);

    const subtraction = (varOne, varTwo) => (answer = varOne - varTwo);

    console.log(varOne, varTwo, operation);
    operationSelector(varOne, varTwo, operation);
    inputDisplay.textContent = "";
    outputDisplay.textContent = answer;
  };

  const mathStageOne = (op) => {
    if (op !== "=" && op !== ".") {
      mathOpHistory.push(op);
      if (mathOpHistory.length > 2) mathOpHistory.shift();
    }

    if (op === ".") {
      if (inputDisplay.textContent && !/\./.test(inputDisplay.textContent)) {
        inputDisplay.textContent += op;
      } else if (!inputDisplay.textContent) inputDisplay.textContent = "0.";
    } else if (inputDisplay.textContent && op && op !== "." && varOne === "") {
      varOne = parseFloat(inputDisplay.textContent, 10);
      inputDisplay.textContent = "";
      outputDisplay.textContent = `${varOne} ${op} ....`;
    } else if (varOne && !varTwo && inputDisplay.textContent && op) {
      varTwo = parseFloat(inputDisplay.textContent, 10);
      if (
        typeof btnHistory[0] !== "number" &&
        typeof btnHistory[1] === "number" &&
        typeof btnHistory[2] !== "number" &&
        btnHistory[2] === "="
      ) {
      }

      if (op === "=" && btnHistory[2] === "=") {
        mathOp = btnHistory[0];
        mathStageTwo(varOne, varTwo, mathOp);
        varOne = answer;
        varTwo = "";
        inputDisplay.textContent = "";
        // outputDisplay.textContent = `${varOne} ${mathOp}`;
        console.log(
          mathOpHistory,
          "          ",
          mathOp,
          "          ",
          btnHistory,
          "                ",
          btnHistoryTemp,
          1
        );
      }

      if (
        Boolean(btnHistory.indexOf("=")) &&
        varOne &&
        varTwo &&
        op &&
        mathOpHistory.length > 0
      ) {
        if (
          matheOpsExceptEqualsArr.includes(btnHistory[btnHistory.length - 1]) &&
          matheOpsExceptEqualsArr.includes(btnHistory[btnHistory.length - 2])
        )
          mathOp = btnHistory[btnHistory.length - 1];
        else mathOp = mathOpHistory[0];
        mathStageTwo(varOne, varTwo, mathOp);

        console.log(
          mathOpHistory,
          "          ",
          mathOp,
          "          ",
          btnHistory,
          2.1
        );

        varOne = answer;
        varTwo = "";
        mathOp = mathOpHistory[mathOpHistory.length - 1];

        console.log(
          mathOpHistory,
          "          ",
          mathOp,
          "          ",
          btnHistory,
          "                ",
          btnHistoryTemp,
          2.2
        );

        if (
          typeof btnHistory[btnHistory.length - 3] === "number" &&
          matheOpsExceptEqualsArr.includes(btnHistory[btnHistory.length - 1]) &&
          matheOpsExceptEqualsArr.includes(btnHistory[btnHistory.length - 2])
        ) {
          outputDisplay.textContent = `${answer} ${
            btnHistory[btnHistory.length - 1]
          } ...`;
        } else outputDisplay.textContent = `${answer} ${mathOp} ....`;
      }
    }
  };

  const inputProcessor = (val) => {
    if (parseInt(val, 10) <= 9) val = parseInt(val, 10);
    btnHistory.push(val);
    btnHistory.length > 3 ? btnHistory.shift() : "";
    btnHistoryTemp.push(val);
    btnHistoryTemp.length > 5 ? btnHistoryTemp.shift() : "";

    switch (val) {
      case "RESET":
        inputDisplay.textContent = "";
        outputDisplay.textContent = "";
        varOne = "";
        varTwo = "";
        answer = "";
        newOp = "";
        mathOp = "";
        mathOpHistory = [];
        break;
      case "DEL":
        inputDisplay.textContent = inputDisplay.textContent.slice(
          0,
          inputDisplay.textContent.length - 1
        );
        break;
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
      case 6:
      case 7:
      case 8:
      case 9:
      case 0:
        inputDisplay.textContent += val;
        break;
      case "+":
      case "-":
      case "/":
      case "x":
      case "=":
      case ".":
        mathStageOne(val);
        break;
    }
  };

  btns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const val = e.currentTarget.textContent;
      inputProcessor(val);
    });
  });
});
