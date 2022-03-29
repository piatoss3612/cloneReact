const bmiDisplay = document.getElementById("bmi");
const stateDisplay = document.getElementById("state");
const meterDisplay = document.getElementById("meter");
const res = document.getElementById("res");

const onSubmit = (event) => {
  event.preventDefault();
  const w = parseFloat(event.target[0].value);
  const h = parseFloat(event.target[1].value);

  if (isNaN(w) || isNaN(h) || w <= 0 || h <= 0) {
    alert("적절한 값이 아닙니다.");
    return;
  }

  const bmi = w / h ** 2;
  res.style.display = "flex";

  let state = "정상";
  let common = true;
  if (bmi < 18.5) {
    state = "저체중";
    common = false;
  }
  if (bmi >= 25) {
    state = "과체중";
    common = false;
  }

  meterDisplay.value = bmi;
  bmiDisplay.innerText = bmi.toFixed(2);
  stateDisplay.innerText = state;
  stateDisplay.style.color = common ? "#29ff21" : "#ff3a3a";
};

const onReset = () => {
  res.style.display = "none";
};
