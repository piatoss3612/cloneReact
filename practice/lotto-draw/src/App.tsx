import styled from "@emotion/styled";
import React, { useState } from "react";
import NumberBox from "./components/NumberBox";
import Title from "./components/Title";

const NumberBoxContainer = styled.div`
  display: flex;
  gap: 16px;
  margin-top: 24px;
`;

function App() {
  const [num, setNum] = useState<
    [number, number, number, number, number, number, number]
  >([1, 2, 3, 4, 5, 6, 7]);
  return (
    <div>
      <Title>정답 번호</Title>
      <NumberBoxContainer>
        {Array(8)
          .fill(1)
          .map((_, idx) => {
            if (idx === 6) {
              return <NumberBox />;
            }

            if (idx === 7) {
              idx = 6;
            }

            return (
              <NumberBox
                num={num[idx]}
                setNum={(value) => {
                  if (num.includes(value)) {
                    return;
                  }
                  setNum((prev) => {
                    prev[idx] = value;
                    return [...prev];
                  });
                }}
              />
            );
          })}
      </NumberBoxContainer>
    </div>
  );
}

export default App;
