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
        this.experimental = this.experimental.bind(this);
    }

    experimental() {

        // Visual Effect on gameInformation TODO
        // TODO Polish this method

        const rollDie = Utils.rollDie();

        console.log(`Roll die value for the user: ${rollDie} `);

        if (rollDie === Constants.PIG_OUT) {

            console.log('Pig Out!');
            this.#referee.gameState.humanScore += 1;
            this.#referee.gameState.pendingPoints = 0;

            this.#referee.gui.updatePlayerScore(this.#referee.gameState.humanScore);
            this.#referee.gui.updatePending(this.#referee.gameState.pendingPoints);

            this.#referee.gui.setMessage(Constants.PIG_OUT_MESSAGE);

            (async () => await new Promise(resolve => setTimeout(resolve, 2000)))();
            this.#referee.gui.setMessage('CPU Turn');

            return;

        } else {

            this.#referee.gameState.pendingPoints += rollDie;
            this.#referee.gui.updatePending(this.#referee.gameState.pendingPoints);
        }


        if(this.#decisionMade === Constants.ROLL_DIE_DECISION) {

            this.#referee.disableHumanInteraction(false);
        }

        this.#referee.gui.rollingDieVideo.removeEventListener('ended', this.experimental);
    }

    rollDie() {

        this.#decisionMade = Constants.ROLL_DIE_DECISION;

        this.#referee.disableHumanInteraction(true);

        this.#referee.gui.rollingDieVideo.addEventListener('ended', this.experimental);

        this.#referee.gui.playRollingDieVideo();
    }

    holdTurn() {

        console.log('User decided hold turn');

        this.#referee.gameState.humanScore += this.#referee.gameState.pendingPoints;
        this.#referee.gameState.pendingPoints = 0;

        this.#referee.gameState.isGameOver = this.#referee.consultTriumph(this.id);

        this.#referee.gui.rollingDieVideo.removeEventListener('ended', this.experimental);

        this.#referee.gui.updatePlayerScore(this.#referee.gameState.humanScore);
        this.#referee.gui.updatePending(this.#referee.gameState.pendingPoints);

        this.#referee.disableHumanInteraction(true);

        if(this.#referee.gameState.isGameOver) {

            this.#referee.gui.setMessage('You win!!! Congratulations!!!');
            this.#referee.endGame(this.id);
            return;
        } else {

            this.#referee.gui.setMessage('Player decided to hold');

            (async () => await new Promise(resolve => setTimeout(resolve, 2000)))();
            this.#referee.gui.setMessage('CPU Turn');
            // invoke computer move method
        }
    }
}
