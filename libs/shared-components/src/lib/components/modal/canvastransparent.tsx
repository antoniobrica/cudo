
import React, { useEffect, useRef } from 'react'

export interface CanvasTransparentProps {
  imgUrl?,
  fileId?,
  allowToCreateNewPin?
  selectedNewTaskCoOrdinate?
}

export function CanvasTransparent(props: CanvasTransparentProps) {
  const canvasToDrawCircle = useRef<HTMLCanvasElement>();
  const canvasToDrawImage = useRef<HTMLCanvasElement>();
  const ctxToDrawCircle = useRef(null)

  const [isCircleSelectedOnMouseDown, setIsCircleSelectedOnMouseDown] = React.useState<boolean>(false);
  const [isCircleSelectedOnMouseHover, setIsCircleSelectedOnMouseHover] = React.useState<boolean>(false);
  const [dragTarget, setDragTarget] = React.useState(null);
  const [x_axis, setx_Axis] = React.useState<number>(5);
  const [y_axis, sety_Axis] = React.useState<number>(5);
  let startX = null;
  let startY = null;

  // initialize the canvasToDrawCircle context
  useEffect(() => {
    console.log('--canvasTansparent-------useEffect--setCtxToDrawCircle--')
    const canvasToDrawCircleEle = canvasToDrawCircle.current;
    canvasToDrawCircleEle.width = canvasToDrawCircleEle.clientWidth;
    canvasToDrawCircleEle.height = canvasToDrawCircleEle.clientHeight;

    const circleContext = canvasToDrawCircleEle.getContext("2d")
    circleContext.globalAlpha = 0.15

    const imgagDraw = new Image();
    imgagDraw.src = props.imgUrl;
    imgagDraw.onload = function () {
      const hRatio = canvasToDrawCircle.current.clientWidth / imgagDraw.width;
      const vRatio = canvasToDrawCircle.current.clientHeight / imgagDraw.height;
      const ratio = Math.min(hRatio, vRatio);
      circleContext.drawImage(imgagDraw, 0, 0, imgagDraw.width, imgagDraw.height, 0, 0, imgagDraw.width * ratio, imgagDraw.height * ratio);

      console.log('--canvasTansparent-----drawFillCircle----')
      const pointSize = 10; // Change according to the size of the point.
      //   circleContext.fillStyle = info.isHovering ? info.hovercolor : info.newcolor;
      circleContext.fillStyle = "blue"
      circleContext.beginPath(); //Start path
      console.log('--canvasTansparent--x-axis--Y-axis--pointsize', x_axis, y_axis, pointSize)
      circleContext.arc(x_axis, y_axis, pointSize, 0, Math.PI * 2, true); // Draw a point using the arc function of the canvasToDrawCircle with a point structure.
      circleContext.fill(); // Close the path and fill.
      circleContext.closePath();
      circleContext.stroke();
      circleContext.beginPath(); //Start path
      circleContext.fillStyle = "black";
      // circleContext.fillText(JSON.stringify(pinList.length + 1), x_axis - 3, y_axis + 3)
      circleContext.fillText("1", x_axis - 3, y_axis + 3)
      circleContext.fill();
      circleContext.closePath();
      circleContext.stroke();
    }
    console.log('--canvasTansparent--circleContext--', circleContext)
    ctxToDrawCircle.current = circleContext

  }, []);

  useEffect(() => {
    console.log('--canvasTansparent---useEffect--redrawOnMouseHoverOverCircle----')
    if (!isCircleSelectedOnMouseHover)
      return;
    redrawOnMouseHoverOverCircle();
    setIsCircleSelectedOnMouseHover(false);
  }, [isCircleSelectedOnMouseHover]);

  const redrawOnMouseHoverOverCircle = () => {
    console.log('--canvasTansparent-----redrawOnMouseHoverOverCircle----')
    // if (ctxToDrawCircle) {
    //   ctxToDrawCircle.clearRect(0, 0, canvasToDrawCircle.current.clientWidth, canvasToDrawCircle.current.clientHeight);
    //   drawImagesWithPinsOnMouseHover();
    // }
  }

  const handleMouseDown = e => {
    console.log('--1--canvasTansparent-----handleMouseDown----')
    startX = e.nativeEvent.offsetX - canvasToDrawCircle.current.clientLeft;
    startY = e.nativeEvent.offsetY - canvasToDrawCircle.current.clientTop;
    setx_Axis(startX);
    sety_Axis(startY);
    console.log('--2--canvasTansparent-----handleMouseDown---startX, startY-', startX, startY)

  }

  const handleMouseMove = e => {
    if (!isCircleSelectedOnMouseHover) {
      startX = e.nativeEvent.offsetX - canvasToDrawCircle.current.clientLeft;
      startY = e.nativeEvent.offsetY - canvasToDrawCircle.current.clientTop;
      setx_Axis(startX);
      sety_Axis(startY);
      // console.log('--2--canvasTansparent-----handleMouseMove---startX, startY-', startX, startY)
    }
    if (!isCircleSelectedOnMouseDown) return;
    // console.log('--canvasTansparent----canvas-6-isCircleSelectedOnMouseDown on mouse move', isCircleSelectedOnMouseDown)
    const mouseX = e.nativeEvent.offsetX - canvasToDrawCircle.current.clientLeft;
    const mouseY = e.nativeEvent.offsetY - canvasToDrawCircle.current.clientTop;
    startX = mouseX;
    startY = mouseY;
    
    const dragObj = { ...dragTarget }
    dragObj.x = startX;
    dragObj.y = startY;
    dragObj.isNewPin = true;
    setDragTarget({ ...dragObj });
    console.log('--1--canvasTansparent-----handleMouseMove---startX,startY, dragTarget, dragObj-', startX,startY, dragTarget, dragObj)

  }

  const handleMouseUp = e => {
    console.log('--canvasTansparent-----handleMouseUp--setIsCircleSelectedOnMouseDown--')
    setIsCircleSelectedOnMouseDown(false);
    ctxToDrawCircle.current.closePath()
    props.selectedNewTaskCoOrdinate({ x_axis, y_axis })
  }

  const handleMouseOut = e => {
    console.log('--canvasTansparent-----handleMouseOut--handleMouseUp--')
    handleMouseUp(e);

  }

  return (
    <div className="outsideWrapper">
      <div className="insideWrapper">
        <canvas className="coveringCanvas"
          width="800" height="700"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseOut={handleMouseOut}
          ref={canvasToDrawCircle}></canvas>
      </div>
    </div>
  );
}


export default CanvasTransparent;


