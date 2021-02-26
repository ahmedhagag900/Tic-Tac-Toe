var board=[['0','0','0'],
           ['0','0','0'],
           ['0','0','0']];

var player_sympol='x-cell';
var computer_sympol='o-cell';
var player='x';
var computer='o';
var boardWidth=3;
var boardHeight=3;
var level=1;

main();

function main(){
    var difficulty=document.getElementsByClassName('difficulty');
    for(let i=0;i<difficulty.length;++i){
        difficulty[i].addEventListener('click',set_difficulty_level);
    }
    var cells=document.getElementsByClassName('td');
    for(let i=0;i<cells.length;++i){
        cells[i].addEventListener('click',player_move);
        cells[i].addEventListener('mouseover',mouse_over);
        cells[i].addEventListener('mouseout',mouse_out)
    }
}

function set_difficulty_level(){
    level=this.id;
    document.getElementsByClassName('start-game')[0].style.visibility='hidden';
}


function mouse_over(){
    if(board[calc_row(this.id-1)][calc_col(this.id-1)]=='0'){
        var player_cell=document.getElementById(this.id);
        player_cell.getElementsByClassName(player_sympol)[0].style.visibility='visible';
    }
}
function mouse_out(){
    if(board[calc_row(this.id-1)][calc_col(this.id-1)]=='0'){
        var player_cell=document.getElementById(this.id);
        player_cell.getElementsByClassName(player_sympol)[0].style.visibility='hidden';
    }
}

function player_move(){
    var player_cell=document.getElementById(this.id);
    var row=Math.floor((this.id-1)/boardWidth);
    var col=(this.id-1)%boardHeight;
    if(board[row][col]=='0'){
        board[row][col]=player;
        player_cell.getElementsByClassName(player_sympol)[0].style.visibility="visible";
        if(check_win(player)){
            var game_over=document.getElementsByClassName('game-over')[0];
            game_over.style.visibility="visible";
            document.getElementById('result').innerHTML ="You Win !!";
            document.getElementById('result').style.color="#7CFC00";
            console.log('Player win');
            return;
        }
        if(check_draw()){
            var game_over=document.getElementsByClassName('game-over')[0];
            game_over.style.visibility="visible";
            document.getElementById('result').innerHTML ="Draw !!";
            document.getElementById('result').style.color="white";
            console.log('Draw!!');
            return;
        }
        
        var idx=1;
        if(level==2)
            idx=mideum_level()
        else if(level==3)
            idx=hard_level();
        else 
            idx=easy_level(); 

        board[calc_row(idx)][calc_col(idx)]=computer;
        draw_cell(calc_row(idx),calc_col(idx),computer_sympol);

        if(check_win(computer)){
            var game_over=document.getElementsByClassName('game-over')[0];
            game_over.style.visibility="visible";
            document.getElementById("result").innerHTML ="You Lose !!";
            document.getElementById('result').style.color="#FF4500";
            console.log('Computer wins');
            return;
        }
        if(check_draw()){
            var game_over=document.getElementsByClassName('game-over')[0];
            game_over.style.visibility="visible";
            document.getElementById("result").innerHTML="Draw !!";
            document.getElementById('result').style.color="white";
            console.log('Draw');
            return;
        }
    }
}

function draw_cell(row,col,sympol){
    var computer_cell=document.getElementById(row*boardWidth+col+1);
    computer_cell.getElementsByClassName(sympol)[0].style.visibility='visible';
}


function calc_row(idx){
    return Math.floor(idx/boardWidth);
}
function calc_col(idx){
    return idx%boardWidth;
}

function check_win(sympol){
    let dia1_win=0;
    let dia2_win=0;
    for(let i=0;i<board.length;++i){
        let row_win=0;
        let col_win=0;
        for(let j=0;j<board[i].length;++j){
            if(board[i][j]==sympol)++row_win;
            if(board[j][i]==sympol)++col_win;
            if(i==j&&board[i][j]==sympol)++dia1_win;
            if(i+j==boardWidth-1&&board[i][j]==sympol)++dia2_win;
        }
        if(row_win==boardWidth||col_win==boardHeight)
            return true;
    }
    if(dia1_win==boardWidth||dia2_win==boardWidth)
        return true;
    return false;
}

function check_draw(){
    for(let i=0;i<board.length;++i){
        for(let j=0;j<board[i].length;++j)
            if(board[i][j]=='0')
                return false;
    }
    return true;
}


function easy_level(){
    return random_move();
}

function mideum_level(){
    var idx=get_win_cell(player)
        if(idx==-1)
            idx=random_move();
    return idx;
}

function hard_level(){
    var idx=get_win_cell(computer);
        if(idx==-1)
            idx=get_win_cell(player);
        if(idx==-1||isNaN(idx))
            idx=random_move();
    return idx;
}

function random_move(){
    var idx=-1;
    do{
        idx=Math.floor(Math.random()*(boardWidth*boardHeight));
        var row=Math.floor(idx/boardWidth);
        var col=idx%boardHeight;
    }while(board[row][col]!='0');
    return idx;
}

function get_win_cell(sympol){
    let dia1_win=0;
    let dia2_win=0;
    for(let i=0;i<board.length;++i){
        let row_win=0;
        let col_win=0;
        for(let j=0;j<board[i].length;++j){
            if(board[i][j]==sympol)++row_win;
            if(board[j][i]==sympol)++col_win;
            if(i==j&&board[i][j]==sympol)++dia1_win;
            if(i+j==boardWidth-1&&board[i][j]==sympol)++dia2_win;
        }
        if(row_win==boardWidth-1){
            let comp=get_row_empty_cell(i);
            if(comp!=-1)
                return comp;
        }
        if(col_win==boardHeight-1){
            let comp=get_col_empty_cell(i);
            if(comp!=-1)
                return comp;
        }
    }
    if(dia1_win==boardWidth-1){
        let comp=get_dia1_empty_cell();
            if(comp!=-1)
                return comp;
    }
    if(dia2_win==boardWidth-1){
        let comp=get_dia2_empty_cell();
        if(comp!=-1)
            return comp;
    }
    return -1;
}

function get_row_empty_cell(idx){
    for(let i=0;i<boardWidth;++i)
        if(board[idx][i]=='0')
            return idx*boardWidth+i;
    return -1;
}

function get_col_empty_cell(idx){
    for(let i=0;i<boardHeight;++i)
        if(board[i][idx]=='0')
            return i*boardHeight+idx;
    return -1;
}

function get_dia1_empty_cell(){
    for(let i=0;i<boardWidth;++i)
        for(let j=0;j<boardHeight;++j)
            if(i==j&&board[i][j]=='0')
                return i*boardWidth+j;
    return -1;
}
function get_dia2_empty_cell(){
    for(let i=0;i<boardWidth;++i)
        for(let j=0;j<boardHeight;++j)
            if(i+j==boardWidth-1&&board[i][j]=='0')
                return i*boardWidth+j;
    return -1;
}