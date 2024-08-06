class Computer extends Player {

	#referee;
	#opponentId;
    #opponentMove;

	constructor(id, referee, opponentId) {

		super(id);
		this.#referee = referee;
		this.#opponentId = opponentId;
		this.move = this.move.bind(this);
		this.experimental = this.experimental.bind(this);
	}
	
	#sleep(ms) {

        this.#announce('Computer decided to hold');

		return new Promise(resolve => setTimeout(resolve, ms));
	}

    experimental() {

        // Visual Effect on gameInformation TODO

        const rollDie = Utils.rollDie();

        console.log(`Roll die value: ${rollDie} `);

        if (rollDie === Constants.PIG_OUT) {

            this.#referee.gameState.computerScore += 1;
            this.#referee.gameState.pendingPoints = 0;

        } else {

            this.#referee.gameState.pendingPoints += rollDie;
        }

       this.#referee.gui.updatePending(this.#referee.gameState.pendingPoints);

        if (this.#referee.consultTriumph(this.id)) {

            this.#referee.gameState.isGameOver(true);
            // System.exit() ???
        } else {

            if (this.#makeDecision()  === Constants.ROLL_DIE_DECISION) {
                
                console.log('Consider visual effect');
                this.#announce('Computer rolling die');
                this.#referee.gui.playRollingDiceVideo();
            } else {

                this.#referee.gameState.computerScore += this.#referee.gameState.pendingPoints;
                this.#referee.gui.updateCPUScore(this.#referee.gameState.computerScore);
                this.#referee.gui.updatePending(this.#referee.gameState.pendingPoints);
                this.#referee.gameState.pendingPoints = 0;
                this.#referee.gui.updatePending(this.#referee.gameState.pendingPoints);

                this.#sleep(2000).then(() => {

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
            this.#referee.disableHumanInteraction(false, this.#opponentMove);
        }

    }

    #makeDecision() {

        return Utils.getRandom(Constants.IN_GAME_DECISIONS);
    }

	move(myOpponentMove) {

        this.#opponentMove = myOpponentMove;
		
		this.#referee.disableHumanInteraction(true, this.#opponentMove);

        this.#referee.gui.rollingDiceVideo.addEventListener('ended', this.experimental);

        if (this.#makeDecision() === Constants.ROLL_DIE_DECISION) {
            
            this.#announce('Computer rolling die');
            this.#referee.gui.playRollingDiceVideo();
        } else {

            if(this.#referee.gameState.isGameOver) {

                this.#referee.endGame(this.id);
                this.#referee.gui.rollingDiceVideo.removeEventListener('ended', this.experimental);
                return;
            } else {

                this.#referee.gameState.computerScore += this.#referee.gameState.pendingPoints;
                this.#referee.gameState.pendingPoints = 0;

                this.#sleep(2000).then(() => {

                    this.#passTheBall(); // I can't decide on a better name.
                });
            }
        }
	}
}
