class Gui {

	#playButton;
	#rollButton;
	#holdButton;
	#information;
	#playerScore;
	#cpuScore;
	#pending;
	#rollingDiceVideo;

	constructor() {

		this.#rollingDiceVideo = document.getElementById('rollingdicevideo');
		this.#playButton = document.getElementById('play');
		this.#rollButton = document.getElementById('roll');
		this.#holdButton = document.getElementById('hold');
		this.#information = document.getElementById('info');
		this.#playerScore = document.getElementById('uscore');
		this.#cpuScore = document.getElementById('mescore');
		this.#pending = document.getElementById('pending');
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
}
