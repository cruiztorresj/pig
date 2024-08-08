class Match {

	#computer;
	#human;
	#referee;
	
	constructor(referee, computer, human) {

		this.#referee = referee;
		this.#computer = computer;
		this.#human = human;
		this.play = this.play.bind(this);
		this.#registerEvent();
	}

	#registerEvent() {
		
		this.#referee.gui.playButton.addEventListener('click', this.play);
		this.#referee.gui.rollButton.addEventListener('click', this.#human.rollDie);
		this.#referee.gui.holdButton.addEventListener('click', this.#human.holdTurn);
	}

	play() {

		this.#referee.disablePlay();
		this.#referee.resetGame();
        this.#referee.playBGM();
		this.#referee.currentTurn = this.#referee.decideFirstTurn();
		this.#referee.informTurn();
		
		this.#referee.gui.toggleUserInteraction();
        this.#referee.gameState.isUIEnabled = true;

		if(this.#referee.currentTurn === this.#computer.id) {

			this.#computer.move();
		}
	}
}
