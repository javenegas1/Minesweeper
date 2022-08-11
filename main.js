const grid = document.querySelector('.grid')
const reset = document.querySelector('.reset-button')
let cells = []

generateGame()
function generateGame(){
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
        grid.appendChild(cell)
        cells.push(cell)
        cell.addEventListener('click', playGame, {once: true})
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

//either step on mine or earn points
//playGame(document.getElementById('1').click())
function playGame(e){
    let position = e.target.id
    //console.log(e.target.id, document.getElementById(`${parseInt(position)}`))
    if(e.target.classList.contains('mine')){
        //e.target.style.backgroundColor = 'red'
        alert('game over')
        // for(i=99; i>0; i--){
        //     if(document.getElementById(i).classList.contains('mine')){
        //         console.log(`mine at: ${i}`)
        //         //document.getElementById(i).classList.remove('mine')
        //         playGame(document.getElementById(`${i}`).click())
        //     }
        //     else{
        //         continue;
        //     }
        // }
    } 
    if(e.target.classList.contains('clicked')){
        return;
    }
    //console.log(e.target.getAttribute('data'))
    //get attribute data pulls out the value assigned to cell according to adjacent mines
    if(e.target.hasAttribute('data')){
        e.target.innerHTML = e.target.getAttribute('data')
        if(e.target.innerHTML != '0'){
            e.target.classList.add('clicked')
            return;
        } 
        if(e.target.innerHTML == '0') {
                if(parseInt(position) > 0 && parseInt(position)%10 !== 0){
                    let newPosition = parseInt(position) - 11
                    playGame(document.getElementById(newPosition).click())
                }
                else if(parseInt(position) > 9){
                    let newPosition = parseInt(position) - 10
                    playGame(document.getElementById(newPosition).click())
                }
                else if(parseInt(position) > 9 && parseInt(position)%10 !== 9){
                    let newPosition = parseInt(position) - 9
                    playGame(document.getElementById(newPosition).click())
                }
                else if(parseInt(position) > 0 && parseInt(position)%10 !== 0){
                    let newPosition = parseInt(position) - 1
                    playGame(document.getElementById(newPosition).click())
                }
                else if(parseInt(position) > 9 && parseInt(position)%10 !== 9){
                    let newPosition = parseInt(position) +1
                    playGame(document.getElementById(newPosition).click())
                }
                else if(parseInt(position) < 90 && parseInt(position)%10 !== 0){
                    let newPosition = parseInt(position) + 9
                    playGame(document.getElementById(newPosition).click())
                }    
                else if(parseInt(position) < 90){
                    let newPosition = parseInt(position) + 10
                    playGame(document.getElementById(newPosition).click())
                }    
                else if(parseInt(position) < 90 && parseInt(position)%10 !== 9){
                    let newPosition = parseInt(position) + 11
                    playGame(document.getElementById(newPosition).click())
                } 
        }

        // if(e.target.innerHTML == '0'){
        //     console.log(position)
            // while(e.target.hasAttribute('data')){
            //     playGame()
            //     //e is event, event is click, click is initiated when individual cell is clicked
            //     //when cell is clicked, if cell is 0, cells around it should also be 'clicked'
            //     //cell has id number attached to it, access id (set id equal to variable that can 
            //     // be modified to bring back another id)
            //     //trigger new click event based on number
            //     //   .id = `${position + 1}`???
            // }
        // }

        // if(e.target.innerHTML == '0'){
        //clickedZero(e, position)
        // }
    }
    // clickedZero(e, position)
    e.target.classList.add('clicked')
}

//reveal mines

// function revealMines(e){
//     for(i=99; i>0; i--){
//         if(document.getElementById(i).classList.contains('mine')){
//             console.log(`mine at: ${i}`)
//             document.getElementById(i).classList.remove('mine')
//             revealMines(document.getElementById(`${i}`).click())
//         }
//         else{
//             break;
//         }
//     }
// }




// console.log(cells[9].id)

// surrounding squares where value is zero or another value

// function clickedZero(e, position){
//     // setTimeout(() => {
//     //     if(parseInt(position) > 0 && parseInt(position)%10 !== 0){
//     //         let newPosition = parseInt(position) - 11
//     //         let newCell = document.getElementById(newPosition)
//     //         playGame(document.getElementById('1'))
//     //     }
//     //     if(parseInt(position) > 9){
//     //         let newPosition = parseInt(position) - 10
//     //         let newCell = document.getElementById('1')
//     //         playGame(newCell)
//     //     }
//     // }, 300);
// }

// reset button
reset.addEventListener('click', resetButton)
function resetButton (e) {
    location.reload()
}

// win condition

function winGame(e){
    for(i=0; i<cells.length; i++){
        let count = 0
        if(document.getAttribute('clicked') == true){
            count++
        }
    }
    if(count=87){
    alert('you win')
    }
}