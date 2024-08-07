class Referee {

	#currentTurn;
	#gui;
	#humanId;
	#computerId;
	#gameState

	constructor(gui, humanId, computerId, gameState) {

		this.#gui = gui;
		this.#humanId = humanId;
		this.#computerId = computerId;
		this.#gameState = gameState;
	}

    get gameState () {

        return this.#gameState;
    }

    set gameState (gameState) {

        this.#gameState = gameState;
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

		switch(this.#currentTurn) {
        	case 0:
            	this.#gui.setMessage('CPU turn');
            	break;
        	case 1:
            	this.#gui.setMessage('Your turn!');
            	break;
        	default:
            	this.#gui.setMessage('Something went wrong, sorry.');
            	break;
    	}
	}

	resetGame() {

		this.#gui.clean();
	}

	consultTriumph(playerId) {

        if (playerId == this.#computerId) {

            return this.#gameState.computerScore >= this.#gameState.goal;
        } else {
            
            return this.#gameState.humanScore >= this.#gameState.goal;
        }
	}

	endGame(winner /* = this.#invalidState */) {

		// this.#board.gui.information.className = 'gameResult';

		 switch(winner) {
            case this.#computerId:

                this.#gui.setMessage('Computer Wins!');
				break;
			case this.#humanId:
				
                this.#gui.setMessage('You win! Yay!');
				break;
			default:
			
                this.#gui.setMessage('Drawn game');
        }

        this.resetGame();
		this.#gui.enablePlayButton();
		this.#gui.setTextForPlayButton('Play again!');
	}

	disableHumanInteraction(isEnabled) {

		this.#gui.toggleUserInteraction(isEnabled);
	}

	disablePlay() {

		this.#gui.disablePlayButton();
	}
}
