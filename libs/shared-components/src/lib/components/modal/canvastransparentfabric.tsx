import React, { useEffect, useRef, useState } from 'react'
 import fabric from 'fabric'

export interface CanvasTransparentFabricProps {
  imgUrl?,
  fileId?,
  allowToCreateNewPin?
  selectedNewTaskCoOrdinate?
}
export function CanvasTransparentFabric(props: CanvasTransparentFabricProps) {
  
  var circle = new fabric.Circle({
    radius: 100,
    fill: '#eef',
    scaleY: 0.5,
    originX: 'center',
    originY: 'center'
  });
  
  var text = new fabric.Text('hello world', {
    fontSize: 30,
    originX: 'center',
    originY: 'center'
  });
  
  var group = new fabric.Group([ circle, text ], {
    left: 150,
    top: 100,
    angle: -10
  });
  
  canvas.add(group);
  
  return (
    <div className="outsideWrapper">
      <div className="insideWrapper">
      <canvas className="coveringCanvas"
          width="800" height="700" style={{border: "2px solid red"}}
          // onMouseDown={handleMouseDown}
          // onMouseMove={handleMouseMove}
          // onMouseUp={handleMouseUp}
          // onMouseOut={handleMouseOut}
          // ref={canvasToDrawCircle}
          ></canvas>
      </div>
    </div>
  );
}


export default CanvasTransparentFabric;


