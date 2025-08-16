function sudoku_solve(row,col,board){
    // console.log(board);
    if(col===board.length){
        col=0;
        row++;
    }
    
    if(row===board.length) {
        return true;
    }
    
    
    if(board[row][col]===0){
        for(let ch=1;ch<=9;ch++){
            if(isSafe(row,col,ch,board)){
                board[row][col]=ch;
                
                if(!sudoku_solve(row,col+1,board)){
                    board[row][col]=0;
                }
                else return true;
            }
        }
    }
    else return sudoku_solve(row,col+1,board);
    
    return false;
}

function isSafe(row,col,ch,board){
    for(let i=0;i<board.length;i++){
        if(board[row][i]===ch) return false;
    }
    for(let i=0;i<board.length;i++){
        if(board[i][col]===ch) return false;
    }
    for(let i=0;i<3;i++){
        let row_s=row-row%3;
        let col_s=col-col%3;
        for(let j=0;j<3;j++){
            if(!(board[row_s+i][col_s+j]===board[row][col])&&board[row_s+i][col_s+j]===ch) return false;
        }
        
    }
    return true;
}


let solve=document.querySelector("button");
let buttons=document.querySelector(".buttons");
let table=document.querySelectorAll(".cells");

let table_arr=[];
let table_arr_solved=[];
let reset=document.createElement("button");
reset.innerText="Reset";
reset.setAttribute("class","button");
buttons.append(reset);
solve.addEventListener("click",()=>{
    let  k=0;
    for(let i=0;i<9;i++){
        let t_r=[];
        for(let j=0;j<9;j++){
            t_r[j]=Number(table[k].value);
            k++;
        }
        table_arr_solved[i]=t_r;
    }
       
    // let table_arr=table_arr_solved;
    
    sudoku_solve(0,0,table_arr_solved);
    console.log(table_arr_solved)
    k=0;
    for(let i=0;i<9;i++){
        for(let j=0;j<9;j++){
            table[k].value=table_arr_solved[i][j];
            k++;
        }
    }

    
    
})
reset.addEventListener("click",()=>{
    table.forEach((val,idx)=>{
        val.value="";
    })
    
})







