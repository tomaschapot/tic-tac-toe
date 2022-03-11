//DOM
const $playerx = document.querySelector("#X");
const $playero = document.querySelector("#O");
const $boxes = document.querySelectorAll(".square");
const $box1 = document.querySelector("#position-1");
const $box2 = document.querySelector("#position-2");
const $box3 = document.querySelector("#position-3");
const $box4 = document.querySelector("#position-4");
const $box5 = document.querySelector("#position-5");
const $box6 = document.querySelector("#position-6");
const $box7 = document.querySelector("#position-7");
const $box8 = document.querySelector("#position-8");
const $box9 = document.querySelector("#position-9");
const $resetButton = document.querySelector(".reset");
let player = "";
//Event Listeners

$resetButton.addEventListener("click", () => {
	Gameboard.reset();
	DisplayController.displaySelection(Gameboard.board);
});

$playerx.addEventListener("click", () => {
	player = CreatePlayer("X", "rgb(58,58,58)");
});
$playero.addEventListener("click", () => {
	player = CreatePlayer("O", "white");
});

$boxes.forEach((box) => {
	box.addEventListener("click", (e) => {
		player.play(Gameboard.board, e);
	});
});

//Gameboard Module

let Gameboard = (() => {
	let board = [];

	const reset = () => {
		Gameboard.board = [];
	};

	return { board, reset };
})();

let DisplayController = (() => {
	function displaySelection(board) {
		//Array Values to Containers
		$box1.textContent = board[0];
		$box2.textContent = board[1];
		$box3.textContent = board[2];
		$box4.textContent = board[3];
		$box5.textContent = board[4];
		$box6.textContent = board[5];
		$box7.textContent = board[6];
		$box8.textContent = board[7];
		$box9.textContent = board[8];
	}

	return {
		displaySelection,
	};
})();

DisplayController.displaySelection(Gameboard.board);

//Players

function CreatePlayer(style, color) {
	let play = (board, e) => {
		if (e.target.textContent === "") {
			e.target.textContent = style;
			e.target.style.color = color;
			board.push(style);
		} else {
			return;
		}
	};

	return { play };
}
