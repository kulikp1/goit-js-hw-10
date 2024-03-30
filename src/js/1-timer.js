import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

// Пошук елементів за айдішником, запис їх у змінні
const datetimePicker = document.getElementById('datetime-picker');
const startBtn = document.getElementById('start-btn');
const daysSpan = document.getElementById('days');
const hoursSpan = document.getElementById('hours');
const minutesSpan = document.getElementById('minutes');
const secondsSpan = document.getElementById('seconds');

// Оголошення змінних для таймера
let countdownInterval;
let userSelectedDate;
startBtn.disabled = true;

// Ініціалізація календаря flatpickr
flatpickr(datetimePicker, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose: function(selectedDates) {
    if (selectedDates[0] > new Date()) {
      startBtn.disabled = false; 
        userSelectedDate = selectedDates[0]; // Збереження обраної дати
        iziToast.success({
    title: '',
    message: 'Дата вибрана, клацай старт!',
});
    } else {
      startBtn.disabled = true; 
      clearTimer();

      iziToast.error({
        title: '',
        message: 'Будь ласка, обери дату в майбутньому',
      });
    }
  },
});
// функція для скидання значень таймера, якщо обрана дата в минулому
function clearTimer() {
  clearInterval(countdownInterval);
  days.textContent = '00';
  hours.textContent = '00';
  minutes.textContent = '00';
  seconds.textContent = '00';
}
// Функція підрахунку часу до кінцевої дати
function calculateTimeRemaining() {
  const now = new Date().getTime();
  const difference = userSelectedDate - now;

  if (difference <= 0) {
    clearInterval(countdownInterval);
    return;
  }

  const { days, hours, minutes, seconds } = convertMs(difference);

  // Оновлення таймера
  daysSpan.textContent = addZero(days);
  hoursSpan.textContent = addZero(hours);
  minutesSpan.textContent = addZero(minutes);
  secondsSpan.textContent = addZero(seconds);
}

// Функція для додавання нуля перед числом, якщо воно має менше двох символів
function addZero(value) {
  return value.toString().padStart(2, '0');
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

startBtn.addEventListener('click', function() {
  countdownInterval = setInterval(calculateTimeRemaining, 1000); 
  startBtn.disabled = true; 
});

