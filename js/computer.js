class Computer extends Player {

	#referee;
	#opponentId;

	constructor(id, referee, opponentId) {

		super(id);
		this.#referee = referee;
		this.#opponentId = opponentId;
		this.move = this.move.bind(this);
	}

	move(myOpponentMove) {

		// this.#referee.disableHumanInteraction(true, myOpponentMove);

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
