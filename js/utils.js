class Utils {

	static getRandom(upperLimit) {

		return Math.floor(Math.random() * upperLimit);
	}

    static rollDie() {

        return Utils.getRandom(Constants.DIE_SIDES) + 1;
    }
}
