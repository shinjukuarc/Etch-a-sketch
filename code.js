//call program and container from HTML and create bigSquare as a (div), the logic is program->container->bigSquare
const program=document.querySelector('.program')
const container=document.querySelector('.container')
program.appendChild(container)
const bigSquare=document.createElement('div')
bigSquare.classList.add('big-square')
container.appendChild(bigSquare)

//call all buttons from HTML
const allButtons=document.querySelectorAll('button')
const black=document.querySelector('.black')
const darken=document.querySelector('.intensify.BW')
const rgb=document.querySelector('.rgb')
const rgbOpaque=document.querySelector('.intensify.RGB')
//create a variable (currentClass) that indicates the button choosen in code, initialise it to black so that without clicking on any button the option would be black, highlight just indicated if its choosen visually 
let currentClass='black'
black.id='highlight'

//each of the colours button given an onclick that changes both the currentClass and highlight
black.addEventListener('click', ()=> {
    currentClass='black'
    allButtons.forEach(element=> {element.id=''})
    black.id='highlight'
})
darken.addEventListener('click', ()=> {
    currentClass='darken'
    allButtons.forEach(element=> {element.id=''})
    darken.id='highlight'
})
rgb.addEventListener('click', ()=> {
    currentClass='rgb'
    allButtons.forEach(element=> {element.id=''})
    rgb.id='highlight'
})
rgbOpaque.addEventListener('click', ()=> {
    currentClass='rgbOpaque'
    allButtons.forEach(element=> {element.id=''})
    rgbOpaque.id='highlight'
})

//the clear button is given an onclick that clears all coloures
const clear=document.querySelector('.clear')
clear.addEventListener('click', ()=>{
const squares=document.querySelectorAll('.square')
squares.forEach(element=> element.style['background-color']='transparent')
})

//this is the function used for colouring the squares
const changeColor=(x,y,z)=> {
    let opacity=y/10;
    if (currentClass==='black') {
        x.style['background-color']='black'
    } else if (currentClass==='darken') {
        x.style['background-color']=`rgba(0, 0, 0, ${opacity})`
    } else if (currentClass==='rgb') {
        let r=Math.floor(Math.random()*256),
            g=Math.floor(Math.random()*256),
            b=Math.floor(Math.random()*256);
        x.style['background-color']=`rgb(${r},${g},${b})`
    } else if (currentClass==='rgbOpaque') {
        x.style['background-color']=`rgba(${z[0]}, ${z[1]}, ${z[2]}, ${opacity})`
    }
}

//the hovered array is used to store how many times have the specific square been hovered on which is used in intensifying colour feature
//the colors array is used only for the rgnOpaque or intensifying rgb feature which stores the colour of each square (but it ain't limited to ts as it stores all squares colour, so can be used in other things)
let hovered=[]
let colors=[]
//the for loop creates the grid and it works in the logic of a column by row, that is the default grid (16x16) that appears without the user entering any rows and columns numbers
for (let r=0; r<16; r++) {
    //as this is a 2D loop then the arrays storing each square should also be 2D
    hovered[r]=[]
    colors[r]=[]
    //create a rectangle for each row so that now the logic is bigSquare -> rectangle
    let rectangle=document.createElement('div')
    rectangle.classList.add('rectangle')
    bigSquare.appendChild(rectangle)
    for (let c=0; c<16; c++) {
        //create the square so that now the logic is rectangle -> square
        let square=document.createElement('div')
        square.classList.add('square')
        rectangle.appendChild(square)
        //initialising the hover for each square to 0 (not hovered till now)
        hovered[r][c]=0
        colors[r][c]=[Math.floor(Math.random()*256),Math.floor(Math.random()*256),Math.floor(Math.random()*256)]
        //the square is given an onmouseenter that incrementst times hovered on each square and uses the changeColour function to colour the square
        square.addEventListener('mouseenter', (e)=>{if (hovered[r][c]!==10) hovered[r][c]++; changeColor(e.target,hovered[r][c],colors[r][c])})
    }
}

//calls the amount of rows and columns entered by the user and the button from html
let rows=document.querySelector('.row-amount')
let cols=document.querySelector('.col-amount')
let createBtn=document.querySelector('.create')

//a function that is used to create squares the same as the for loop above but depending on the user input of rows and columns
let createSquares=()=> {
    //the input is validated of rows and columns
    if (+rows.value>0 &&+rows.value<=72 && +cols.value>0 &&+cols.value<=100)  {
        //resets the squares from the default grid
        bigSquare.innerHTML=''
        hovered=[]
        colors=[]
        //just loop like the previous loop but with users input
        for (let row=0; row<+rows.value; row++) {
            hovered[row]=[]
            colors[row]=[]
            let rectangle=document.createElement('div')
            rectangle.classList.add('rectangle')
            bigSquare.appendChild(rectangle)
            for (let col=0; col<+cols.value; col++) {
                let square=document.createElement('div')
                square.classList.add('square')
                rectangle.appendChild(square)
                //implement an if statement so that when the amount of rows and columns gets bigger, decrease the size of the square so it can be visible by decreasing the padding
                if (+rows.value>54 || +cols.value>88) {
                    square.style['padding']='5px'
                } else if ((+rows.value<=54 && +rows.value>30) || (+cols.value<=88 && +cols.value>62)) {
                    square.style['padding']='7px'
                }
                hovered[row][col]=0
                colors[row][col]=[Math.floor(Math.random()*256),Math.floor(Math.random()*256),Math.floor(Math.random()*256)]
                square.addEventListener('mouseenter', (e)=>{if (hovered[row][col]!==10) hovered[row][col]++; changeColor(e.target,hovered[row][col],colors[row][col])})
            }
        }
    }
}

//the create button is given an onclick that creates the squares using the previous function
createBtn.addEventListener('click', ()=> {
    createSquares()
})
//the enter key can be pressed inside the input area to create the squares instead of the create button
rows.addEventListener('keydown', (e)=> {
    if (e.key==='Enter') {
        createSquares()
    }
})
cols.addEventListener('keydown', (e)=> {
    if (e.key==='Enter') {
        createSquares()
    }
})
