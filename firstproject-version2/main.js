let answer = 0;
let chance = 5;
let gameover = false;
let history = [];

let playButton = document.getElementById('play-button');
let userInput = document.getElementById('user-input');
let resultArea = document.getElementById('result-area');
let resetButton = document.getElementById('reset-button');
let chanceArea = document.getElementById('chance-area');

playButton.addEventListener('click', play);
resetButton.addEventListener('click', reset);
userInput.addEventListener('focus', function () {
	userInput.value = '';
});

function play() {
	if (userInput.value > 100 || userInput.value < 0 || userInput.value == '') {
		resultArea.textContent = '0과 100 사이의 값을 입력해주세요.';
		return;
	}

	if (history.includes(userInput.value)) {
		resultArea.textContent = '이미 입력한 값입니다.';
		return;
	}

	chance--;
	console.log(chance);
	if (chance < 1) {
		gameover = true;
	}

	if (gameover == true) {
		playButton.disabled = true;
	}

	if (userInput.value > answer) {
		resultArea.textContent = 'down';
	} else if (userInput.value < answer) {
		resultArea.textContent = 'up';
	} else {
		resultArea.textContent = '정답입니다.';
	}

	history.push(userInput.value);

	chanceArea.textContent = `남은 찬스 : ${chance}`;
}

function reset() {
	randomGenerate();
	chance = 5;
	chanceArea.textContent = '남은 찬스 : 5번';
	gameover = false;
	playButton.disabled = false;
	resultArea.textContent = '결과가 나온다.';
	userInput.value = '';
}

function randomGenerate() {
	answer = Math.floor(Math.random() * 100);
	console.log('answer', answer);
}

randomGenerate();
