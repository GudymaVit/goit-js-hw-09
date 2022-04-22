import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

const refs = {
    timer: document.querySelector('.timer'),
    input: document.querySelectorAll('#datetime-picker'),
    startBtn: document.querySelector('button[data-start]'),
    days: document.querySelector('.value[data-days]'),
    hours: document.querySelector('.value[data-hours]'),
    minutes: document.querySelector('.value[data-minutes]'),
    seconds: document.querySelector('.value[data-seconds]'),
    field: document.querySelectorAll('.field'),
}

refs.timer.style.cssText = `list-style: none;  font-size: 26px; font-weight: 700;`;
refs.startBtn.setAttribute('disabled', 'true');

refs.startBtn.addEventListener('click', () => {
  countDownTimer.start();
})

const countDownTimer = {
  intervalId: null,
  isActive: false,
  
  start() {
    const startTime = Date.now();
    if (this.isActive) {
      return;
    }
    document.body.style.backgroundColor = "linear-gradient(red, blue)";
    this.isActive = true;    
    refs.startBtn.setAttribute('disabled', true);

    this.intervalId =  setInterval(() => {
      const currentTime = Date.now();
      
      const decrementTime = refs.input.value - currentTime;
      const { days, hours, minutes, seconds } = convertMs(decrementTime);

      updateTimerface({ days, hours, minutes, seconds });
      
      if (decrementTime < 1000) {
        Notiflix.Notify.success('Time is over');
        clearInterval(this.intervalId);
      }

      console.log(`${days}:${hours}:${minutes}:${seconds}`);

    }, 1000);
  },
};

const options = {

  enableTime: true,
  time_24hr: true,
  defaultDate: Date.now(),
  minuteIncrement: 1,

  onClose(selectedDates) {
    refs.input.value = selectedDates[0].getTime();
      if (refs.input.value < Date.now()) {
        Notiflix.Notify.failure('Please choose a date in the future');
      }
    else {      
      refs.startBtn.removeAttribute('disabled');       
    };
    },
};

// console.log(options.onClose());

flatpickr(refs.input, options);

function updateTimerface({ days, hours, minutes, seconds }) {
  refs.days.textContent = days;
  refs.hours.textContent = hours;
  refs.minutes.textContent = minutes;
  refs.seconds.textContent = seconds;
 };

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}
