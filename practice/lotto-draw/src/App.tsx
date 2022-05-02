import styled from "@emotion/styled";
import React, { useState } from "react";
import Button from "./components/Button";
import NumberBox from "./components/NumberBox";
import Title from "./components/Title";

const NumberBoxContainer = styled.div`
  display: flex;
  gap: 16px;
  margin-top: 24px;
`;

type selectedNumbers = [number, number, number, number, number, number, number];
type randNumbers = [number, number, number, number, number, number];

function App() {
  const [num, setNum] = useState<selectedNumbers>([1, 2, 3, 4, 5, 6, 7]);

  const [randNum, setRandNum] = useState<randNumbers | null>(null);

  const getRank = (resNum: selectedNumbers, num: randNumbers) => {
    const isBonus = num.includes(resNum[6]);

    resNum.slice(6, 1);

    let matchedNum: number = 0;

    for (const value of num) {
      if (resNum.includes(value)) {
        matchedNum += 1;
      }
    }

    switch (matchedNum) {
      case 6:
        return 1;
      case 5:
        return isBonus ? 2 : 3;
      case 4:
        return 4;
      case 3:
        return 5;
    }
    return 0;
  };

  return (
    <>
      <div>
        <Title>정답 번호</Title>
        <NumberBoxContainer>
          {Array(8)
            .fill(1)
            .map((_, idx) => {
              if (idx === 6) {
                return <NumberBox key="+" />;
              }

              if (idx === 7) {
                idx = 6;
              }

              return (
                <NumberBox
                  key={idx}
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
      <div style={{ marginTop: "110px" }}>
        <Button
          onClick={() => {
            const li: number[] = [];

            while (li.length < 6) {
              const v = Math.floor(Math.random() * 45 + 1);

              if (li.includes(v)) continue;
              li.push(v);
            }

            setRandNum(li as randNumbers);
          }}
        >
          랜덤 번호 추첨
        </Button>
      </div>
      {randNum && (
        <div style={{ marginTop: "24px" }}>
          <Title>번호 추첨 결과</Title>
          <NumberBoxContainer>
            {Array(6)
              .fill(1)
              .map((_, idx) => {
                return <NumberBox key={idx} num={randNum[idx]} />;
              })}
          </NumberBoxContainer>
          <div style={{ marginTop: "40px" }}>
            <Title>
              {getRank(num, randNum) > 0
                ? `${getRank(num, randNum)}등 입니다!`
                : "당첨되지 않았습니다."}
            </Title>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
