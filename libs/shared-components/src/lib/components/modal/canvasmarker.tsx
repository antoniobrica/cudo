import React, { Component, useEffect, useRef, useState } from 'react'

export interface CanvasMarkerProps {
  imgUrl?,
  fileId?,
  allowToCreateNewPin?
}

export function CanvasMarker(props: CanvasMarkerProps) {

  const canvasRef = useRef(null)
  const contextRef = useRef(null)

  const [isDrawing, setIsDrawing] = useState(null)
  const [xAxis, setXAxis] = useState(0)
  const [yAxis, setYAxis] = useState(0)
  const circleRadious = 10


  useEffect(() => {
    console.log('-CanvasMarker--useEffect--contextRef--')
    // const canvas = canvasRef.current
    // canvas.width = window.innerWidth * 2
    // canvas.height = window.innerHeight * 2
    // canvas.style.width = `${window.innerWidth * 2}`
    // canvas.style.height = `${window.innerHeight * 2}`

    // const context = canvas.getContext("2d")
    // context.scale(2, 2)
    // context.lineCap = "round"
    // context.strokeStyle = "black"
    // context.lineWidth = 5
    // contextRef.current = context


    // ===================
    const canvas = canvasRef.current;
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;

    // draw circle
    const circleContext = canvas.getContext("2d")
    // circleContext.globalAlpha = 0.15

    const pointSize = 10; // Change according to the size of the point.
    circleContext.fillStyle = "blue"
    circleContext.beginPath(); //Start path
    circleContext.arc(xAxis, yAxis, pointSize, 0, Math.PI * 2, true); // Draw a point using the arc function of the canvasToDrawCircle with a point structure.
    circleContext.fill(); // Close the path and fill.
    circleContext.closePath();
    circleContext.stroke();

    // draw pin number in circle
    circleContext.beginPath(); //Start path
    circleContext.fillStyle = "black";
    // circleContext.fillText(JSON.stringify(pinList.length + 1), xAxis - 3, yAxis + 3)
    circleContext.fillText("1", xAxis - 3, yAxis + 3)
    circleContext.fill();
    circleContext.closePath();
    circleContext.stroke();
    // }
    console.log('--canvasTansparent--circleContext--', circleContext)
    contextRef.current = circleContext
    // ===================
  }, [])


  const startCircleDrawing = ({ nativeEvent }) => {
    console.log('-CanvasMarker--startCircleDrawing--')
    const { offsetX, offsetY } = nativeEvent

    setXAxis(offsetX - contextRef.current.clientLeft);
    setYAxis(offsetY - contextRef.current.clientTop);

    setIsDrawing(true)
  }

  const finishCircleDrawing = () => {
    console.log('-CanvasMarker--finishCircleDrawing--')
    contextRef.current.closePath()
    setIsDrawing(false)
  }

  const drawCircle = ({ nativeEvent }) => {
    console.log('-CanvasMarker--drawCircle--')
    if (!isDrawing) {
      return
    }
    const { offsetX, offsetY } = nativeEvent
    setXAxis(offsetX)
    setYAxis(offsetY)
    // contextRef.current.lineTo(offsetX, offsetY)
    contextRef.current.moveTo(offsetX, offsetY)
    contextRef.current.stroke()
  }

  return (
    <div className="outsideWrapper">
      <div className="insideWrapper">
        {/*   <canvas className="coveringCanvas"
              width="800" height="700"
            //   onMouseDown={handleMouseDown}
            //   onMouseMove={handleMouseMove}
            //   onMouseUp={handleMouseUp}
            //   onMouseOut={handleMouseOut}
            //   ref={canvasToDrawCircle}
              ></canvas>   */}

        <canvas width="800" height="700" className="coveringCanvas"
          onMouseDown={startCircleDrawing}
          onMouseUp={finishCircleDrawing}
          onMouseMove={drawCircle}
          ref={canvasRef}
        />
      </div>
    </div>
  );
}
export default CanvasMarker;



// var canvas = document.querySelector('canvas');
// var context = canvas.getContext('2d');
// var offset = canvas.getBoundingClientRect();

// /**
//  * @param {number} x
//  * @param {number} y
//  * @param {number} radius
//  */
// function draw(x, y, radius) {
//   context.clearRect(0, 0, canvas.width, canvas.height);
//   context.beginPath();
//   context.arc(x, y, radius, 0, 2 * Math.PI, false);
//   context.fillStyle = 'skyblue';
//   context.fill();
//   context.lineWidth = 5;
//   context.strokeStyle = '#030';
//   context.stroke();
// }

// draw(canvas.width / 2, canvas.height / 2, 50);

// window.addEventListener('mousedown', function(event) {
//   draw(event.clientX - offset.x, event.clientY - offset.y, 50);
// });