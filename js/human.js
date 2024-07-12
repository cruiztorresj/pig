class Human extends Player {

	#referee;
	#opponent;

	constructor(id, referee, opponent) {

		super(id);
		this.#referee = referee;
		this.#opponent = opponent;
		this.move = this.move.bind(this);
	}

	move(evt) {

		// const position = this.#referee.board.drawPlayerMove(evt, this.symbol);

		// if(position !== this.#referee.board.positionNotFound) {

			// if(this.#referee.consultTriumph(position, this.symbol)) {

				// this.#referee.disableHumanInteraction(true, this.move);
				// this.#referee.endGame(this.id);
			// } else {

				// this.#referee.currentTurn = this.#opponent.id;
				// this.#referee.informTurn();
				// this.#opponent.move(this.move);
			// }
		// }
	}
}
