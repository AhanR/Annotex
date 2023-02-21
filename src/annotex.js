let penDown = false;
let lastPos = {x : 0, y: 0}
let ctx = null;
let penClr = "#ff0000";

function closeCanvas() {
    const canvasContainer = document.querySelector(".annotex-canvas-element");
    canvasContainer.parentElement.removeChild(canvasContainer);
    ctx = null;
}

function drawOnCanvas(evt){
    console.log(evt);
}

const createDrawingElement = () => {
    const canvasContainer = document.createElement("div");
    canvasContainer.className = "annotex-canvas-element";
    const canvasElement = document.createElement("canvas");
    canvasElement.width = window.innerWidth;
    canvasElement.height = window.innerHeight;
    const context = canvasElement.getContext("2d");
    ctx = context;
    context.strokeStyle = penClr;
    context.lineWidth = 4;
    canvasContainer.addEventListener('mousedown',(evt)=>{
        penDown = true;
        lastPos.x = evt.offsetX;
        lastPos.y = evt.offsetY;
        context.beginPath()
        context.rect(lastPos.x, lastPos.y,1,1);
        context.stroke();
    })
    canvasContainer.addEventListener('mouseup',(evt)=>{
        penDown = false;
    })
    canvasContainer.addEventListener('mousemove',(evt)=>{
        if(penDown) {
            context.beginPath()
            context.moveTo(lastPos.x, lastPos.y);
            context.lineTo(evt.offsetX, evt.offsetY);
            context.closePath();
            context.strokeStyle = penClr;
            context.stroke();
            lastPos.x = evt.offsetX;
            lastPos.y = evt.offsetY;
        }
    })
    canvasContainer.appendChild(canvasElement);
    const closeButton = document.createElement("button");
    closeButton.innerText = "x";
    closeButton.onclick = closeCanvas;
    canvasContainer.appendChild(closeButton);
    let penColorPicker = document.createElement("input");
    penColorPicker.type = "color";
    penColorPicker.name = "penColour";
    penColorPicker.className = "pen-colour-selector";
    penColorPicker.value = penClr;
    penColorPicker.addEventListener("input", (evt) => {
        penClr = evt.target.value;
        context.fillStyle = evt.target.value;
    })
    canvasContainer.appendChild(penColorPicker);
    const clearButton = document.createElement("button");
    clearButton.className = "clear-canvas-button";
    clearButton.addEventListener("click", e=> {
        closeCanvas();
        addCanvas();
    })
    clearButton.innerText = "+";
    canvasContainer.appendChild(clearButton);
    return canvasContainer;
}

function addCanvas(){
    if(!ctx){
        const canvas = createDrawingElement();
        document.body.append(canvas);
    } else {
        closeCanvas();
        addCanvas();
    }
}

console.log("loaded");