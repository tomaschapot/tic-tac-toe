//Gameboard Module
let Gameboard = (() => {
	let board = ["X", "O", "X", "O", "O", "X", "O", "O", "X"];

	return { board };
})();

let DisplayController = (() => {
	function displaySelection() {
		let $box1 = document.querySelector("#position-1");
		let $box2 = document.querySelector("#position-2");
		let $box3 = document.querySelector("#position-3");
		let $box4 = document.querySelector("#position-4");
		let $box5 = document.querySelector("#position-5");
		let $box6 = document.querySelector("#position-6");
		let $box7 = document.querySelector("#position-7");
		let $box8 = document.querySelector("#position-8");
		let $box9 = document.querySelector("#position-9");

		$box1.textContent = Gameboard.board[0];
		$box2.textContent = Gameboard.board[1];
		$box3.textContent = Gameboard.board[2];
		$box4.textContent = Gameboard.board[3];
		$box5.textContent = Gameboard.board[4];
		$box6.textContent = Gameboard.board[5];
		$box7.textContent = Gameboard.board[6];
		$box8.textContent = Gameboard.board[7];
		$box9.textContent = Gameboard.board[8];
	}

	return {
		displaySelection: displaySelection,
	};
})();

DisplayController.displaySelection();

//Players

function CreatePlayer() {}
