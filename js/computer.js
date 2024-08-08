class Computer extends Player {

	#referee;
	#opponentId;

	constructor(id, referee, opponentId) {

		super(id);
		this.#referee = referee;
		this.#opponentId = opponentId;
		this.move = this.move.bind(this);
		this.computerRollDieAnimationEnd = this.computerRollDieAnimationEnd.bind(this);
	}
	
	#sleep(ms, withMessage) {

        this.#announce(withMessage);

		return new Promise(resolve => setTimeout(resolve, ms));
	}

    computerRollDieAnimationEnd() {

        // TODO Effect on gameInformation TODO
        // TODO Polish this method

        const rollDie = Utils.rollDie();

        if (rollDie === Constants.PIG_OUT) {

            this.#referee.gameState.computerScore += 1;
            this.#referee.gameState.pendingPoints = 0;

            this.#referee.gui.updateCPUScore(this.#referee.gameState.computerScore);
            this.#referee.gui.updatePending(this.#referee.gameState.pendingPoints);

            this.#sleep(2000, Constants.COMPUTER_PIG_OUT_MESSAGE).then(() => {

                this.#sleep(500, Constants.PLAYER_TURN_MESSAGE).then(() => {

                    this.#referee.gui.rollingDieVideo.removeEventListener('ended',
                                                                        this.computerRollDieAnimationEnd);
                    this.#passTheBall();
                });
            });
            return;

        } else {

            this.#referee.gameState.pendingPoints += rollDie;
        }

        this.#referee.gui.updatePending(this.#referee.gameState.pendingPoints);

        if (this.#referee.gameState.pendingPoints >= this.#referee.gameState.goal) {

            this.#referee.gameState.isGameOver = true;
            this.#referee.endGame(this.id);
            this.#referee.gui.rollingDieVideo.removeEventListener('ended', this.computerRollDieAnimationEnd);
            return;
        } else {

            if (this.#makeDecision() === Constants.ROLL_DIE_DECISION) {
                
                // TODO Consider visual effect
                this.#announce(Constants.COMPUTER_ROLLING_DIE);
                this.#referee.gui.playRollingDieVideo();
            } else {

                this.#referee.gameState.computerScore += this.#referee.gameState.pendingPoints;
                this.#referee.gui.updateCPUScore(this.#referee.gameState.computerScore);
                this.#referee.gui.updatePending(this.#referee.gameState.pendingPoints);
                this.#referee.gameState.pendingPoints = 0;
                this.#referee.gui.updatePending(this.#referee.gameState.pendingPoints);

                this.#sleep(2000, Constants.COMPUTER_HOLD_TURN).then(() => {

                    this.#passTheBall(); // I can't decide on a better name.
                });
            }

        }
    }

    #announce(message) {

        this.#referee.gui.setMessage(message);
    }

    #passTheBall() {

        if (this.#referee.consultTriumph(this.id)) {

            this.#referee.endGame(this.id);
        } else {
            
            this.#referee.currentTurn = this.#opponentId;
            this.#referee.informTurn();
            this.#referee.toggleHumanInteraction();
        }

        this.#referee.gui.rollingDieVideo.removeEventListener('ended', this.computerRollDieAnimationEnd);
    }

    #makeDecision() {

        return Utils.getRandom(Constants.IN_GAME_DECISIONS);
    }

	move() {

        if(this.#referee.gameState.isUIEnabled) {

            this.#referee.toggleHumanInteraction();
            this.#referee.gameState.isUIEnabled = false;
        }

        this.#referee.gui.rollingDieVideo.addEventListener('ended', this.computerRollDieAnimationEnd);

        if (this.#makeDecision() === Constants.ROLL_DIE_DECISION) {
            
            this.#announce(Constants.COMPUTER_ROLLING_DIE);
            this.#referee.gui.playRollingDieVideo();
        } else {

            if(this.#referee.gameState.isGameOver) {

                this.#referee.endGame(this.id);
                this.#referee.gui.rollingDieVideo.removeEventListener('ended',
                                                                    this.computerRollDieAnimationEnd);
                return;
            } else {

                this.#referee.gameState.computerScore += this.#referee.gameState.pendingPoints;
                this.#referee.gameState.pendingPoints = 0;

                this.#sleep(2000, Constants.COMPUTER_HOLD_TURN).then(() => {

                    this.#passTheBall();
                });
            }
        }
	}
}
