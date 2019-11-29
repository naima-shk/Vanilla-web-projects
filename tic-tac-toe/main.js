let origboard;
const  huplayer='0';
const aiplayer='x';
const wincombos=[
    [0 ,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [6,4,2]
]
const cells=document.querySelectorAll('.cell');


function startgame(){
   // document.querySelector(".endGame").style.display="none";
    origboard=Array.from(Array(9).keys());
    for (var i=0; i<cells.length;i++){
        cells[i].innertext='';
        cells[i].style.removeProperty('background-color');
        cells[i].addEventListener('click',turnclick,false);

    }
}
function turnclick(square){
    if(typeof origboard[square.target.id]=='number'){
turn(square.target.id, huplayer)
    if (!checktie()) turn(bestspot(),aiplayer);

}
}
 function turn(squareId,player){
     origboard[squareId]=player;
     document.getElementById(squareId).innerText=player;
     let gamewon= checkwin(origboard,player)
     if(gamewon) gameover(gamewon)
 }
 function checkwin(board,player){
     let plays=board.reduce((a,e,i) =>
  (e===player)  ? a.concat(i): a,[]);
let gamewon=null;
for(let [index,win] of wincombos.enteries()){
    if (win.every(elem=> plays.indexof(elem)>-1)){
        gamewon={index: index,player:player};
        break;
    }
}
return gamewon;
 }
 function gameover(gamewon){
     for (let index of wincombos[gamewon.index]){
         document.getElementById(index).style.backgroundColor='blue';
         gamewon.player== huplayer? "blue":"red";
     }
     for(var i=0; i<cells.length;i++){
         cells[i].removeEventListener('click',turnclick,false);
     }
     declareWinner(gamewon.player== huplayer ? "you win":" you lose");
 }
 function declareWinner (who){
     document.querySelector(".endGame").style.display='block';
     document.querySelector(".endGame.text").innerText='who;'

 }

function emptysquares(){
    return origboard.filter(s=> typeof s=='number')
}
function bestspot(){
    return emptysquares()[0];
}
function checktie(){
    if(emptysquares().length==0){
        for(var i=0; i<cells.length;i++){
            cells[i].style.backgroundColor='green';
            cells[i].removeEventListener('click',turnclick,false);
        }
        declareWinner("tieGame!")
        return true;
        
    }
    return false;
}