class Computer extends Player {

	#referee;
	#opponentId;

	constructor(id, referee, opponentId) {

		super(id);
		this.#referee = referee;
		this.#opponentId = opponentId;
		this.move = this.move.bind(this);
		this.experimental = this.experimental.bind(this);
	}
	
	#sleep(ms, withMessage) {

        this.#announce(withMessage);

		return new Promise(resolve => setTimeout(resolve, ms));
	}

    experimental() {

        // Visual Effect on gameInformation TODO
        // TODO Polish this method

        const rollDie = Utils.rollDie();

        console.log(`Roll die value: ${rollDie} `);

        if (rollDie === Constants.PIG_OUT) {

            this.#referee.gameState.computerScore += 1;
            this.#referee.gameState.pendingPoints = 0;

            this.#referee.gui.updateCPUScore(this.#referee.gameState.computerScore);
            this.#referee.gui.updatePending(this.#referee.gameState.pendingPoints);

            this.#sleep(2000, Constants.COMPUTER_PIG_OUT_MESSAGE).then(() => {

                this.#passTheBall(); // I can't decide on a better name.
            });

            return;

        } else {

            this.#referee.gameState.pendingPoints += rollDie;
        }

        this.#referee.gui.updatePending(this.#referee.gameState.pendingPoints);

        if (this.#referee.gameState.pendingPoints >= this.#referee.gameState.goal) {

            this.#referee.gameState.isGameOver = true;
            this.#referee.endGame(this.id);
            this.#referee.gui.rollingDieVideo.removeEventListener('ended', this.experimental);
            return;
        } else {

            if (this.#makeDecision() === Constants.ROLL_DIE_DECISION) {
                
                // console.log('Consider visual effect');
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
                console.log('Passing the ball to the human');
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

        this.#referee.gui.rollingDieVideo.removeEventListener('ended', this.experimental);
    }

    #makeDecision() {

        return Utils.getRandom(Constants.IN_GAME_DECISIONS);
    }

	move() {

        if(this.#referee.gameState.isUIEnabled) {

            this.#referee.toggleHumanInteraction();
            this.#referee.gameState.isUIEnabled = false;
        }

        this.#referee.gui.rollingDieVideo.addEventListener('ended', this.experimental);

        if (this.#makeDecision() === Constants.ROLL_DIE_DECISION) {
            
            this.#announce(Constants.COMPUTER_ROLLING_DIE);
            this.#referee.gui.playRollingDieVideo();
        } else {

            if(this.#referee.gameState.isGameOver) {

                this.#referee.endGame(this.id);
                this.#referee.gui.rollingDieVideo.removeEventListener('ended', this.experimental);
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
