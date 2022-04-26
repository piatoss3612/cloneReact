export class ImageSlider {
  currentPosition = 0;
  numberOfSlide = 0;
  slideWidth = 0;
  intervalId;
  isAutoPlaying = true;

  constructor() {
    this.assignElement();
    this.initSliderNumber();
    this.initSlideWidth();
    this.initSlideListWidth();
    this.createIndicator();
    this.addEvent();
    this.markIndicator();
    this.initAutoPlay();
  }

  assignElement = () => {
    this.sliderWrapEl = document.querySelector("#slider-wrap");
    this.slideListEl = this.sliderWrapEl.querySelector("#slider");
    this.nexBtnEl = this.sliderWrapEl.querySelector("#next");
    this.prevBtnEl = this.sliderWrapEl.querySelector("#previous");
    this.indicatorWrapEl = this.sliderWrapEl.querySelector("#indicator-wrap");
    this.autoPlayBtnEl = this.sliderWrapEl.querySelector("#control-wrap");
  };

  initSliderNumber = () => {
    this.numberOfSlide = this.slideListEl.querySelectorAll("li").length;
  };

  initSlideWidth = () => {
    this.slideWidth = this.sliderWrapEl.clientWidth;
  };

  initSlideListWidth = () => {
    this.slideListEl.style.width = `${this.numberOfSlide * this.slideWidth}px`;
  };

  initAutoPlay = () => {
    this.intervalId = setInterval(this.moveToNextSlide, 3000);
  };

  addEvent = () => {
    this.nexBtnEl.addEventListener("click", this.moveToNextSlide);
    this.prevBtnEl.addEventListener("click", this.moveToPrevSlide);
    this.indicatorWrapEl.addEventListener("click", this.indicatorClickHandler);
    this.autoPlayBtnEl.addEventListener("click", this.toggleAutoPaly);
  };

  moveToNextSlide = () => {
    this.currentPosition++;
    if (this.currentPosition === this.numberOfSlide) {
      this.currentPosition = 0;
    }
    this.resetInterval();
    this.moveSlide();
    this.markIndicator();
  };

  moveToPrevSlide = () => {
    this.currentPosition--;
    if (this.currentPosition < 0) {
      this.currentPosition = this.numberOfSlide - 1;
    }
    this.resetInterval();
    this.moveSlide();
    this.markIndicator();
  };

  moveSlide = () => {
    this.slideListEl.style.left = `-${
      this.currentPosition * this.slideWidth
    }px`;
  };

  createIndicator = () => {
    const docFragment = document.createDocumentFragment();
    for (let i = 0; i < this.numberOfSlide; i++) {
      const li = document.createElement("li");
      li.dataset.index = i;
      docFragment.appendChild(li);
    }
    this.indicatorWrapEl.querySelector("ul").appendChild(docFragment);
  };

  markIndicator = () => {
    this.indicatorWrapEl.querySelector("li.active")?.classList.remove("active");
    this.indicatorWrapEl
      .querySelector(`ul li:nth-child(${this.currentPosition + 1})`)
      .classList.add("active");
  };

  indicatorClickHandler = (event) => {
    const curerntPos = parseInt(event.target.closest("li")?.dataset.index);
    if (Number.isInteger(curerntPos)) {
      this.puaseAutoPlay();
      this.currentPosition = curerntPos;
      this.moveSlide();
      this.markIndicator();
    }
  };

  toggleAutoPaly = (event) => {
    if (event.target.dataset.status === "pause") {
      this.puaseAutoPlay();
    } else {
      this.startAutoPlay();
    }
  };

  puaseAutoPlay = () => {
    if (this.isAutoPlaying) {
      this.isAutoPlaying = false;
      clearInterval(this.intervalId);
      this.autoPlayBtnEl.classList.remove("play");
      this.autoPlayBtnEl.classList.add("pause");
    }
  };

  startAutoPlay = () => {
    if (!this.isAutoPlaying) {
      this.isAutoPlaying = true;
      this.initAutoPlay();
      this.autoPlayBtnEl.classList.add("play");
      this.autoPlayBtnEl.classList.remove("pause");
    }
  };

  resetInterval = () => {
    if (this.isAutoPlaying) {
      clearInterval(this.intervalId);
      this.intervalId = setInterval(this.moveToNextSlide, 3000);
    }
  };
}
