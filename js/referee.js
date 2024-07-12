class Referee {

	#currentTurn;
	#gui;
	#humanId;
	#computerId;

	constructor(gui, humanId, computerId) {

		this.#gui = gui;
		this.#humanId = humanId;
		this.#computerId = computerId;
	}

	get currentTurn() {

		return this.#currentTurn;
	}

	set currentTurn(turn) {

		this.#currentTurn = turn;
	}

	get gui() {

		return this.#gui;
	}

	set gui(gui) {

		this.#gui = gui;
	}

	decideFirstTurn() {

		return Utils.getRandom(2);
	}

	informTurn() {

		// switch(this.#currentTurn) {
        	// case 0:
            	// this.#setMessage('CPU turn');
            	// break;
        	// case 1:
            	// this.#setMessage('Your turn!');
            	// break;
        	// default:
            	// this.#setMessage('Something went wrong, sorry.');
            	// break;
    	// }
	}

	resetGame() {

		// this.#board.resetBoard();
		// this.#resetInformation();
	}

	consultTriumph(position, symbol) {

		//return this.#board.isWinner(position, symbol);
	}

	endGame(winner/* = this.#invalidState */) {

		// this.#board.gui.information.className = 'gameResult';

		// switch(winner) {
			// case this.#computerId:
				// this.#setMessage('CPU Wins!');
				// break;
			// case this.#humanId:
				// this.#setMessage('You win! Yay!');
				// break;
			// default:
				// this.#setMessage('Drawn game');
		// }

		// this.#board.gui.enablePlayButton();
		// this.#board.gui.setTextForPlayButton('Play again!');
		// this.#board.restartTicTacToe();
	}

	disableHumanInteraction(isEnabled, interaction) {

		//this.#board.toggleBoard(isEnabled, interaction);
	}

	disablePlay() {

		//this.#board.gui.disablePlayButton();
	}

	#setMessage(message) {

		//this.#board.gui.information.innerText = message;
	}

	#resetInformation() {

		//this.#setMessage('');
		//this.#board.gui.information.className = '';
	}
}
