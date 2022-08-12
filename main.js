let cells = []
const reset = document.querySelector('.reset-button')
const grid = document.querySelector('.grid')

generateGame()
function generateGame(){

    let totalMines = (100/10) + 5
    let gridArr = Array(100).fill('value')
    // include mines in grid
    randomBombs()
    function randomBombs(){
        for(i=0; i<=totalMines; i++){
            gridArr[Math.floor(Math.random()*100)] = 'mine'
        	}
        }
        
    for(let i=0; i<100; i++){
        const cell = document.createElement('div')
        cell.setAttribute('id', i)
        cell.classList.add(gridArr[i])
        grid.appendChild(cell)
        cells.push(cell)
        cell.addEventListener('click', function(e) {
        	playGame(cell)
        })
    }

    // add values to each cell
    for(i=0; i<100; i++){
        let value = 0
        if(cells[i].classList.contains('value')){
            // range 9-11 and +-1 on index values except on edge or corner cells
            // if() checking for mines in adjacent squares
            if(i>10 && i%10!==0 && cells[i-11].classList.contains('mine')) {
                value+=1
            }
            if(i>9 && cells[i-10].classList.contains('mine')) {
                value+=1
            }
            if(i>9 && i%10!==9 && cells[i-9].classList.contains('mine')) {
                value+=1
            }
            if(i>0 && i%10!==0 && cells[i-1].classList.contains('mine')) {
                value+=1
            }
            if(i%10!==9 && cells[i+1].classList.contains('mine')) {
                value+=1
            }
            if(i<90 && i%10!==0 && cells[i+9].classList.contains('mine')) {
                value+=1
            }
            if(i<90 && cells[i+10].classList.contains('mine')) {
                value+=1
            }
            if(i<90 && i%10!==9 && cells[i+11].classList.contains('mine')) {
                value+=1
            }
            //html "data" attribute, ref. to w3 schools
            cells[i].setAttribute('data', value)
        }
    }
}
//console.log(cells[1])
let clickedCount = 0
let gameOver = false
//either step on mine or retrieve value
function playGame(cell){
    let position = cell.id
    if(gameOver) {
        return
    }
    if(cell.classList.contains('clicked')){
    	return
    }
    if(cell.classList.contains('mine')){
        //e.target.style.backgroundColor = 'red'
        cells.forEach(cell => {
            if (cell.classList.contains('mine')) {
                cell.style.backgroundColor = 'red'
            }
          })
          breakGame(cell)
          gameOver = true
    } else if (cell.classList.contains('value')){
        
        // win logic
        clickedCount++
        if(clickedCount === 85){
            console.log('you win')
            document.querySelector('.gameDecision').innerHTML = 'You Won!!!'

        }

        cell.innerHTML = cell.getAttribute('data')
        if(cell.innerHTML != '0'){
            cell.classList.add('clicked')
            return
        } 
        clickedZero(cell, position)
    }
    cell.classList.add('clicked')
}

//reveal mines

// console.log(cells[9].id)

// surrounding squares where value is zero or another value

function clickedZero(cell, position){
    //timeout to allow first function to process before returning values
    setTimeout(() => {
        // same logic as mine checking 9-11 or +-1 on index values
        if(parseInt(position) > 9 && parseInt(position)%10 !== 0){
            let newPosition = parseInt(position) - 11
            playGame(document.getElementById(newPosition))
        }
        if(parseInt(position) > 9){
            let newPosition = parseInt(position) - 10
            playGame(document.getElementById(newPosition))
        }
        if(parseInt(position) > 9 && parseInt(position)%10 !== 9){
            let newPosition = parseInt(position) - 9
            playGame(document.getElementById(newPosition))
        }
        if(parseInt(position) > 0 && parseInt(position)%10 !== 0){
            let newPosition = parseInt(position) - 1
            playGame(document.getElementById(newPosition))
        }
        if(parseInt(position) < 99 && parseInt(position)%10 !== 9){
            let newPosition = parseInt(position) +1
            playGame(document.getElementById(newPosition))
        }
        if(parseInt(position) < 90 && parseInt(position)%10 !== 0){
            let newPosition = parseInt(position) + 9
            playGame(document.getElementById(newPosition))
        }    
        if(parseInt(position) < 90){
            let newPosition = parseInt(position) + 10
            playGame(document.getElementById(newPosition))
        }    
        if(parseInt(position) < 90 && parseInt(position)%10 !== 9){
            let newPosition = parseInt(position) + 11
            playGame(document.getElementById(newPosition))
        } 
    }, 300)
}

//game over
function breakGame(cell){
    alert('You Lost!!!')
    document.querySelector('.gameDecision').innerHTML = 'Loser! Try another game LOL!'
}

function playerWins(cell){
    let clickedArr = []
    
}

// reset button
reset.addEventListener('click', resetButton)
function resetButton (e) {
    location.reload()
}
