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



var currentPlayer = (Math.floor(Math.random() * 10) + 1) % 2;
/* This will generate a random number from 1 to 10 and we catch the rest of the
division. Depending on the value of this number, player X or O will start. */
    
/* 
    0 == O == Computer
    1 == X == User
*/



$('.start').click(function() {

  $(this).text("Restart");
  /* Changes the text to Restart so the user can restart the game. */

  $(this).removeClass('start');
  $(this).addClass('restart');

  nextPlayer();
  /* Calls the 'nextPlayer' function. */

  $('.restart').click(function() {
    window.location.reload();
  });
  /* If the button with the 'restart' class gets clicked, the page will reload and the game will 'restart'. */
  
});
/* Once the user clicks the button with the 'start' class, the code will execute. */




function nextPlayer(){
  if (currentPlayer === 0) {
    playerOTurn();
  } /* If the current player is === 0, it means that it's computer's turn, so we call the 'playerOTurn' function. */
  else {
    playerXTurn();
  } /* If the current player is everything BUT 0 (=== 1), it means that it's user's turn, so we call the 'playerXTurn' function. */

}
/* Function 'nextPlayer' that keeps track of whose turn is. */


function playerOTurn(){
  $("#namePlayerTurn").delay(3000).text("O");
  /* We change the name of the player's turn for the current one.
  We give a 3 seconds delay (the text will stay for 3 seconds on the screen) 
  to give the impression that the computer is "thinking". */
  
  let repeat = false;
  /* let variable that keeps track if we'll need to execute the code again. */

  do {
    var randomField = Math.floor(Math.random() * 9) + 1;
    /* As is the computer's turn, we'll create a random number that means the field we'll check. This random number goes from 1 to 9.*/

    let idClass = $("#i" + randomField).attr("id");
    /* This let variable keeps the ID ATTRIBUTE VALUE of the object chosen. */

    const id = $("#i" + randomField).attr("field");
    /* This const variable keeps the FIELD ATTRIBUTE VALUE of the object chosen. 
    Field is a attribute created by us that represent the value of the field. */

    if(fieldsAlreadyUsed.indexOf(id) > -1){

      repeat = true;
      /* If the 'fieldsAlreadyUsed' array has the 'id' value in SOME position, we'll repeat the process until
      the 'id' is an unused number. */

    } else {

      repeat = false;      
      /* If the 'fieldsAlreadyUsed' array DOESN'T has the 'id' value in ANY position, we proceed as expected. */

      setTimeout(function () {
        $("#" + idClass).text("O");
        $("#" + idClass).addClass("O");
      }, 1000);
      /* Wait 1 second (1000 ms) and then show whose turn is (computer's turn). Also add the 'O' class. */
      

      playerO.moves.push(id);
      /* We push (add an 'object') the field value (id) in the playerO array to keep track of his moves. */

      fieldsAlreadyUsed.push(id);
      /* We also push in the fieldsAlreadyUsed array the field value (id)  to keep track of ALL (both player's O and X) moves.*/

      currentPlayer = 1;
      /* And then, update the currentPlayer for the next player, which is the X player. */

      checkWinner(playerO);
      /* Call the checkWinner function with the current player as a parameter to check if this player is already a winner. */

    }

  } while(repeat === true);
  /* Do the code, while the let variable 'repeat' is equal true. */
}


function playerXTurn(){
  setTimeout(function () {
    $("#namePlayerTurn").text("X");
  }, 1000);
  /* Wait 1 second and then show the current player's name. */

  let repeat = false;
  /* let variable that keeps track if we'll need to execute the code again. */

  do {
    $(".player").click( function () {

      let idClass = $(this).attr("id");
    /* This let variable keeps the ID ATTRIBUTE VALUE of the object chosen. */

      const id = $(this).attr("field");
      /* This const variable keeps the FIELD ATTRIBUTE VALUE of the object chosen. 
      Field is a attribute created by us that represent the value of the field. */
      
      if(fieldsAlreadyUsed.indexOf(id) > -1){

        repeat = true;
        /* If the 'fieldsAlreadyUsed' array has the 'id' value in SOME position, we'll repeat the process until
        the 'id' is an unused number. */

      } else {

        repeat = false;
        /* If the 'fieldsAlreadyUsed' array DOESN'T has the 'id' value in ANY position, we proceed as expected. */

        $("#" + idClass).html("X");
        $("#" + idClass).addClass("X");
        /* Show whose turn is (user's turn). Also add the 'X' class. */

          
        playerX.moves.push(id);
        /* We push (add an 'object') the field value (id) in the playerO array to keep track of his moves. */

        fieldsAlreadyUsed.push(id);
        /* We also push in the fieldsAlreadyUsed array the field value (id)  to keep track of ALL (both player's O and X) moves.*/

        currentPlayer = 0;
        /* And then, update the currentPlayer for the next player, which is the X player. */

        checkWinner(playerX);
        /* Call the checkWinner function with the current player as a parameter to check if this player is already a winner. */

      }  

    });
    /* Once the current player (X), clicks in one div that has the 'player' class
    the code will execute. */

  } while(repeat === true);
    /* Do the code, while the let variable 'repeat' is equal true. */
}



