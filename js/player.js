class Player {

	#id;
	
	constructor(id) {

		this.#id = id;
	}

	get id() {

		return this.#id;
	}

	set id(id) {

		this.#id = id;
	}

	move() {
		const message = `I do not know how to move.
		Why don't you just create Human or Computer Objects instead.
		Even better, do some research on Abstract classes and implement
		such feature over this class.`

		return message;
	}
}