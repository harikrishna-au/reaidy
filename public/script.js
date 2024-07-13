// script.js
const inputText = document.getElementById('textInput');
const spokenText = document.getElementById('spokenText');
const apikey = '8745571a84634dd49882c3bbefec3c8c'; // Replace with your actual VoiceRSS API key

let currentText = '';
let timerId = null;
let clearTimerId = null;

inputText.addEventListener('input', () => {
  clearTimeout(timerId);
  currentText = inputText.value;
  timerId = setTimeout(speakText, 2000); // 2-second delay
});

function speakText() {
  const words = currentText.split(' ');
  let spokenWords = '';
  let sentenceComplete = false;

  for (let i = 0; i < words.length; i++) {
    if (words[i].endsWith('.') || words[i].endsWith('?') || words[i].endsWith('!')) {
      spokenWords += words[i] + ' ';
      sentenceComplete = true;
      break; // Stop after complete sentence
    } else {
      spokenWords += words[i] + ' ';
    }
  }

  if (spokenWords.trim() !== '') {
    const url = `https://api.voicerss.org/?key=${apikey}&src=${encodeURIComponent(spokenWords)}&hl=en-us&c=MP3&f=44khz_16bit_stereo`;
    const audio = new Audio(url);
    audio.play();

    // Add to the spokenText paragraph
    const newParagraph = document.createElement('p');
    newParagraph.textContent = spokenWords;
    spokenText.appendChild(newParagraph);

    // Reset currentText after speaking
    currentText = currentText.slice(spokenWords.length);
    // Reset spokenWords
    spokenWords = '';
    sentenceComplete = false;

    // Clear the input text after 5 seconds
    clearTimeout(clearTimerId);
    clearTimerId = setTimeout(() => {
      inputText.value = '';
    }, 5000);
  }
}

// Example of automatically speaking after 10 seconds
setTimeout(() => {
  speakText(); 
}, 10000);