function checkWinner(player){
  var movesPlayer = player.moves;
  /* Var that keeps the current player's moves. */

  if(movesPlayer.length > 2 && fieldsAlreadyUsed.length < 9){
    /* If the length of the player moves array is more than 2 AND the length of the
    fieldsAlreadyUsed array is less than 9. */

    const conditionResult = conditionsCheck(movesPlayer);
    /* Const that keeps the boolean result of the 'conditionsCheck' function that has
    the player moves as a parameter. */

    if (conditionResult === true){

      showWinner(player);
      /* If the player is a winner, call the 'showWinner' function. */

    } else {

      nextPlayer();
      /* If the player is NOT a winner, continue with the game. */

    }
    
  } else if (fieldsAlreadyUsed.length === 9) {
    /* If the length of the fieldAlreadyUsed array is equal 9, it means thtat all fields
    has already been used. */

    const conditionResult = conditionsCheck(movesPlayer);
    /* Const that keeps the boolean result of the 'conditionsCheck' function that has
    the player moves as a parameter. */

    if (conditionResult === true){

      showWinner(player);
      /* If the player is a winner, call the 'showWinner' function. */

    } else {

      gameOver();
      /* If the player is NOT a winner, the game is over. */
    }

  } else {

    nextPlayer();
    /* If the game is not over and nobody won, continue with the game. */

  }

}



function conditionsCheck(movesPlayer){

  for (var i = 0; i < 8; i++){
    
    if (movesPlayer.indexOf(board.conditions[i][0]) > -1 && 
    movesPlayer.indexOf(board.conditions[i][1]) > -1 &&
    movesPlayer.indexOf(board.conditions[i][2]) > -1){

      return true;
      /* If one condition is answered, the function will return true. 
      This if statement checks along the 8 rows and 3 columns of the array.
      
      [1, 2, 3], <- this is a row 
      [4, 5, 6],
      [7, 8, 9],
      [1, 4, 7],
       ^
      this is a column
      ...
      ...


      [1, 4, 2, 7] <- this is a user's moves exemple.

      The for loop with the if statement will search row by row, 
      in the 3 columns, if they find common elements.

      indexes:                                    0  1  3
      row 3 (counting that the first row is 0) = [1, 2, 3].
      
      if the movesPlayer find the board conditions array on the index 0 in SOME 
      index of the movesPlayer (which will return a value bigger than -1), means 
      that they have this value in common. If the movesPlayer has 3 equal values,
      he is a winner!*/

    } 
  
  }
  /* This for loop will search along the conditions array. */

  return false;
  /* If none of the conditions is answered, this function will return 
  false and there's no winner (yet). */

}



const idH5 = "turnTitle";
const idSpan = "namePlayer";
/* Both consts keep the name of some id. We'll need them to show the css correctly. */

function showWinner(player){

  setTimeout(function () {
    $('#turn').html("<h5 id="+idH5+"> The player <span id="+idSpan+"> "+ player.type + " </span> is the winner!</h5>");

    for (var i = 0; i < 10; i++){
      $('#i' + i).text(" ");
    }
  }, 3500);
  /* Wait 3,5 seconds and change the h5 to show the winner's name. Then, clear the board. */
  
  setTimeout(function() {
    window.location.reload();
  }, 5500);
  /* Wait 5,5 secons and reload the window. */

}

function gameOver(){

  setTimeout(function () {
    $('#turn').html("<h5 id="+idH5+">Game Over! <span id="+idSpan+">Nobody</span> won.</h5>");
    
    for (var i = 0; i < 10; i++){
      $('#i' + i).text(" ");
    }
  }, 3500);
  /* Wait 3,5 seconds and change the h5 to show that the game is over. Then, clear the board. */

  setTimeout(function() {
    window.location.reload();
  }, 5500);
  /* Wait 5,5 secons and reload the window. */

}
