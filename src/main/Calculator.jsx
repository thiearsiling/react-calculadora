import React, { useState } from "react";
import Display from "../components/Display";
import Button from "../components/Button";

const Calculator = () => {
  const [memory, setMemory] = useState({
    number0: 0,
    number1: 0,
    operation: null,
    current: 0,
    displayValue: 0,
    displayMemory: null,
    history: []
  });

  function clearMemory() {
    let state = { ...memory };

    state.current = 0;
    state.number0 = 0;
    state.number1 = 0;
    state.operation = null;
    state.displayValue = 0;
    state.displayMemory = null;

    setMemory(state);
  }

  function cleanHistory() {

    let state = { ...memory };
    state.history = [];

    setMemory(state)
  }

  function removeDigit() {
    let state = { ...memory };

    if (state.displayValue !== 0) {
      const length = state.displayValue.length;
      state.displayValue =
        length === 1 ? 0 : state.displayValue.slice(0, - 1);
      state.number0 =
        state.current === 0 ? parseFloat(state.displayValue) : state.number0;
      state.number1 =
        state.current === 1 ? parseFloat(state.displayValue) : state.number1;
      setMemory(state);
    }
  }

  function setOperation(operation) {
    let state = { ...memory };

    if (state.number0 !== 0) {
      state.current = 1;

      if (state.operation !== null) {
        let result = calculate();
        state = { ...result };
      }

      state.displayValue = 0;
      state.displayMemory = state.number0 + " " + operation;
    }

    state.operation = operation;
    setMemory(state);
  }

  function addDigit(n) {
    let state = { ...memory };

    let digit = !state.displayValue ? n : state.displayValue + n;
    digit = n === "0" && !state.displayValue ? state.displayValue : digit;
    digit =
      n === "." && state.displayValue.toString().includes(".")
        ? state.displayValue
        : digit;

    state.number0 = state.current === 0 ? parseFloat(digit) : state.number0;
    state.number1 = state.current === 1 ? parseFloat(digit) : state.number1;

    state.displayValue = digit;
    setMemory(state);
  }

  function calculate() {
    let state = { ...memory };

    if (state.operation !== null) {
      let result = 0;
      if (state.operation === "+") {
        result = state.number0 + state.number1;
      } else if (state.operation === "/") {
        result = state.number0 / state.number1;
      } else if (state.operation === "*") {
        result = state.number0 * state.number1;
      } else if (state.operation === "-") {
        result = state.number0 - state.number1;
      }

      state.history.push(`${state.displayMemory} ${state.number1} = ${result}`);
      state.number0 = result;
      state.number1 = 0;
      state.operation = null;
      state.displayValue = result;
      state.displayMemory = null;

      setMemory(state);
      return state;
    }
  }

  return (
    <div className="calculator">
      <div className="title">Calculadora</div>

      <Display value={memory.displayValue} memory={memory.displayMemory} />
      <div className="calculator-body">

        <div className="keyboard">
          <Button label="DEL" column={4} click={removeDigit} />
          <Button label="CE" newRow={true} click={clearMemory} />
          <Button label="/" click={setOperation} />
          <Button label="*" click={setOperation} />
          <Button label="-" click={setOperation} />

          <Button label="7" click={addDigit} />
          <Button label="8" click={addDigit} />
          <Button label="9" click={addDigit} />
          <Button label="+" spanRow={2} click={setOperation} />

          <Button label="4" click={addDigit} />
          <Button label="5" click={addDigit} />
          <Button label="6" click={addDigit} />

          <Button label="1" newRow={true} click={addDigit} />
          <Button label="2" click={addDigit} />
          <Button label="3" click={addDigit} />
          <Button label="=" spanRow={2} click={calculate} />

          <Button label="0" spanColumn={2} click={addDigit} />
          <Button label="." click={addDigit} />
        </div>
        <div className="calculator-history">
          <div className="history-title">Histórico
            <Button label="x" click={cleanHistory}>x</Button>
          </div>
          <div className="history-body">
            <ul>
              {memory.history.map((value, index) => {
                return <li key={index}>{value}</li>
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calculator;
