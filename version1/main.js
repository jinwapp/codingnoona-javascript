// 랜덤번호 지정
// 유저가 번호를 입력한다. 그리고 go 라는 버튼을 누름
// 만약에 유저가 랜덤번호를 맞추면, 맞췄습니다.!
//  램덤번호가 < 유저번호 Down
//  랜덤번호가 > 유저번호 up
// Reset 버튼을 누르면 게임이 리셋된다.
// 5번의 기회를 다쓰면 게임이 끝난다 (더이상 추측 불가,  버튼이 disable)
// 유저가 1~100 범위 밖에 숫자를 입력하면 알려준다, 기회를 깍지 않는다.
// 유저가 이미 입력한 숫자를 또 입력하면, 알려준다, 기회를 깍지 않는다.

let answer = 0;
let chance = 5;
let gameover = false;
let history = []

let playButton = document.getElementById('play-button')
let userInput = document.getElementById('user-input')
let resultArea = document.getElementById('result-area')
let resetButton = document.getElementById('reset-button')
let chanceArea = document.getElementById('chance-area')

playButton.addEventListener('click', play)
resetButton.addEventListener('click', reset)
userInput.addEventListener('focus', function (){
    userInput.value = ''
})


function randomGenerate(){
    answer = Math.floor(Math.random() * 100) +1;
    console.log('정답',answer)
}

function play(){
    
    let userValue = userInput.value

    if (userValue > 100 || userValue < 0 || userValue == ''){
        resultArea.textContent = '0과 100사이의 수를 넣어주세요.'
        return
    }

    if (history.includes(userValue)){
        resultArea.textContent = '이미 입력한 값입니다. 다른 값을 입력해주세요.'
        return
    }

    if (userValue > answer){
        resultArea.textContent = 'down!!!'
    } else if (userValue < answer) {
        resultArea.textContent = 'up!!!'
    }else{
        resultArea.textContent = '정답입니다.!!!'
        gameover = true
    }

    history.push(userValue)
    console.log(history)

    chance--;
    if (chance < 1){
        gameover = true
    } 
    
    if (gameover == true){
        playButton.disabled = true;
    }

    chanceArea.textContent = `남은기회 : ${chance}`


}

function reset(){
    userInput.value = ''
    randomGenerate()
    resultArea.textContent = '결과값이 여기에 나옵니다.'
    playButton.disabled = false
    chance = 5;
    chanceArea.textContent = `남은기회 : 5번`
}

randomGenerate();