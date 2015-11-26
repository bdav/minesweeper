var gameBoard = [];
function tile() {
	this.isMine = false;
	this.clicked = false;
	this.flagged = false;
}
function generateGameBoard() {
	gameBoard = [];
	for (var i=0;i<8;i++) {
		gameBoard.push([]);
		for (var j=0;j<8;j++){
			gameBoard[i].push(new tile());
		}
	}
	placeMines();
}
function placeMines(){
	for (k=0;k<10;k++){
		var x =Math.floor(Math.random()*8);
		var y =Math.floor(Math.random()*8);
		if (gameBoard[y][x].isMine == true){
			k--;
		}
		else {
			gameBoard[y][x].isMine = true;		
		}
	}
}
$('button#newGame').click(newGame);
function newGame(){
	for (var i=0;i<64;i++){
		$($('td')[i]).html('');
		$($('td')[i]).css("color", "black");
		$($('td')[i]).css("background-color","")
	}
	var gameBoard = generateGameBoard();
	minesFlagged = 0;
	$('#flagged').html('Flagged: ' + minesFlagged +'/10')
	$('button#showMines').html('Show Mines');
	showMines = false;
	gameOver = false; 
}
newGame();
var showMines = false;
$('button#showMines').click(function() {
	if (gameOver == false){
		if (showMines == false){
			showMines = true;
			$('button#showMines').html('Hide Mines');
			for (var y=0;y<8;y++){
				for (var x=0;x<8;x++){
					if (gameBoard[y][x].isMine == true){
						$($('td')[(y*8)+x]).html('X');
					}
					else if (gameBoard[y][x].flagged == true){
						$($('td')[(y*8)+x]).css("color","orange")					
					}
				}
			}
		}
		else {
			showMines = false;
			$(this).html('Show Mines');
			for (var y=0;y<8;y++){
				for (var x=0;x<8;x++){
					if (gameBoard[y][x].flagged == true){
						$($('td')[(y*8)+x]).html('!');
						$($('td')[(y*8)+x]).css("color","black")		
					}
					else if (gameBoard[y][x].isMine == true){
						$($('td')[(y*8)+x]).html('');
					}
				}	
			}
		}
	}		
});
function countNeighborMines(x,y) {
	var neighborMines = 0;
	for (var n=y-1;n<y+2;n++){
		for (var o=x-1;o<x+2;o++){
			if (o > -1 && o < 8 && n > -1 && n <8){
				if (gameBoard[n][o].isMine == true){
					neighborMines++;
				}
			}
		}
	}
	return neighborMines;
}				
var minesFlagged = 0;
$('td').bind('contextmenu',function() { return false; 	});
$('td').mousedown(function(event){
	var x = $(this).index();
	var y = $(this).parent().index();
	switch (event.which){
		case 1:	
			leftClick(x,y);
			break;
		case 2:
			break
		case 3:
			event.preventDefault();
			if (gameBoard[y][x].flagged != true ){
				minesFlagged++
				$('#flagged').html('Flagged: ' + minesFlagged +'/10')
				gameBoard[y][x].flagged = true;
				$(this).html('!');
			}
			

			break
		default:
			break
	}
});
function leftClick(x,y){
	if (gameOver == false){
		if (gameBoard[y][x].clicked == false) {
	    gameBoard[y][x].clicked = true;
			var neighborMines = countNeighborMines(x,y);
			if (neighborMines == 0){
				$($('td')[(y*8)+x]).css("background-color","lightgrey");
				for (var i=y-1;i<y+2;i++){
					for (var j=x-1;j<x+2;j++){
						if (i > -1 && i < 8 && j > -1 && j <8){
							leftClick(j,i);
						}
					}
				}
			}
			else if (gameBoard[y][x].isMine == false){
				$($('td')[(y*8)+x]).html(neighborMines);
				$($('td')[(y*8)+x]).css("background-color","lightgrey");
				if (gameBoard[y][x].flagged == true){
					gameBoard[y][x].flagged = false;
					minesFlagged--;
					$('#flagged').html('Flagged: ' + minesFlagged +'/10')
				}	
			}
			else if (gameBoard[y][x].isMine == true){
				for (var k=0;k<8;k++){
					for (var l=0;l<8;l++){
						if (gameBoard[k][l].isMine == true){
							$($('td')[(k*8)+l]).html('X');
							$($('td')[(y*8)+x]).css("background-color","red");
						}
					}
				}
				alert("KABOOM!");
				gameOver = true;			
			}	
		}
	}		 
}
$('button#validate').click(function checkBoard(){
	if (gameOver == false){
		var unflaggedMines = 0;
		var wrongFlags = 0;
		for (var y=0;y<8;y++){
			for (var x=0;x<8;x++){
				if (gameBoard[y][x].flagged == true && gameBoard[y][x].isMine == false){
					$($('td')[(y*8)+x]).css("color", "yellow");
					wrongFlags++;
				}
				if (gameBoard[y][x].isMine == true && gameBoard[y][x].flagged == false ){
					$($('td')[(y*8)+x]).html('X');
					$($('td')[(y*8)+x]).css("color", "red");
					unflaggedMines++;
				}
			}
		}
		if (unflaggedMines == 0 && wrongFlags == 0){
			for (var i=0;i<8;i++){
				for (var j=0;j<8;j++){
					if (gameBoard[i][j].flagged == true){
						$($('td')[(i*8)+j]).css("background-color","cyan");
					}
				}
			}
			alert("You win!");
		}
		else {
			alert("You lose!");
			gameOver = true;
		}
	}	
})
var gameOver = false;	