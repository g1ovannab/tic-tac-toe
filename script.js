class Player {
  constructor(type, moves) {
    this.type = type;
    this.moves = moves;
  }
}
/* Player class that has type and moves attributes. */

const movesX = [];
const playerX = new Player("X", movesX);
/* Created a new Player with no moves yet. */

const movesO = [];
const playerO = new Player("O", movesO);
/* Created a new Player with no moves yet. */



class Board {
  constructor(board, conditions) {
    this.board = board;
    this.conditions = conditions;
  }
}
/* Board class that has board and conditions attributes. */

const conditions = [
  ["1", "2", "3"],
  ["4", "5", "6"],
  ["7", "8", "9"],
  ["1", "4", "7"],
  ["2", "5", "8"],
  ["3", "6", "9"],
  ["1", "5", "9"],
  ["3", "5", "7"]
];
const boardFields = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
];
const board = new Board(boardFields, conditions);
/* Created a new Board with those conditions, and the fields that exists. */


const fieldsAlreadyUsed = [];
/* This array will track the fields that already got checked. */

var started = false;
/* This will track if the game has started already. */


var thereIsWinner = false;

var currentPlayer = (Math.floor(Math.random() * 10) + 1) % 2;
/* This will generate a random number from 1 to 10 and we catch the rest of the
division. Depending on the value of this number, player X or O will start. */
    
/* 
    0 == O == Computer
    1 == X == User
*/


$('.start').click(function() {
  started = true;
  $(this).html("Restart");
  /* Changes the html to Restart so the user can restart the game. */

  $(this).removeClass('start');
  $(this).addClass('restart');

  nextPlayer();

  $('.restart').click(function() {
    window.location.reload();
  });
  
});
/* Once the user clicks the button with the 'start' class, the code will execute. */




function nextPlayer(){
  console.log("The current player is: " + currentPlayer);


  if (currentPlayer === 0) {
    playerOTurn();
  } 
  else {
    playerXTurn();
  }
}

function playerOTurn(){
  $("#namePlayerTurn").delay(3000).text("O");
  
  let repeat = false;

  do {
    var randomField = Math.floor(Math.random() * 9) + 1;
    let idClass = $("#i" + randomField).attr("id");
    const id = $("#i" + randomField).attr("field");
    console.log("O id DO COMPUTADOR é: " + id);


    if(fieldsAlreadyUsed.indexOf(id) > -1){
      repeat = true;
    } else {
      repeat = false;

  

      setTimeout(function () {
        $("#" + idClass).html("O");
        $("#" + idClass).addClass("O");
      }, 1000);
      
      playerO.moves.push(id);
      console.log("O array do COMPUTADOR é: " + playerO.moves);
      fieldsAlreadyUsed.push(id);
      console.log("O array de USADOS é: " + fieldsAlreadyUsed);
      currentPlayer = 1;

      checkWinner(playerO);

    }

  } while(repeat === true);
  
}


function playerXTurn(){
  setTimeout(function () {
    $("#namePlayerTurn").text("X");
  }, 1000);

  let repeat = false;

  do {

    $(".player").click( function () {
      let idClass = $(this).attr("id");
      const id = $(this).attr("field");
      console.log("O id DO USER é: " + id);  
  
      if(fieldsAlreadyUsed.indexOf(id) > -1){
        repeat = true;
      } else {
        repeat = false;

        $("#" + idClass).html("X");
        $("#" + idClass).addClass("X");
          
        playerX.moves.push(id);
        console.log("O array do USER é: " + playerX.moves);
        fieldsAlreadyUsed.push(id);
        console.log("O array de USADOS é: " + fieldsAlreadyUsed);
        currentPlayer = 0;

        checkWinner(playerX);
      }  
    });
  } while(repeat === true);
}



function checkWinner(player){
  var movesPlayer = player.moves;

  if(movesPlayer.length > 2 && fieldsAlreadyUsed.length < 9){

    const conditionResult = conditionsCheck(movesPlayer);

    if (conditionResult === true){
      showWinner(player);
    } else {
      nextPlayer();
    }
    
  } else if (fieldsAlreadyUsed.length === 9) {
    
    const conditionResult = conditionsCheck(movesPlayer);

    if (conditionResult === true){
      showWinner(player);
    } else {
      gameOver();
    }
  } else {
    nextPlayer();
  }
}



function conditionsCheck(movesPlayer){

  for (var i = 0; i < 8; i++){
    
    console.log(board.conditions[i]);

    if (movesPlayer.indexOf(board.conditions[i][0]) > -1 && 
    movesPlayer.indexOf(board.conditions[i][1]) > -1 &&
    movesPlayer.indexOf(board.conditions[i][2]) > -1){
      return true;
    } 
  }

  return false;
}

const idH5 = "turnTitle";
const idSpan = "namePlayer";

function showWinner(player){
  setTimeout(function () {

    $('#turn').html("<h5 id="+idH5+"> The player <span id="+idSpan+"> "+ player.type + " </span> is the winner!</h5>");

    for (var i = 0; i < 10; i++){
      $('#i' + i).text(" ");
    }
  }, 3500);
  
  setTimeout(function() {
    window.location.reload();
  }, 5500);
}

function gameOver(){
  setTimeout(function () {
  
    $('#turn').html("<h5 id="+idH5+">Game Over! <span id="+idSpan+">Nobody</span> won.</h5>");
    
    for (var i = 0; i < 10; i++){
      $('#i' + i).text(" ");
    }
  }, 3500);
  
  setTimeout(function() {
    window.location.reload();
  }, 5500);
}
