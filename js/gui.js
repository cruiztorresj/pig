class Gui {

	#playButton;
	#rollButton;
	#holdButton;
	#playerScore;
	#cpuScore;
	#pending;
	#rollingDieVideo;
	#gameInformation;

	constructor() {

		this.#rollingDieVideo = document.getElementById('rollingdicevideo');
		this.#playButton = document.getElementById('play');
		this.#rollButton = document.getElementById('roll');
		this.#holdButton = document.getElementById('hold');
		this.#playerScore = document.getElementById('uscore');
		this.#cpuScore = document.getElementById('mescore');
		this.#pending = document.getElementById('pending');
		this.#gameInformation = document.getElementById('info');
		
		this.animateDie = this.animateDie.bind(this);
	}
	
	get rollingDieVideo() {
		
		return this.#rollingDieVideo;
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

	get gameInformation() {

		return this.#gameInformation;
	}

	set gameInformation(gameInformation) {

		this.#gameInformation = gameInformation;
	}
	
	get pending() {

		return this.#pending;
	}

	set pending(pending) {

		this.#pending = pending;
	}

	disablePlayButton() {
        
        this.#playButton.classList.remove('invite');
		this.#playButton.setAttribute('disabled', '');
	}

	enablePlayButton() {

        this.#playButton.classList.add('invite');
		this.#playButton.removeAttribute('disabled');
	}

	setTextForPlayButton(text) {

		this.#playButton.innerText = text;
	}
	
	clean() {
		
        this.updateCPUScore('0');
        this.updatePlayerScore('0');
        this.updatePending('0');
        this.updateGameInformation('');
        this.gameInformation.className = '';
	}

    updateCPUScore(cpuScore) {

        this.#cpuScore.innerText = cpuScore;
    }


    updateGameInformation(gameInformation) {

        this.#gameInformation.innerText = gameInformation;
    }
	
    updatePlayerScore(playerScore) {

        this.#playerScore.innerText = playerScore;
    }

    updatePending(pendingInformation) {

        this.#pending.innerText = pendingInformation;
    }

	setMessage(message) {

		this.#gameInformation.innerText = message;
	}
	
	toggleUserInteraction() {
		
        this.#rollButton.toggleAttribute('disabled');
        this.#holdButton.toggleAttribute('disabled');
	}

	animateDie() {
		
		if (this.#rollingDieVideo.paused) {
			
			this.playRollingDieVideo();
		} else {
			
			this.#rollingDieVideo.pause();
		}
	}

	async playRollingDieVideo() {
		
		try {
			
			await this.#rollingDieVideo.play();
		} catch (err) {
			alert(err);
		}
	}
}
