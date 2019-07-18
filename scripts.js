const msg = new SpeechSynthesisUtterance(); // what is the person going to say, how do they say it, what voice are they going to say it in, etc.
  let voices = []; //this is where our voices get dumped into
  const voicesDropdown = document.querySelector('[name="voice"]'); //who's voice 
  const options = document.querySelectorAll('[type="range"], [name="text"]');
  const speakButton = document.querySelector('#speak'); //start
  const stopButton = document.querySelector('#stop'); //stop
  msg.text = document.querySelector('[name="text"]').value;

  function populateVoices() {
    voices = this.getVoices();
    voicesDropdown.innerHTML = voices
      .filter(voice => voice.lang.includes('en'))
      .map(voice => `<option value="${voice.name}">${voice.name} (${voice.lang})</option>`)
      .join('');
  }

  //when we change the voice from the dropdown
  function setVoice() {
    msg.voice = voices.find(voice => voice.name === this.value); //loops over every single one of the voices in the array and it's gonna find the one where its name is the same as the option that's currently selected
    toggle();
  }

 //evertime we change one of voices, it restarts
 function toggle(startOver = true) {
    speechSynthesis.cancel();
    if (startOver) {
      speechSynthesis.speak(msg);
    }
  }

  function setOption() {
      msg[this.name] = this.value;
      toggle();
  }

  speechSynthesis.addEventListener('voiceschanged', populateVoices);
  voicesDropdown.addEventListener('change', setVoice);
  options.forEach(option => option.addEventListener('change', setOption));
  speakButton.addEventListener('click', toggle);
  stopButton.addEventListener('click', () => toggle(false));