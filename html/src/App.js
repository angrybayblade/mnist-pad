import React from 'react';
import axios from 'axios';
import "./App.css";

const App = (prop) =>{
  let x,y,can,ctx,img;
  let [last,lastState] = React.useState({
    Lx:0,
    Ly:0
  })

  let [d,dState] = React.useState({
    draw:false
  })

  function draw(e){
    can = e.target;
    ctx = can.getContext("2d");
    
    x = e.pageX - can.offsetLeft;
    y = e.pageY - can.offsetTop ;

    if (d.draw){
      ctx.lineJoin = "round";
      ctx.lineWidth = 25;
      ctx.moveTo(last.Lx,last.Ly);
      ctx.lineTo(x, y);
      ctx.closePath();
      ctx.stroke();
    }

    lastState({
      Lx:x,
      Ly:y
    })

  }

  function clear(){
    can = document.getElementById("canvas");
    ctx = can.getContext("2d");
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.beginPath();
    ctx.moveTo(0,0);
    ctx.lineTo(0,0);
    ctx.stroke();
  }
  
  async function predict(){
    can = document.getElementById("canvas");
    img = can.toDataURL("image/png");
    console.log(img)
    await axios({
      url:"http://localhost:80/predict",
      method:"POST",
      data:{
        image_data:img
      }
    })
  }


  return(
    <div className="main">
      <div className="title">
        MNIST PAD
      </div>
      <div className="canvas-area">
        <canvas 
          onMouseMove={draw}  
          onMouseDown={()=>{dState({draw:true})}}   
          onMouseUp={()=>{dState({draw:false});predict()}}
          id="canvas" 
          height="350px"
          width="350px"
        >
        </canvas>
        <div className="tools">
            <button onClick={clear}>Clear</button>
        </div>
      </div>
      <div className='footer'>
        FOOTER
      </div>
    </div>
  )
}

export default App;
