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

  useEffect(() => {
    console.log('---useEffect--contextRef--')
    const canvas = canvasRef.current
    canvas.width = window.innerWidth * 2
    canvas.height = window.innerHeight * 2
    canvas.style.width = `${window.innerWidth * 2}`
    canvas.style.height = `${window.innerHeight * 2}`

    const context = canvas.getContext("2d")
    context.scale(2, 2)
    context.lineCap = "round"
    context.strokeStyle = "black"
    context.lineWidth = 5
    contextRef.current = context

  }, [])

  const startCircleDrawing = ({ nativeEvent }) => {
    console.log('---startCircleDrawing--')
    const { offsetX, offsetY } = nativeEvent
    contextRef.current.beginPath()
    contextRef.current.moveTo(offsetX, offsetY)
    setIsDrawing(true)
  }

  const finishCircleDrawing = () => {
    console.log('---finishCircleDrawing--')
    contextRef.current.closePath()
    setIsDrawing(false)
  }

  const drawCircle = ({ nativeEvent }) => {
    console.log('---drawCircle--')
    if (!isDrawing) {
      return
    }
    const { offsetX, offsetY } = nativeEvent

    contextRef.current.lineTo(offsetX, offsetY)
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

        <canvas
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
