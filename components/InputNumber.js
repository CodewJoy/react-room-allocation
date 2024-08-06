import React, { useState, useRef, useEffect } from "react";
import styled from "@emotion/styled";

const StyledContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledInput = styled.input`
  width: 32px;
  height: 32px;
  font-size: 16px;
  text-align: center;
  margin: 0 8px;
  border-radius: 4px;
  color: rgb(89, 89, 89);
  background-color: white;
  border: 1px solid rgb(89, 89, 89);
  ${({ disabled }) =>
    disabled &&
    `
    background-color: #f0f0f0;
    cursor: not-allowed;
  `}

  /* Hide the arrow buttons in number input */
  -moz-appearance: textfield;
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

const StyledButton = styled.button`
  width: 32px;
  height: 32px;
  font-size: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  color: rgb(30, 159, 210);
  background-color: white;
  border: 1px solid rgb(30, 159, 210);
  ${({ disabled }) =>
    disabled &&
    `
    background-color: #f0f0f0;
    cursor: not-allowed;
  `}
`;

export default function InputNumber({
  min,
  max,
  step = 1,
  name,
  value,
  disabled,
  onChange,
  onBlur,
}) {
  const refInterval = useRef(null);

  const handleChange = (e) => {
    const newValue = Number(e.target.value);
    if (!isNaN(newValue) && newValue >= min && newValue <= max) {
      onChange({ target: { name, value: newValue } });
    }
  };

  const handleBlur = (e) => {
    if (onBlur) onBlur({ target: { name, value: value } });
  };

  const handleIncrement = () => {
    if (disabled || value >= max) return;
    const newValue = Math.min(value + step, max);
    onChange({ target: { name, value: newValue } });
  };

  const handleDecrement = () => {
    if (disabled || value <= min) return;
    const newValue = Math.max(value - step, min);
    onChange({ target: { name, value: newValue } });
  };

  const handleMouseDown = (action) => {
    action();
    refInterval.current = setInterval(action, 200);
  };

  const handleMouseUp = () => {
    clearInterval(refInterval.current);
  };

  useEffect(() => {
    return clearInterval(refInterval.current);
  }, []);

  return (
    <StyledContainer>
      <StyledButton
        onMouseDown={() => handleMouseDown(handleDecrement)}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        disabled={disabled || value <= min}
      >
        -
      </StyledButton>
      <StyledInput
        type="number"
        min={min}
        max={max}
        step={step}
        name={name}
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        disabled={disabled}
      />
      <StyledButton
        onMouseDown={() => handleMouseDown(handleIncrement)}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        disabled={disabled || value >= max}
      >
        +
      </StyledButton>
    </StyledContainer>
  );
}
