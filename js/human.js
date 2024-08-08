class Human extends Player {

    #referee;
    #opponent;
    #decisionMade;

    constructor(id, referee, opponent) {

        super(id);
        this.#referee = referee;
        this.#opponent = opponent;
        this.move = this.move.bind(this);
        this.rollDie = this.rollDie.bind(this);
        this.holdTurn = this.holdTurn.bind(this);
        this.playerRollDieAnimationEnd = this.playerRollDieAnimationEnd.bind(this);
    }

    #announce(message) {

        this.#referee.gui.setMessage(message);
    }

	#sleep(ms, withMessage) {

        this.#announce(withMessage);

		return new Promise(resolve => setTimeout(resolve, ms));
	}

    playerRollDieAnimationEnd() {

        // Visual Effect on gameInformation TODO
        // TODO Polish this method

        const rollDie = Utils.rollDie();

        if (rollDie === Constants.PIG_OUT) {

            this.#referee.gameState.humanScore += 1;
            this.#referee.gameState.pendingPoints = 0;

            this.#referee.gui.updatePlayerScore(this.#referee.gameState.humanScore);
            this.#referee.gui.updatePending(this.#referee.gameState.pendingPoints);

            this.#sleep(2000, Constants.PLAYER_PIG_OUT_MESSAGE).then(() => {

                this.#sleep(2000, Constants.COMPUTER_TURN_MESSAGE).then(() => {

                    this.#referee.gui.rollingDieVideo.removeEventListener('ended',
                                                                        this.playerRollDieAnimationEnd);
                    this.#opponent.move();
                });
            });

            return;

        } else {

            this.#referee.gameState.pendingPoints += rollDie;
            this.#referee.gui.updatePending(this.#referee.gameState.pendingPoints);
        }


        if(this.#decisionMade === Constants.ROLL_DIE_DECISION) {

            if(!this.#referee.gameState.isUIEnabled){

                this.#referee.toggleHumanInteraction();
                this.#referee.gameState.isUIEnabled = true;
            }

            this.#announce(Constants.PLAYER_TURN_MESSAGE);
        }

        this.#referee.gui.rollingDieVideo.removeEventListener('ended', this.playerRollDieAnimationEnd);
    }

    rollDie() {

        this.#decisionMade = Constants.ROLL_DIE_DECISION;

        this.#announce(Constants.PLAYER_ROLLING_DIE);

        this.#referee.toggleHumanInteraction();
        this.#referee.gameState.isUIEnabled = false;

        this.#referee.gui.rollingDieVideo.addEventListener('ended', this.playerRollDieAnimationEnd);

        this.#referee.gui.playRollingDieVideo();
    }

    holdTurn() {

        this.#decisionMade = Constants.HOLD_TURN_DECISION;

        this.#referee.gameState.humanScore += this.#referee.gameState.pendingPoints;
        this.#referee.gameState.pendingPoints = 0;

        this.#referee.gameState.isGameOver = this.#referee.consultTriumph(this.id);

        this.#referee.gui.rollingDieVideo.removeEventListener('ended', this.playerRollDieAnimationEnd);

        this.#referee.gui.updatePlayerScore(this.#referee.gameState.humanScore);
        this.#referee.gui.updatePending(this.#referee.gameState.pendingPoints);

        this.#referee.toggleHumanInteraction();
        this.#referee.gameState.isUIEnabled = false;

        if(this.#referee.gameState.isGameOver) {

            this.#referee.endGame(this.id);
            return;
        } else {

            this.#sleep(2000, Constants.PLAYER_HOLD_TURN).then(() => {

                this.#sleep(2000, Constants.COMPUTER_TURN_MESSAGE).then(() => {

                    this.#opponent.move();
                });
            });
        }
    }
}
