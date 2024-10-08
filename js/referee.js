class Referee {

	#currentTurn;
	#gui;
	#humanId;
	#computerId;
	#gameState;
    #pigTheme;

	constructor(gui, humanId, computerId, gameState, pigTheme) {

		this.#gui = gui;
		this.#humanId = humanId;
		this.#computerId = computerId;
		this.#gameState = gameState;
        this.#pigTheme = pigTheme;
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

    playBGM() {

        this.#pigTheme.setAttribute('loop', '');
        this.#pigTheme.volume = 0.4;
        this.#pigTheme.play();
    }
    

	decideFirstTurn() {

		return Utils.getRandom(2);
	}

	informTurn() {

		switch(this.#currentTurn) {
        	case 0:
            	this.#gui.setMessage(Constants.COMPUTER_TURN_MESSAGE);
            	break;
        	case 1:
            	this.#gui.setMessage(Constants.PLAYER_TURN_MESSAGE);
            	break;
        	default:
            	this.#gui.setMessage('Something went wrong, sorry.');
            	break;
    	}
	}

	resetGame() {

		this.#gui.clean();
        this.#gameState.reset();
	}

	consultTriumph(playerId) {

        if (playerId == this.#computerId) {

            return this.#gameState.computerScore >= this.#gameState.goal;
        } else {
            
            return this.#gameState.humanScore >= this.#gameState.goal;
        }
	}

	endGame(winner /* = this.#invalidState */) {

        this.#pigTheme.pause();
        this.#pigTheme.load();

		this.gui.gameInformation.className = 'gameResult';

		 switch(winner) {
            case this.#computerId:

                this.#gui.setMessage('Computer Wins!');
				break;
			case this.#humanId:
				
                this.#gui.setMessage('You win!!! Congratulations!!!');
				break;
			default:
			
                this.#gui.setMessage('Drawn game');
        }

		this.#gui.enablePlayButton();
		this.#gui.setTextForPlayButton('Play again!');
	}

	toggleHumanInteraction() {

		this.#gui.toggleUserInteraction();
	}

	disablePlay() {

		this.#gui.disablePlayButton();
	}
}
