const boxes = document.querySelectorAll(".box");
const statusText = document.querySelector("#statusText");
const restartBtn = document.querySelector("#restartBtn");
//detta är för hur många lådor vi har i html, vi har 9 men index börjar med 0
const winConditions= [
    //row
    [0,1,2],
    [3,4,5],
    [6,7,8],
    //kolumner
    [0,3,6],
    [1,4,7],
    [2,5,8],
    //diagonal
    [0,4,8],
    [2,4,6]
];
let options = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
//initierar spelet
let running = true;

initializeGame();

function initializeGame(){
//för varje click på en låda så ropar den på boxclicked function
boxes.forEach(box=> box.addEventListener("click", boxClicked));
//ropar på restartgame function
restartBtn.addEventListener("click", restartGame);
Ropar på currentplayer så att den skriver ut vilken av spelares tur det är
statusText.textContent=`${currentPlayer}'s turn`;
}
function boxClicked(){
//hämtar vår attribute av cell index från html
const boxIndex = this.getAttribute("cellIndex")
//om vår array inte har något i den och om spelet inte körs så skrivs inget ut
if(options[boxIndex]!= "" || !running){
    return;
}
updateBox(this,boxIndex);
checkWinner();
}
function updateBox(box, index){
    //updaterar placeholder
options[index]=currentPlayer;
box.textContent=currentPlayer;
}
function changePlayer(){
    //ändrar spelare till o 
    currentPlayer=(currentPlayer=="X")?"O":"X";
    statusText.textContent=`${currentPlayer}'s turn`;
}
function checkWinner(){
// skapar boolean för att avsluta spelet när någon förlorar
    let roundWon =false;
    for(let i = 0; i<winConditions.length; i++){
        const condition = winConditions[i];
        const boxA = options[condition[0]]
        const boxB = options[condition[1]]
        const boxC = options[condition[2]]
        if(boxA== ""||boxB==""|| boxC==""){
            continue;
        }
        if(boxA == boxB && boxB == boxC){
            roundWon =true;
            break;
        }
    }
//om en spelare vinner då blir vår running boolean falskt och spelaren får en text
    if(roundWon){
        statusText.textContent=`${currentPlayer} Wins`;
        running=false;
    }
//om det blir oavgjort så får man meddelandet och vår boolean blir falskt
else if(!options.includes("")){
        statusText.textContent="Draw!";
        running=false
    }else{
        changePlayer();
    }
}
function restartGame(){
currentPlayer="X"
options = ["", "", "", "", "", "", "", "", ""];
statusText.textContent=`${currentPlayer}'s turn`;
boxes.forEach(box => box.textContent= "");
running=true;
}
