const minutesInput = document.getElementById('minutes');
const secondsInput = document.getElementById('seconds');
const settingsButton = document.getElementById('settings');
const toggleTimerButton = document.getElementById('start');
const ring = document.getElementById('ring');

let interval;

const toggleEditMode = () => {
  minutesInput.disabled = !minutesInput.disabled;
  secondsInput.disabled = !secondsInput.disabled;
};

const toggleTimer = () => {
  if (toggleTimerButton.textContent === 'start') {
    setTimerGreenColor();
    setToggleTimerButtonContent('stop');
    interval = setInterval(countdownTimer, 1000);
  } else {
    setToggleTimerButtonContent('start');
    stopTimer(interval);
  }
};

const setToggleTimerButtonContent = (value) => {
  toggleTimerButton.textContent = value;
};

const countdownTimer = () => {
  const { minutes, seconds } = getMinutesAndSeconds();
  const remainingTime = ((minutes * 60) + seconds) - 1;

  if (remainingTime >= 0) {
    const { remainingMinutes, remainingSconds } = calculateRemainingMinutesAndSeconds(remainingTime);
    setTime(remainingMinutes, remainingSconds);
  } else {
    stopTimer()
    setTimerRedColor();
    alert('Time\'s up');
  }
};

const getMinutesAndSeconds = () => {
  const minutes = Number.parseInt(minutesInput.value, 10);
  const seconds = Number.parseInt(secondsInput.value, 10);

  return {
    minutes,
    seconds
  };
}

const calculateRemainingMinutesAndSeconds = (totalTimeInSeconds) => {
  const remainingMinutes = Math.floor(totalTimeInSeconds / 60);
  const remainingSconds = Math.floor(totalTimeInSeconds % 60);

  return {
    remainingMinutes,
    remainingSconds
  };
}

const setTimerRedColor = () => {
  if (!ring.classList.contains('ending')) {
    ring.classList.add('ending');
  }
}

const setTimerGreenColor = () => {
  if (ring.classList.contains('ending')) {
    ring.classList.remove('ending');
  }
}

const stopTimer = () => {
  clearInterval(interval);
};

const setTime = (minutes, seconds) => {
  minutesInput.value = minutes.toLocaleString('en', { minimumIntegerDigits: 2 });
  secondsInput.value = seconds.toLocaleString('en', { minimumIntegerDigits: 2 });;
};

settingsButton.addEventListener('click', () => {
  toggleEditMode();
});

toggleTimerButton.addEventListener('click', () => {
  toggleTimer();
});

const isNumeric = (value) => {
  if (typeof value !== 'string') {
    return false;
  }
  return !isNaN(value) && !isNaN(parseFloat(value))
}

window.addEventListener('load', () => {
  setTime(15, 00);
});

minutesInput.addEventListener('keypress', (event) => {
  if (!isNumeric(event.key)) {
    event.preventDefault();
  }
});

minutesInput.addEventListener('keypress', (event) => {
  if (!isNumeric(event.key)) {
    event.preventDefault();
  }
});