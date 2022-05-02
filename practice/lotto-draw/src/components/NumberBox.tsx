import styled from "@emotion/styled";
import React from "react";

const StyledNumberBox = styled.select`
  width: 48px;
  height: 48px;
  border: 1px #48aeff solid;
  font-size: 14px;
  color: #48aeff;

  appearance: none;
  text-align: center;

  &:disabled {
    opacity: 1;
  }
`;

const NumberBox = ({
  num,
  setNum,
}: {
  num?: number;
  setNum?: (num: number) => void;
}) => {
  return (
    <StyledNumberBox
      value={num}
      disabled={!setNum}
      onChange={(event) => {
        if (setNum) {
          setNum(+event.target.value);
        }
      }}
    >
      {!num && !setNum && <option>+</option>}
      {num && !setNum && <option>{num}</option>}
      {!!setNum &&
        Array(45)
          .fill(0)
          .map((_, idx) => <option key={idx}>{idx + 1}</option>)}
    </StyledNumberBox>
  );
};

export default NumberBox;
