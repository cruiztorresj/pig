class Gui {

	#playButton;
	#rollButton;
	#holdButton;
	#information;
	#playerScore;
	#cpuScore;
	#pending;
	#rollingDiceVideo;
	#gameInformation;

	constructor() {

		this.#rollingDiceVideo = document.getElementById('rollingdicevideo');
		this.#playButton = document.getElementById('play');
		this.#rollButton = document.getElementById('roll');
		this.#holdButton = document.getElementById('hold');
		this.#information = document.getElementById('info');
		this.#playerScore = document.getElementById('uscore');
		this.#cpuScore = document.getElementById('mescore');
		this.#pending = document.getElementById('pending');
		this.#gameInformation = document.getElementById('info');
		
		this.animateDice = this.animateDice.bind(this);
		this.#rollButton.addEventListener('click', this.animateDice);
	}
	
	get rollingDiceVideo() {
		
		return this.#rollingDiceVideo;
	}

	get playButton() {

		return this.#playButton;
	}

	set playButton(playButton) {

		this.#playButton = playButton;
	}
	
	get rollButton() {

		return this.#rollButton;
	}

	set rollButton(rollButton) {

		this.#rollButton = rollButton;
	}
	
	get holdButton() {

		return this.#holdButton;
	}

	set holdButton(holdButton) {

		this.#holdButton = holdButton;
	}
	
	get playerScore() {

		return this.#playerScore;
	}

	set playerScore(playerScore) {

		this.#playerScore = playerScore;
	}
	
	get cpuScore() {

		return this.#cpuScore;
	}

	set cpuScore(cpuScore) {

		this.#cpuScore = cpuScore;
	}

	get information() {

		return this.#information;
	}

	set information(information) {

		this.#information = information;
	}
	
	get pending() {

		return this.#pending;
	}

	set pending(pending) {

		this.#pending = pending;
	}

	disablePlayButton() {

		this.#playButton.setAttribute('disabled', '');
	}

	enablePlayButton() {

		this.#playButton.removeAttribute('disabled');
	}

	setTextForPlayButton(text) {

		this.#playButton.innerText = text;
	}
	
	clean() {
		
		// clean scores information.
		// take a look at reset information.
	}
	
	setMessage(message) {

		this.#gameInformation.innerText = message;
	}
	
	toggleUserInteraction(isEnabled, userInteraction) {
		
		if(isEnabled) {
			
			this.#rollButton.toggleAttribute('disabled');
			this.#holdButton.toggleAttribute('disabled');
			this.#rollButton.removeEventListener('click', userInteraction);
			this.#holdButton.removeEventListener('click', userInteraction);
		} else {
			
			this.#rollButton.toggleAttribute('disabled');
			this.#holdButton.toggleAttribute('disabled');
			this.#rollButton.addEventListener('click', userInteraction);
			this.#holdButton.removeEventListener('click', userInteraction);
		}
	}

	#resetInformation() {

		//this.#setMessage('');
		//this.#board.gui.information.className = '';
	}
	
	//roll.addEventListener('click', rolldice);

	animateDice(evt) {
		
		if (this.#rollingDiceVideo.paused) {
			
			this.playRollingDiceVideo();
		} else {
			
			this.#rollingDiceVideo.pause();
		}
	}

	async playRollingDiceVideo() {
		
		try {
			
			await this.#rollingDiceVideo.play();
		} catch (err) {
			alert(err);
		}
	}
}