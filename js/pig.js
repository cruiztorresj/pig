roll.addEventListener('click', rolldice);

function rolldice(evt) {
	
	if (rollingdicevideo.paused) {
		
		playRollingDiceVideo();
	} else {
		
		rollingdicevideo.pause();
	}
}

async function playRollingDiceVideo() {
	
	try {
		
		await rollingdicevideo.play();
	} catch (err) {
		alert(err);
	}
}

const COMPUTER_ID = 0;
const HUMAN_ID = 1;

const gui = new Gui();
const referee = new Referee(gui, HUMAN_ID, COMPUTER_ID);
const computer = new Computer(COMPUTER_ID, referee, HUMAN_ID);
const human = new Human(HUMAN_ID, referee, computer);
const match = new Match(referee, computer, human);
