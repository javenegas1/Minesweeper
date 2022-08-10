const grid = document.querySelector('.grid')

generateGame()
function generateGame(){
    let cells = []
    let totalMines = (100/10) + 3
    let gridArr = Array(100).fill('value')
    // include mines in grid
    randomBombs()
    function randomBombs(){
        for(i=0; i<totalMines; i++){
            gridArr[Math.floor(Math.random()*100)] = 'mine'
        }
    }
    //console.log(gridArr)

    // create grid with array 
    for(let i=0; i<100; i++){
        const cell = document.createElement('div')
        cell.setAttribute('id', i)
        cell.classList.add(gridArr[i])
        cells.push(cell)
        grid.appendChild(cell)
        cell.addEventListener('click', playGame)
    }
    //console.log(cells)    

    // add values to each cell
    let value = 0
    for(i=0; i<100; i++){
        if(cells[i].classList.contains('value')){
            // range 9-11 and +-1 on index values except on edge or corner cells
            // if() checking for mines in adjacent squares
            if()
            //html data attribute, ref. to w3 schools
            cells[i].setAttribute('data', value)
        }
    }
    // console.log(cells)
}
    //test code from previous attempt to make this might help
    // let value = 0
    // if(j!=0){
                //     mineGrid[i][j+1]='1' change this to update -> value+=1
                //     mineGrid[i][j-1]='1'
                //     mineGrid[i+1][j+1]='1'
                //     mineGrid[i+1][j-1]='1'
                // } else if(j==0) {
                //     mineGrid[i][j+1]='1'
                //     mineGrid[i+1][j+1]='1'
                // } 
                // if(i!=0){
                //     mineGrid[i+1][j]='1'
                //     mineGrid[i-1][j]='1'
                //     mineGrid[i-1][j+1]='1'
                //     mineGrid[i-1][j-1]='1'
                // }
                // if(i!=0 && j!=0){

                // }

//either step on mine or earn points

function playGame(e){
    if(e.target.hasAttribute('mine')){
        alert('game over')
        e.target.removeEventListener('click', null)
    }
    // alert('game over')
    // e.target.removeEventListener('click', null)
}