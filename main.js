//DOM
const $playerx = document.querySelector("#X");
const $playero = document.querySelector("#O");
const $boxes = document.querySelectorAll(".square");
const $box1 = document.querySelector("#pos-0");
const $box2 = document.querySelector("#pos-1");
const $box3 = document.querySelector("#pos-2");
const $box4 = document.querySelector("#pos-3");
const $box5 = document.querySelector("#pos-4");
const $box6 = document.querySelector("#pos-5");
const $box7 = document.querySelector("#pos-6");
const $box8 = document.querySelector("#pos-7");
const $box9 = document.querySelector("#pos-8");
const $resetButton = document.querySelector(".reset");
const $gameMode = document.querySelector("#game-mode");
const $turn = document.querySelector(".scoreboard");

let player1 = "";
let player2 = "";
let count = 1;

//Event Listeners

$resetButton.addEventListener("click", () => {
	Game.reset();
	DisplayController.displaySelection(Game.board);
});

$playerx.addEventListener("click", () => {
	player1 = CreatePlayer("player1", "X", "rgb(58,58,58)");
	player2 = CreatePlayer("player2", "O", "white");
	DisplayController.turnOnButton($playerx, $playero);
	DisplayController.turn();
});
$playero.addEventListener("click", () => {
	player1 = CreatePlayer("player1", "O", "white");
	player2 = CreatePlayer("player2", "X", "rgb(58,58,58)");
	DisplayController.turnOnButton($playero, $playerx);
	DisplayController.turn();
});

$boxes.forEach((box) => {
	box.addEventListener("click", (e) => {
		gameTurns(e);
	});
});

//Gameboard Module

let Game = (() => {
	let board = ["", "", "", "", "", "", "", "", ""];

	const reset = () => {
		Game.board = ["", "", "", "", "", "", "", "", ""];
		count = 1;
	};

	function computerRandomizer() {
		let randomBoxNumber = Math.floor(Math.random() * $boxes.length);
		let boxSelection = $boxes[randomBoxNumber];
		let boxId = boxSelection.id.slice(4);

		function selection() {
			if (
				boxSelection.textContent !== "X" &&
				boxSelection.textContent !== "O"
			) {
				let token = (boxSelection.textContent =
					player1.token === "X" ? "O" : "X");
				board[boxId] = token;
				boxSelection.style.color =
					player1.token === "X" ? "white" : "rgb(58,58,58)";
				count = count + 1;
			} else if (count < 9) {
				randomBoxNumber = Math.floor(Math.random() * $boxes.length);
				boxSelection = $boxes[randomBoxNumber];
				boxId = boxSelection.id.slice(4);
				selection();
			}
		}
		selection();
	}

	function turns(board, player1, player2) {}

	function play(player, board) {
		if (
			(board[0] === player.token &&
				board[1] === player.token &&
				board[3] === player.token) ||
			(board[3] === player.token &&
				board[4] === player.token &&
				board[5] === player.token) ||
			(board[6] === player.token &&
				board[7] === player.token &&
				board[8] === player.token) ||
			(board[0] === player.token &&
				board[4] === player.token &&
				board[8] === player.token) ||
			(board[2] === player.token &&
				board[4] === player.token &&
				board[6] === player.token)
		) {
			return console.log(`${player.name} Wins.`);
		}
	}

	return { board, reset, play, turns, computerRandomizer };
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

	function turn() {
		if ($gameMode.options[$gameMode.selectedIndex].textContent === "Friend") {
			$turn.textContent = "Turn : Player 1";
		} else if (
			$gameMode.options[$gameMode.selectedIndex].textContent === "Computer"
		) {
			$turn.textContent = "Start the Game";
		} else {
			$turn.textContent = "Please Choose a Game Mode";
		}
	}

	function turnOnButton(selectedButton, removedButton) {
		selectedButton.classList.add("button-selected");
		removedButton.classList.remove("button-selected");
	}

	return {
		displaySelection,
		turnOnButton,
		turn,
	};
})();

//Players

function CreatePlayer(name, token, color) {
	let play = (board, e) => {
		if (e.target.textContent === "") {
			e.target.textContent = token;
			e.target.style.color = color;

			let boardPosition = e.target.id;

			board[boardPosition.slice(4)] = token;
			count = count + 1;
		} else {
			return;
		}
	};

	return { token, name, play };
}
function gameTurns(e) {
	if ($gameMode.options[$gameMode.selectedIndex].textContent === "Friend") {
		if (player1 === "") {
			return;
		} else {
			if (count % 2 !== 0) {
				player1.play(Game.board, e);
				$turn.textContent = "Turn : Player 2";
			} else {
				player2.play(Game.board, e);
				$turn.textContent = "Turn : Player 1";
			}
		}
	} else if (
		$gameMode.options[$gameMode.selectedIndex].textContent === "Computer"
	) {
		if (player1 === "") {
			return;
		} else {
			if (count % 2 !== 0) {
				$turn.textContent = "Good Luck!";
				new Promise((resolve, reject) => {
					resolve(player1.play(Game.board, e));
				}).then(
					setTimeout(() => {
						Game.computerRandomizer();
					}, 200)
				);
			} else {
			}
		}
	}
}
DisplayController.displaySelection(Game.board);
