const gameInfo = document.querySelector(".game-info");
const boxes = document.querySelectorAll(".box");
const newGameBtn = document.querySelector(".btn");

let currentPlayer;
let gameGrid;


let winningPositions = [
    [0,1,2], 
    [3,4,5], 
    [6,7,8], 
    [0,3,6], 
    [1,4,7], 
    [2,5,8],
    [0,4,8],
    [2,4,6]
];
function initGame(){
    currentPlayer = "X";
    gameGrid = ["","","","","","","","",""];
    boxes.forEach((box,index) => {
        box.innerText = "";
        boxes[index].style.pointerEvents = "all";
        boxes[index].classList.remove("win");
    });
    newGameBtn.classList.remove("active");

    gameInfo.innerHTML = `current player - ${currentPlayer}`;

}

initGame();
function swapTurn(){
    if(currentPlayer === "X"){
        currentPlayer = "O";

    }
    else{
        currentPlayer = "X";
    }

    gameInfo.innerHTML = `current player - ${currentPlayer}`;
}



function checkGameOver(){
    let answer = "";
    winningPositions.forEach((position) =>{
        if((gameGrid[position[0]] !== "" ||
           gameGrid[position[1]] !== "" ||
           gameGrid[position[2]] !== "") &&
           (gameGrid[position[0]] === gameGrid[position[1]] &&
            gameGrid[position[2]] === gameGrid[position[1]]))
            {
                if(gameGrid[position[0]] === "X"){
                    answer = "X";
                }
                else{
                    answer = "O";
                }


                boxes.forEach((box) => {
                    box.style.pointerEvents = "none";
                });
                boxes[position[0]].classList.add("win");
                boxes[position[1]].classList.add("win");
                boxes[position[2]].classList.add("win");
            }
    });

    if(answer !== ""){
        gameInfo.innerText = `winner is -> ${answer}`;
        newGameBtn.classList.add("active");
        
    }

    //when there is no winner
    let emptyCount = 0;
    gameGrid.forEach((box) => {
        if(box !== ""){
            emptyCount++;
        }
    });
    if(emptyCount ===9){
        newGameBtn.classList.add("active");
        gameInfo.innerText = `Match Tied`;
    }

}




function handleClick(index){
    if(gameGrid[index] === ""){
        boxes[index].innerHTML = currentPlayer;
        gameGrid[index] = currentPlayer; 
        boxes[index].style.pointerEvents = "none";
        swapTurn();
        checkGameOver();
    }
}

boxes.forEach((box,index) => {
    box.addEventListener("click",() => {
        handleClick(index);
    });
});

newGameBtn.addEventListener("click",initGame);