const passwordInput = document.getElementById('passwordInput');
const strengthLabel = document.getElementById('strengthLabel');
const timeLabel = document.getElementById('timeLabel');
const strengthBar = document.getElementById('strengthBar');
const feedbackList = document.getElementById('feedbackList');
const simulatorWindow = document.getElementById('simulatorWindow');

const simulationGuesses = [
  'Password123',
  'Summer2024',
  'Qwerty!',
  'Admin@123',
  'Welcome1',
  'Football',
  'Monkey',
  'Letmein',
  'Baseball',
  'Dragon',
];

let simulationIndex = 0;
let simulationTimer = null;

function getStrengthText(score) {
  switch (score) {
    case 0:
    case 1:
      return 'Weak';
    case 2:
    case 3:
      return 'Medium';
    case 4:
      return 'Strong';
    default:
      return 'Unknown';
  }
}

function getStrengthColor(score) {
  if (score <= 1) return '#ef4444';
  if (score === 2) return '#f59e0b';
  return '#22c55e';
}

function formatCrackTime(seconds) {
  if (seconds === 0) return 'Instant';
  if (seconds < 60) return `${Math.round(seconds)} seconds`;
  if (seconds < 3600) return `${Math.round(seconds / 60)} minutes`;
  if (seconds < 86400) return `${Math.round(seconds / 3600)} hours`;
  if (seconds < 31536000) return `${Math.round(seconds / 86400)} days`;
  if (seconds < 3153600000) return `${Math.round(seconds / 31536000)} years`;
  return 'Centuries';
}

function updateFeedback(result) {
  feedbackList.innerHTML = '';
  const messages = [];

  if (!passwordInput.value) {
    feedbackList.innerHTML = '<p>Enter a sample password above to see strength, crack estimate, and improvement tips.</p>';
    return;
  }

  if (result.feedback.warning) {
    messages.push({ label: result.feedback.warning, level: 'Attention' });
  }

  result.feedback.suggestions.forEach((suggestion) => {
    if (suggestion) {
      messages.push({ label: suggestion, level: 'Tip' });
    }
  });

  if (messages.length === 0) {
    messages.push({ label: 'This password looks good, but keep it unique and long.', level: 'Info' });
  }

  messages.forEach(({ label, level }) => {
    const item = document.createElement('div');
    item.className = 'feedback-item';
    item.innerHTML = `<span>${label}</span><span class="feedback-status">${level}</span>`;
    feedbackList.appendChild(item);
  });
}

function setStrengthState(score, result) {
  const strengthText = getStrengthText(score);
  strengthLabel.textContent = strengthText.toUpperCase();
  strengthLabel.style.backgroundColor = 'rgba(148, 163, 184, 0.1)';
  strengthLabel.style.color = getStrengthColor(score);

  const widthPercent = ((score + 1) / 5) * 100;
  strengthBar.style.width = `${widthPercent}%`;
  strengthBar.style.backgroundColor = getStrengthColor(score);

  const crackTime = formatCrackTime(result.crack_times_seconds.offline_slow_hashing_1e4_per_second);
  const attackText = score <= 1 ? 'HACKED in' : score <= 2 ? 'AT RISK in' : 'SECURE for';
  timeLabel.textContent = `${attackText} ${crackTime}`;
}

function simulateHacker(result) {
  clearInterval(simulationTimer);
  simulationIndex = 0;
  simulatorWindow.innerHTML = '<p class="sim-line">Running simulated password guesses...</p>';

  simulationTimer = setInterval(() => {
    if (simulationIndex < simulationGuesses.length) {
      const guess = simulationGuesses[simulationIndex];
      simulatorWindow.innerHTML += `<p class="sim-line">Trying: ${guess}...</p>`;
      simulatorWindow.scrollTop = simulatorWindow.scrollHeight;
      simulationIndex += 1;
    } else {
      const message = result.score <= 1 ? 'MATCH FOUND' : 'NO MATCH YET - keep improving your password';
      simulatorWindow.innerHTML += `<p class="sim-line" style="color: ${result.score <= 1 ? '#ef4444' : '#22c55e'}; font-weight: 700;">${message}</p>`;
      clearInterval(simulationTimer);
    }
  }, 700);
}

function onPasswordChange() {
  const password = passwordInput.value;
  if (!password) {
    strengthLabel.textContent = 'Type a password';
    strengthBar.style.width = '0%';
    strengthBar.style.backgroundColor = '#ef4444';
    timeLabel.textContent = 'Waiting for input';
    feedbackList.innerHTML = '<p>Enter a sample password above to see strength, crack estimate, and improvement tips.</p>';
    simulatorWindow.innerHTML = '<p class="sim-line">Launching password analysis...</p>';
    clearInterval(simulationTimer);
    return;
  }

  if (typeof zxcvbn !== 'function') {
    strengthLabel.textContent = 'Library unavailable';
    timeLabel.textContent = 'Unable to analyze password';
    feedbackList.innerHTML = '<p>Failed to load the password strength engine. Check your network connection.</p>';
    return;
  }

  const result = zxcvbn(password);
  setStrengthState(result.score, result);
  updateFeedback(result);
  simulateHacker(result);
}

passwordInput.addEventListener('input', onPasswordChange);
