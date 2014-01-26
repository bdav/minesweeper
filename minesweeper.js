function tile() {
	this.isMine = false;
	this.clicked = false;
	this.neighborMines = 0;
}
var gameBoard = [];
function generateGameBoard() {
	for (i=0;i<8;i++) {
		gameBoard.push([]);
		for (j=0;j<8;j++){
			gameBoard[i].push(new tile());
		}
	}
	placeMines();
	countNeighborMines();
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
				console.log(x +',' +y);
			}
	}
}
function countNeighborMines() {
	for (l=0;l<8;l++){
		for (m=0;m<8;m++){
			var y = l; 
			var x = m;
			for (n=y-1;n<y+2;n++){
				for (o=x-1;o<x+2;o++){
					if (o > -1 && o < 8 && n > -1 && n <8){
						if (gameBoard[n][o].isMine == true){
								gameBoard[l][m].neighborMines++;
						}
					}
				}
			}
		}
	}
}				
$('button#newGame').click(function gameReset(){
	var gameBoard = generateGameBoard();
})
var minesFlagged = 0;
$('td').bind('contextmenu',function() { return false; 	})
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
			$(this).html('!');
			minesFlagged++
			$('#flagged').html('Flagged: ' + minesFlagged +'/10')
			break
		default:
			break
	}
});
function leftClick(x,y){
	if (gameBoard[y][x].clicked == true){
		return
	}
	else if (gameBoard[y][x].isMine == true){
		alert("KABOOM!");
		return		
	}
	else {
		gameBoard[y][x].clicked = true;
		$($('td')[(y*8)+x]).html(gameBoard[y][x].neighborMines);
		if (gameBoard[y][x].neighborMines == 0){
			for (i=y-1;i<y+2;i++){
				for (j=x-1;j<x+2;j++){
					if (i > -1 && i < 8 && j > -1 && j <8 && gameBoard[i][j].isMine == false	){
						$($('td')[(i*8)+j]).html(gameBoard[i][j].neighborMines);
					}
				}
			}
		}
	}
}