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
	}

	play() {

		this.#referee.disablePlay();
		this.#referee.resetGame();
		this.#referee.currentTurn = this.#referee.decideFirstTurn();
		this.#referee.currentTurn = 0;
		this.#referee.informTurn();
		
		this.#referee.gui.toggleUserInteraction(false, this.#human.move);

		if(this.#referee.currentTurn === this.#computer.id) {

			this.#computer.move();
		}
	}
}
