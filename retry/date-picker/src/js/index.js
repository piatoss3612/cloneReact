class DatePicker {
  monthData = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  calendarDate = {
    data: "",
    date: 0,
    month: 0,
    year: 0,
  };

  selectedDate = {
    data: "",
    date: 0,
    month: 0,
    year: 0,
  };

  constructor() {
    this.initCalendarDate();
    this.initSelectedDate();
    this.assignElement();
    this.addEvent();
    this.setDateInput();
  }

  initCalendarDate = () => {
    const data = new Date();
    const date = data.getDate();
    const month = data.getMonth();
    const year = data.getFullYear();

    this.calendarDate = {
      data,
      date,
      month,
      year,
    };
  };

  initSelectedDate = () => {
    this.selectedDate = { ...this.calendarDate };
  };

  assignElement = () => {
    this.datePickerEl = document.querySelector("#date-picker");
    this.dateInputEl = this.datePickerEl.querySelector("#date-input");
    this.calendarEl = this.datePickerEl.querySelector("#calendar");
    this.calendarMonthEl = this.calendarEl.querySelector("#month");
    this.monthContentEl = this.calendarMonthEl.querySelector("#content");
    this.prevBtnEl = this.calendarMonthEl.querySelector("#prev");
    this.nextBtnEl = this.calendarMonthEl.querySelector("#next");
    this.datesEl = this.calendarEl.querySelector("#dates");
  };

  addEvent = () => {
    this.dateInputEl.addEventListener("click", this.toggleCalendar);
    this.prevBtnEl.addEventListener("click", this.moveToPrevMonth);
    this.nextBtnEl.addEventListener("click", this.moveToNextMonth);
    this.datesEl.addEventListener("click", this.selectDate);
  };

  toggleCalendar = () => {
    if (this.calendarEl.classList.contains("active")) {
      this.calendarDate = { ...this.selectedDate };
    }
    this.calendarEl.classList.toggle("active");
    this.updateMonth();
    this.updateDates();
  };

  updateMonth = () => {
    this.monthContentEl.textContent = `${this.calendarDate.year} ${
      this.monthData[this.calendarDate.month]
    }`;
  };

  updateDates = () => {
    this.datesEl.innerHTML = "";
    const daysOfMonth = new Date(
      this.calendarDate.year,
      this.calendarDate.month + 1,
      0
    ).getDate();

    const fragment = new DocumentFragment();

    for (let i = 1; i <= daysOfMonth; i++) {
      const dateEl = document.createElement("div");
      dateEl.classList.add("date");
      dateEl.textContent = i;
      dateEl.dataset.date = i;
      fragment.appendChild(dateEl);
    }

    fragment.firstChild.style.gridColumnStart =
      new Date(this.calendarDate.year, this.calendarDate.month, 1).getDay() + 1;
    this.datesEl.appendChild(fragment);
    this.markSaturday();
    this.markSunday();
    this.markToday();
    this.markSelectedDate();
  };

  markSaturday = () => {
    const saturdayEls = this.datesEl.querySelectorAll(
      `.date:nth-child(7n + ${
        7 -
        new Date(this.calendarDate.year, this.calendarDate.month, 1).getDay()
      })`
    );

    for (let i = 0; i < saturdayEls.length; i++) {
      saturdayEls[i].style.color = "blue";
    }
  };

  markSunday = () => {
    const sundayEls = this.datesEl.querySelectorAll(
      `.date:nth-child(7n + ${
        (8 -
          new Date(
            this.calendarDate.year,
            this.calendarDate.month,
            1
          ).getDay()) %
        7
      })`
    );

    for (let i = 0; i < sundayEls.length; i++) {
      sundayEls[i].style.color = "red";
    }
  };

  markToday = () => {
    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth();
    const currentDate = today.getDate();

    if (
      currentYear === this.calendarDate.year &&
      currentMonth === this.calendarDate.month
    ) {
      this.datesEl
        .querySelector(`[data-date="${currentDate}"]`)
        .classList.add("today");
    }
  };

  moveToPrevMonth = () => {
    this.calendarDate.month--;
    if (this.calendarDate.month < 0) {
      this.calendarDate.month = 11;
      this.calendarDate.year--;
    }
    this.updateMonth();
    this.updateDates();
  };

  moveToNextMonth = () => {
    this.calendarDate.month++;
    if (this.calendarDate.month > 11) {
      this.calendarDate.month = 0;
      this.calendarDate.year++;
    }
    this.updateMonth();
    this.updateDates();
  };

  selectDate = (event) => {
    const pickedDate = event.target;
    if (pickedDate.dataset.date) {
      this.datesEl.querySelector(".selected")?.classList.remove("selected");
      pickedDate.classList.add("selected");
      this.selectedDate = {
        data: new Date(
          this.calendarDate.year,
          this.calendarDate.month,
          pickedDate.dataset.date
        ),
        year: this.calendarDate.year,
        month: this.calendarDate.month,
        date: pickedDate.dataset.date,
      };
      this.setDateInput();
      this.calendarEl.classList.remove("active");
    }
  };

  markSelectedDate = () => {
    if (
      this.selectedDate.year === this.calendarDate.year &&
      this.selectedDate.month === this.calendarDate.month
    ) {
      this.datesEl
        .querySelector(`[data-date='${this.selectedDate.date}']`)
        .classList.add("selected");
    }
  };

  setDateInput = () => {
    this.dateInputEl.textContent = this.formatDate(this.selectedDate.data);
    this.dateInputEl.dataset.value = this.selectedDate.data;
  };

  formatDate = (dateData) => {
    let date = dateData.getDate();
    if (date < 10) {
      date = `0${date}`;
    }
    let month = dateData.getMonth() + 1;
    if (month < 10) {
      month = `0${month}`;
    }
    let year = dateData.getFullYear();
    return `${year}/${month}/${date}`;
  };
}

new DatePicker();
