//skapar variabler
const boxes = document.querySelectorAll(".box");
const statusText = document.querySelector("#statusText");
const restartBtn = document.querySelector("#restartBtn");
//detta är för hur många lådor vi har i html, vi har 9 stycken lådor
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
//options är vår placeholder, 1 för varje låda
let options = ["", "", "", "", "", "", "", "", ""];
//första spelare är X
let currentPlayer = "X";
//ändrar det till true när vi startar spelet
let running = true;
//initierar spelet
initializeGame();
//skapar en function för att starta spel 
function initializeGame(){
//en event för att klicka på lådorna
boxes.forEach(box=> box.addEventListener("click", boxClicked));
//skapar en eventlistener så att användaren kan starta om spelet
restartBtn.addEventListener("click", restartGame); 
//skapar text innan spelet börjar för att berätta vem som ska starta
statusText.textContent=`${currentPlayer}'s turn`;
}
//function för vilka lådor som klickades
function boxClicked(){
//hämtar attribute från html
const boxIndex = this.getAttribute("cellIndex");
//om options i index av cellindex inte är en tom plats eller inte körs då ger den tillbaks ingenting
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
    //ändrar spelare till O 
    currentPlayer=(currentPlayer=="X")?"O":"X";
    statusText.textContent=`${currentPlayer}'s turn`;
}
function checkWinner(){
    let roundWon =false;
    for(let i = 0; i<winConditions.length; i++){
        //sparar winConditions inom dessa variabler
        const condition = winConditions[i];
        const boxA = options[condition[0]]
        const boxB = options[condition[1]]
        const boxC = options[condition[2]]
        //om dessa box är tomma då fortsätter spelet
        if(boxA== ""||boxB==""|| boxC==""){
            continue;
        }
        //om dessa lådor är lika med varandra dvs att alla är stryckna över då har någon vunnit
        if(boxA == boxB && boxB == boxC){
            roundWon =true;
            break;
        }
    }
    //om någon vinner så skriver den ut vilken spelare vinner
    if(roundWon){
        statusText.textContent=`${currentPlayer} Wins`;
        running=false;
    }
    //om option array inte är tom dvs att alla lådor i spelet är påfylld och ingen har vunnit då blir det oavgjort
    else if(!options.includes("")){
        statusText.textContent="Draw!";
        running=false
    }else{//annars byter det bara spelare tills alla lådor är pfyllda
        changePlayer();
    }
}
//när man trycker på knappen så återställer allting till 0  
function restartGame(){
currentPlayer="X"
options = ["", "", "", "", "", "", "", "", ""];
statusText.textContent=`${currentPlayer}'s turn`;
boxes.forEach(box => box.textContent= "");
running=true;
}
