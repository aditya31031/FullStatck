import React, { useState, useEffect, useCallback } from "react";
import "./Calculator.css";
import * as math from "mathjs";
import BackButton from "../BackButton";

const Calculator = () => {
  const [display, setDisplay] = useState("");

  const handleClick = useCallback((value) => {
    setDisplay((prev) => prev + value);
  }, []);

  const calculateResult = useCallback(() => {
    try {
      const result = math.evaluate(display);
      setDisplay(result.toString());
    } catch {
      setDisplay("Error");
    }
  }, [display]);

  const clearDisplay = useCallback(() => {
    setDisplay("");
  }, []);

  const backspace = useCallback(() => {
    setDisplay((prev) => prev.slice(0, -1));
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.key >= '0' && e.key <= '9') || ['+', '-', '*', '/', '.', '(', ')', '%'].includes(e.key)) {
        handleClick(e.key);
      } else if (e.key === 'Enter') {
        e.preventDefault(); // prevent form submission if in form
        calculateResult();
      } else if (e.key === 'Backspace') {
        backspace();
      } else if (e.key.toLowerCase() === 'c') {
        clearDisplay();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleClick, calculateResult, clearDisplay, backspace]);

  return (
    <>
      <BackButton />
      <div className="calculatorContainer">
        <div className="calculator">
          <div className="calculator-display">{display || "0"}</div>
          <div className="calculator-buttons">
            <button onClick={clearDisplay} className="btn btn-function">C</button>
            <button onClick={backspace} className="btn btn-function">⌫</button>
            <button onClick={() => handleClick('%')} className="btn btn-operator">%</button>
            <button onClick={() => handleClick('/')} className="btn btn-operator">/</button>

            <button onClick={() => handleClick('7')} className="btn">7</button>
            <button onClick={() => handleClick('8')} className="btn">8</button>
            <button onClick={() => handleClick('9')} className="btn">9</button>
            <button onClick={() => handleClick('*')} className="btn btn-operator">*</button>

            <button onClick={() => handleClick('4')} className="btn">4</button>
            <button onClick={() => handleClick('5')} className="btn">5</button>
            <button onClick={() => handleClick('6')} className="btn">6</button>
            <button onClick={() => handleClick('-')} className="btn btn-operator">-</button>

            <button onClick={() => handleClick('1')} className="btn">1</button>
            <button onClick={() => handleClick('2')} className="btn">2</button>
            <button onClick={() => handleClick('3')} className="btn">3</button>
            <button onClick={() => handleClick('+')} className="btn btn-operator">+</button>

            <button onClick={() => handleClick('(')} className="btn">(</button>
            <button onClick={() => handleClick('0')} className="btn">0</button>
            <button onClick={() => handleClick(')')} className="btn">)</button>
            <button onClick={calculateResult} className="btn btn-equal">=</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Calculator;
