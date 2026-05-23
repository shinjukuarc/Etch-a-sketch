const body=document.querySelector('body')
const container=document.createElement('div')
container.classList.add('container')
body.appendChild(container)

const black=document.querySelector('.black')
const darken=document.querySelector('.intensify.BW')
const rgb=document.querySelector('.rgb')
const rgbOpaque=document.querySelector('.intensify.RGB')
let currentClass='black'

darken.classList.remove('intensify', 'BW')
rgb.classList.remove('rgb')
rgbOpaque.classList.remove('intensify', 'RGB')

black.addEventListener('click', ()=> {
    black.classList.add('black')
    darken.classList.remove('intensify', 'BW')
    rgb.classList.remove('rgb')
    rgbOpaque.classList.remove('intensify', 'RGB')
    currentClass='black'
})
darken.addEventListener('click', ()=> {
    darken.classList.add('intensify', 'BW')
    black.classList.remove('black')
    rgb.classList.remove('rgb')
    rgbOpaque.classList.remove('intensify', 'RGB')
    currentClass='darken'
})
rgb.addEventListener('click', ()=> {
    rgb.classList.add('rgb')
    darken.classList.remove('intensify', 'BW')
    black.classList.remove('black')
    rgbOpaque.classList.remove('intensify', 'RGB')
    currentClass='rgb'
})
rgbOpaque.addEventListener('click', ()=> {
    rgbOpaque.classList.add('intensify', 'RGB')
    darken.classList.remove('intensify', 'BW')
    black.classList.remove('black')
    rgb.classList.remove('rgb')
    currentClass='rgbOpaque'
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
    container.appendChild(rectangle)
    for (let c=0; c<16; c++) {
        let square=document.createElement('div')
        square.classList.add('square')
        rectangle.appendChild(square)
        hovered[r][c]=0
        colors[r][c]=[Math.floor(Math.random()*256),Math.floor(Math.random()*256),Math.floor(Math.random()*256)]
        square.addEventListener('mouseenter', (e)=>{if (hovered[r][c]!==10) hovered[r][c]++; changeColor(e.target,hovered[r][c],colors[r][c])})
    }
}

