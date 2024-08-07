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
            console.log('*** After ***');
            console.log(`Human Score: ${this.#referee.gameState.humanScore}`);
            console.log(`Pending Points: ${this.#referee.gameState.pendingPoints}`);
            this.#referee.gui.updatePlayerScore(this.#referee.gameState.humanScore);
            this.#referee.gui.updatePending(this.#referee.gameState.pendingPoints);

            //this.#sleep(2000).then(() => {

             //   this.#referee.gui.setMessage(Constants.PIG_OUT_MESSAGE);
              //  this.#passTheBall(); // I can't decide on a better name.
//            });

            this.#referee.gui.setMessage(Constants.PIG_OUT_MESSAGE);

            (async () => await new Promise(resolve => setTimeout(resolve, 2000)))();
            this.#referee.gui.setMessage('CPU Turn');

            return;

        } else {

            this.#referee.gameState.pendingPoints += rollDie;
            this.#referee.gui.updatePending(this.#referee.gameState.pendingPoints);
        }

        if (this.#referee.consultTriumph(this.id)) {

            this.#referee.gameState.isGameOver(true);
            this.#referee.gui.rollingDiceVideo.removeEventListener('ended', this.experimental);
            // System.exit() ???
        } 

        if(this.#decisionMade === Constants.ROLL_DIE_DECISION) {

            this.#referee.disableHumanInteraction(false);
        }

        this.#referee.gui.rollingDieVideo.removeEventListener('ended', this.experimental);
    }

    rollDie() {

        console.log('User decided rolling die');

        this.#decisionMade = Constants.ROLL_DIE_DECISION;

        this.#referee.disableHumanInteraction(true);

        this.#referee.gui.rollingDieVideo.addEventListener('ended', this.experimental);

        this.#referee.gui.playRollingDieVideo();
    }

    holdTurn() {

        // some code
        console.log('User decided hold turn');
    }
}
