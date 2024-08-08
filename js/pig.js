const COMPUTER_ID = 0;
const HUMAN_ID = 1;

const pigButtonSound = new Audio('sounds/pigbutton.mp3');
const pigTheme = new Audio('sounds/PigTheme.mp3');

const gui = new Gui();
const pigState = new State(50);
const referee = new Referee(gui, HUMAN_ID, COMPUTER_ID, pigState, pigTheme);
const computer = new Computer(COMPUTER_ID, referee, HUMAN_ID);
const human = new Human(HUMAN_ID, referee, computer, pigButtonSound);
const match = new Match(referee, computer, human);
