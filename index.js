let maxAttempts = 10;
let currentAttempts = 1;
let uniqueDigitSequence = generateUniqueDigitsSequence();
let currentResult = '0B0C';
let inputId = 'combination';
let currentResultId = 'curResult';
let startTime = -1;
let endTime = -1;

function startGame() {
  let startButton = document.getElementById('startBtn');
  startButton.disabled = true;
  startButton.hidden = true;
  showTimer();
  addNextAttempt();
}

function showTimer() {}

function generateUniqueDigitsSequence() {
  let uniqueDigitSequence = '';

  for (let i = 0; i < 3; i++) {
    let uniqueDigit = generateUniqueDigit(uniqueDigitSequence);
    uniqueDigitSequence = uniqueDigitSequence + uniqueDigit;
  }

  console.log('Generated sequence is: ' + uniqueDigitSequence);
  return uniqueDigitSequence;
}

function generateUniqueDigit(uniqueDigitSequence) {
  let num = Math.floor(Math.random() * 10);

  while (uniqueDigitSequence.includes(num)) {
    num = Math.floor(Math.random() * 10);
  }

  return num;
}

function checkCombination() {
  if (startTime == -1) {
    startTime = Date.now();
  }
  console.log('Input field id: ' + inputId + currentAttempts);
  let inputCombination = document.getElementById(
    inputId + currentAttempts
  ).value;

  if (
    compareInputWithActualCombination(inputCombination, uniqueDigitSequence)
  ) {
    endTime = Date.now();
    document.getElementById('curResult' + currentAttempts).innerText =
      ' ' + currentResult;
    document.getElementById('greeting').innerText =
      'You won, the secret combination was ' +
      uniqueDigitSequence +
      '!\n' +
      'Total attempts: ' +
      currentAttempts +
      '\n' +
      'Total time: ' +
      (endTime - startTime) / 1000 +
      's.';
    document.getElementById('greeting').focus();
  } else {
    if (currentAttempts == maxAttempts) {
      document.getElementById('greeting').innerText =
        'Goog luck next time, the secret combination was: ' +
        uniqueDigitSequence;
    } else {
      document.getElementById('curResult' + currentAttempts).innerText =
        ' ' + currentResult;
      currentAttempts++;
      addNextAttempt();
    }
  }
}

function compareInputWithActualCombination(userGuess, generatedCombination) {
  let bulls = 0;
  let cows = 0;

  for (let i = 0; i < userGuess.length; i++) {
    if (userGuess[i] == generatedCombination[i]) {
      bulls++;
    } else if (generatedCombination.includes(userGuess[i])) {
      cows++;
    }
  }
  currentResult = bulls + 'B ' + cows + 'C';

  return bulls == 3;
}

function createNextAttemptLabel() {
  const label = document.createElement('label');
  label.setAttribute('for', inputId + currentAttempts);
  label.innerText = currentAttempts + '. ';
  return label;
}

function createNextAttemptInputField() {
  const input = document.createElement('input');
  input.setAttribute('class', 'square-input');
  input.setAttribute('type', 'text');
  input.setAttribute('id', inputId + currentAttempts);
  return input;
}

function createNextAttemptSubmitButton() {
  const button = document.createElement('button');
  button.textContent = 'Submit';
  button.style.display = 'none';
  button.onclick = checkCombination;
  return button;
}

function addNextAttempt() {
  const attemptContainer = document.createElement('div');

  attemptContainer.appendChild(createNextAttemptLabel());

  const nextAttemptInputField = createNextAttemptInputField();
  attemptContainer.appendChild(nextAttemptInputField);

  const nextAttemptSubmitButton = createNextAttemptSubmitButton();
  attemptContainer.appendChild(nextAttemptSubmitButton);

  const currentResult = document.createElement('span');
  currentResult.setAttribute('id', currentResultId + currentAttempts);
  attemptContainer.appendChild(currentResult);

  const attemptsContainer = document.getElementById('attemptsContainer');

  attemptsContainer.appendChild(attemptContainer);

  nextAttemptInputField.focus();

  nextAttemptInputField.addEventListener('keypress', function (event) {
    // If the user presses the "Enter" key on the keyboard
    if (event.key === 'Enter') {
      // Cancel the default action, if needed
      event.preventDefault();
      // Trigger the button element with a click
      nextAttemptSubmitButton.click();
      nextAttemptInputField.disabled = true;
    }
  });
}
