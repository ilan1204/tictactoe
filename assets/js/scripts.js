
let c = document.getElementById('canvas');
let ctx = c.getContext("2d");
let boxwidth = $(c).width() / 3;
let boxheight = $(c).height() / 3;
let turn; //track wich player is his turn (x or o)
let boxesArr = [];

function init() {
  //fill array with empty strings
  for (let i = 0; i < 9; i++){
    boxesArr[i] = '';
  }
  turn = 0; //x starts
  redrawcanvas();
}

$('#canvas').click((e) => {
  let rect = e.target.getBoundingClientRect();
  let x = e.clientX - rect.left;
  let y = e.clientY - rect.top;
  let clickedCell = Math.floor(x/boxwidth) + (Math.floor(y/boxheight)*3);
  if (!alreadyClicked(clickedCell)) {
    boxesArr[clickedCell] = returnStringFromInt(turn);
    redrawcanvas();
    if (checkifwon(returnStringFromInt(turn))){
      swal({
        title: "Player " + returnStringFromInt(turn) + " won!",
        text: "We have a winner, try again?",
        icon: "success",
      }).then((value) => {init();});
    }else{
      if (checkIfGameOver()){
        swal({
          title: "No winner :(",
          text: "We have no winner, try again?",
          icon: "error",
        }).then((value) => {init();});
      }else{
        turn = (turn+1) % 2;
      }
    }
  }
});

var checkifwon = player => {
  //check rows
  for (let y = 0; y < 3; y++){
      if(boxesArr[0+(y*3)] === player && boxesArr[1+(y*3)] === player && boxesArr[2+(y*3)] === player){return true};
  }
  //check columns
  for (let x = 0; x < 3; x++){
      if(boxesArr[x] === player && boxesArr[x+3] === player && boxesArr[x+6] === player){return true};
  }
  //check diagonals
  if(boxesArr[0] === player && boxesArr[4] === player && boxesArr[8] === player){return true};
  if(boxesArr[2] === player && boxesArr[4] === player && boxesArr[6] === player){return true};
  return false
}

var alreadyClicked = index => {
  return boxesArr[index].length > 0;
}

var checkIfGameOver = () => {
  let count = 0;
  for (let i=0;i<boxesArr.length;i++){
    count = count + boxesArr[i].length;
  }
  return count === 9;
}

var returnStringFromInt = playerInt => {
  switch (playerInt) {
    case 0:
      return 'X';
      break;
    case 1:
      return 'O';
      break;
    default:
      return '';
  }
}

 // DRAWING SECTION
var redrawcanvas = () => {
  ctx.clearRect(0, 0, c.width, c.height); //clear the canvas
  drawgrid(); //draw the grid
  drawboxes(); //draw the players
}

var drawgrid = () => {
  ctx.beginPath();
  ctx.moveTo(boxwidth, 10);
  ctx.lineTo(boxwidth, boxheight * 3 - 20);
  ctx.moveTo(boxwidth * 2, 10);
  ctx.lineTo(boxwidth * 2, boxheight * 3 - 20);
  ctx.moveTo(10, boxheight);
  ctx.lineTo(boxwidth * 3 - 20, boxheight);
  ctx.moveTo(10, boxheight * 2);
  ctx.lineTo(boxwidth * 3 - 20, boxheight * 2);
  ctx.strokeStyle = "#fff";
  ctx.lineWidth = 1;
  ctx.stroke();
}

var drawboxes = () => {
  for (let i = 0; i < boxesArr.length; i++) {
    if (boxesArr[i].length > 0){
      ctx.font = '100px cursive';
      ctx.fillStyle = '#fff';
      ctx.textAlign = "center";
      let x  = ((i%3)*boxwidth) + (boxwidth/2);
      let y  = (Math.floor(i/3)*boxheight) + (boxheight/2);
      ctx.fillText(boxesArr[i],x,y+30);
    }
  }
}
 // DRAWING SECTION
