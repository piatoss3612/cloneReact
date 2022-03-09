export class Keyboard {
  #switchEl;
  #fontSelectEl;

  constructor() {
    this.#assignElement();
    this.#addEvent();
  }

  #assignElement() {
    this.#switchEl = document.getElementById("switch");
    this.#fontSelectEl = document.getElementById("font");
  }

  #addEvent() {
    this.#switchEl.addEventListener("change", (event) => {
      //   if (event.target.checked) {
      //     document.documentElement.setAttribute("theme", "dark-mode");
      //   } else {
      //     document.documentElement.setAttribute("theme", "");
      //   }

      document.documentElement.setAttribute(
        "theme",
        event.target.checked ? "dark-mode" : ""
      );
    });

    this.#fontSelectEl.addEventListener("change", (event) => {
      document.body.style.fontFamily = event.target.value;
    });
  }
}
