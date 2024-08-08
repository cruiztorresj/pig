class State {
	
	#computerScore;
	#humanScore;
	#pendingPoints;
	#goal;
    #isGameOver;
    #isUIEnabled;
	
	constructor(goal) {
		
		this.#computerScore = 0;
		this.#humanScore = 0;
		this.#pendingPoints = 0;
		this.#goal = goal;
        this.#isGameOver = false;
        this.#isUIEnabled = false;
	}

    reset() {

		this.#computerScore = 0;
		this.#humanScore = 0;
		this.#pendingPoints = 0;
        this.#isGameOver = false;
        this.#isUIEnabled = false;
    }

    get isUIEnabled() {

        return this.#isUIEnabled;
    }

    set isUIEnabled(isUIEnabled) {

        this.#isUIEnabled = isUIEnabled;
    }

    get isGameOver() {

        return this.#isGameOver;
    }

    set isGameOver(isGameOver) {

        this.#isGameOver = isGameOver;
    }
	
	get computerScore() {
		
		return this.#computerScore;
	}
	
	set computerScore(score) {
		
		this.#computerScore = score;
	}
	
	get humanScore() {
		
		return this.#humanScore;
	}	
	
	set humanScore(score) {
		
		this.#humanScore = score;
	}
	
	get goal() {
		
		return this.#goal;
	}
	
	set goal(goal) {
		
		this.#goal = goal;
	}
	
	get pendingPoints() {
		
		return this.#pendingPoints;
	}
	
	set pendingPoints(pendingPoints) {
		
		this.#pendingPoints = pendingPoints;
	}
}
