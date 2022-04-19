import "../css/style.css";

class Keyboard {
  containerEl;
  switchEl;
  fontSelectEl;
  keyboardEl;
  inputGroupEl;
  inputEl;
  keyPressed = false;
  mouseClicked = false;

  constructor() {
    this.assignElement();
    this.addEvent();
  }

  assignElement() {
    this.containerEl = document.getElementById("container");
    this.switchEl = this.containerEl.querySelector("#switch");
    this.fontSelectEl = this.containerEl.querySelector("#font");
    this.keyboardEl = this.containerEl.querySelector("#keyboard");
    this.inputGroupEl = this.containerEl.querySelector("#input-group");
    this.inputEl = this.inputGroupEl.querySelector("#input");
  }

  addEvent = () => {
    this.switchEl.addEventListener("change", this.changeThemeHandler);
    this.fontSelectEl.addEventListener("change", this.changeFontHandler);
    document.addEventListener("keydown", this.keyDownHandler);
    document.addEventListener("keyup", this.keyUpHandler);
    this.inputEl.addEventListener("input", this.changeInputHandler);
    this.keyboardEl.addEventListener("mousedown", this.mouseClickHandler);
    this.keyboardEl.addEventListener("mouseout", this.mouseOutHandler);
    document.addEventListener("mouseup", this.mouseReleaseHandler);
  };

  changeThemeHandler = (event) => {
    document.documentElement.setAttribute(
      "theme",
      event.target.checked ? "dark-mode" : ""
    );
  };

  changeFontHandler = (event) => {
    document.body.style.fontFamily = event.target.value;
  };

  keyDownHandler = (event) => {
    if (this.mouseClicked) return;
    this.keyPressed = true;
    this.inputGroupEl.classList.toggle(
      "error",
      /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/.test(event.key) || event.key === "Process"
    );
    this.keyboardEl
      .querySelector(`[data-code=${event.code}]`)
      ?.classList.add("active");
  };

  keyUpHandler = (event) => {
    if (this.mouseClicked) return;
    this.keyPressed = false;
    this.keyboardEl
      .querySelector(`[data-code=${event.code}]`)
      ?.classList.remove("active");
  };

  changeInputHandler = (event) => {
    event.target.value = event.target.value.replace(/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/, "");
  };

  mouseClickHandler = (event) => {
    if (this.keyPressed) return;
    this.mouseClicked = true;
    event.target.closest("div.key")?.classList.add("active");
  };

  mouseReleaseHandler = (event) => {
    if (this.keyPressed) return;
    this.mouseClicked = false;
    const keyEl = event.target.closest("div.key");
    const isActive = !!keyEl?.classList.contains("active");
    const keyVal = keyEl?.dataset.val;
    if (isActive && !!keyVal && keyVal !== "Backspace" && keyVal !== "Space") {
      this.inputEl.value += keyVal;
    }
    if (isActive && keyVal === "Space") {
      this.inputEl.value += " ";
    }
    if (isActive && keyVal === "Backspace") {
      this.inputEl.value = this.inputEl.value.slice(0, -1);
    }
    event.target.closest("div.key")?.classList.remove("active");
  };

  mouseOutHandler = (event) => {
    if (this.keyPressed) return;
    this.mouseClicked = false;
    event.target.closest("div.key")?.classList.remove("active");
  };
}

new Keyboard();
