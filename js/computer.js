class Computer extends Player {

	#referee;
	#opponentId;

	constructor(id, referee, opponentId) {

		super(id);
		this.#referee = referee;
		this.#opponentId = opponentId;
		this.move = this.move.bind(this);
	}
	
	#sleep(ms) {
		
		const decision = Utils.getRandom(2);

		if (decision === Constants.HOLD_DECISION) {

            this.#referee.gameState.computerScore += this.#referee.gameState.pendingPoints;
            this.#referee.gameState.pendingPoints = 0;
		} else {

            console.log(`Rolling die: ${Utils.rollDie()}`);
        }
		
		return new Promise(resolve => setTimeout(resolve, ms));
	}

	move(myOpponentMove) {
		
		this.#referee.disableHumanInteraction(true, myOpponentMove);
		
		this.#referee.gui.playRollingDiceVideo();
		
		this.#sleep(2000).then(() => {

            if (this.#referee.consultTriumph(this.id)) {

                this.#referee.endGame(this.id);
            } else {
                
                this.#referee.currentTurn = this.#opponentId;
                this.#referee.informTurn();
                this.#referee.disableHumanInteraction(false, myOpponentMove);
            }
		});
		
		
		

		// if(this.#referee.board.isMovingPossible()) {

			// let position = this.#referee.board.findWinningPosition();

			// if(position === this.#referee.board.positionNotFound) {

				// position = this.#referee.board.findAdjacentTo(this.symbol);

				// if(position === this.#referee.board.positionNotFound) {

					// position = this.#referee.board.findAvailablePlace();
				// }
			// }

			// this.#referee.board.drawComputerMove(position, this.symbol);

			// if(this.#referee.consultTriumph(position, this.symbol)) {

				// this.#referee.disableHumanInteraction(true, myOpponentMove);
				// this.#referee.endGame(this.id);
				// return;
			// } else {

				// if(this.#referee.board.isMovingPossible()) {

					// this.#referee.currentTurn = this.#opponentId;
					// this.#referee.informTurn();
				// } else {

					// this.#referee.disableHumanInteraction(true, myOpponentMove);
					// this.#referee.endGame();
					// return;
				// }
			// }
		// } else {

			// this.#referee.disableHumanInteraction(true, myOpponentMove);
			// this.#referee.endGame();
			// return;
		// }

		// this.#referee.disableHumanInteraction(false, myOpponentMove);
	}
}
