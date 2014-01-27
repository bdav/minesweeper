function tile() {
	this.isMine = false;
	this.clicked = false;
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
				$($('td')[(y*8)+x]).html('X');			
			}
	}
}
function countNeighborMines(x,y) {
	var neighborMines = 0;
	for (n=y-1;n<y+2;n++){
		for (o=x-1;o<x+2;o++){
			if (o > -1 && o < 8 && n > -1 && n <8){
				if (gameBoard[n][o].isMine == true){
					neighborMines++;
				}
			}
		}
	}
	return neighborMines;
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
	console.log(x+','+y);
	if (gameBoard[y][x].clicked == false) {
		gameBoard[y][x].clicked = true;
		var neighborMines = countNeighborMines(x,y);
		if (neighborMines == 0){
			$($('td')[(y*8)+x]).html(neighborMines);
			for (i=y-1;i<y+2;i++){
				for (j=x-1;j<x+2;j++){
					// console.log('checked: '+j+','+i)
					if (i > -1 && i < 8 && j > -1 && j <8){
						leftClick(j,i);
					}
				}
			}
		}
		else {
			$($('td')[(y*8)+x]).html(neighborMines);
		}
	}
	else if (gameBoard[y][x].isMine == true){
		alert("KABOOM!");			
	}
}