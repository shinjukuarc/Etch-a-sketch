const program=document.querySelector('.program')
const container=document.querySelector('.container')
program.appendChild(container)
const bigSquare=document.createElement('div')
bigSquare.classList.add('big-square')
container.appendChild(bigSquare)

const allButtons=document.querySelectorAll('button')
const black=document.querySelector('.black')
const darken=document.querySelector('.intensify.BW')
const rgb=document.querySelector('.rgb')
const rgbOpaque=document.querySelector('.intensify.RGB')
let currentClass='black'
black.id='highlight'

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

const clear=document.querySelector('.clear')
clear.addEventListener('click', ()=>{
const squares=document.querySelectorAll('.square')
squares.forEach(element=> element.style['background-color']='transparent')
})

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

let hovered=[]
let colors=[]
for (let r=0; r<16; r++) {
    hovered[r]=[]
    colors[r]=[]
    let rectangle=document.createElement('div')
    rectangle.classList.add('rectangle')
    bigSquare.appendChild(rectangle)
    for (let c=0; c<16; c++) {
        let square=document.createElement('div')
        square.classList.add('square')
        rectangle.appendChild(square)
        hovered[r][c]=0
        colors[r][c]=[Math.floor(Math.random()*256),Math.floor(Math.random()*256),Math.floor(Math.random()*256)]
        square.addEventListener('mouseenter', (e)=>{if (hovered[r][c]!==10) hovered[r][c]++; changeColor(e.target,hovered[r][c],colors[r][c])})
    }
}

