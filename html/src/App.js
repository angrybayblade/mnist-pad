import React from 'react';
import "./App.css";

const App = (prop) =>{
  let x,y,can,ctx;
  let [last,lastState] = React.useState({
    Lx:0,
    Ly:0
  })

  let [d,dState] = React.useState({
    draw:false
  })

  function draw(e){
    can = document.getElementById("canvas");
    ctx = can.getContext("2d");
    
    x = e.pageX - can.offsetLeft;
    y = e.pageY - can.offsetTop ;

    if (d.draw){
      ctx.lineJoin = "round";
      ctx.lineWidth = 15;
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

  
  return(
    <div className="main">
      <canvas 
        onMouseMove={draw}  
        onMouseDown={()=>{dState({draw:true})}}   
        onMouseUp={()=>{dState({draw:false})}}
        id="canvas" 
        height="350px"
        width="350px"
      >

      </canvas>
    </div>
  )
}

export default App;
