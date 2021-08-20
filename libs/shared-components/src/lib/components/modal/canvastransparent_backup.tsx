
import React, { useEffect, useRef } from 'react'

export interface CanvasTransparentProps_bkp {
  imgUrl?,
  fileId?,
  allowToCreateNewPin?
  selectedNewTaskCoOrdinate?
}

export function CanvasTransparent_bkp(props: CanvasTransparentProps_bkp) {
  const canvasTransToDrawCircle = useRef<HTMLCanvasElement>();
  const canvasToDrawImage = useRef<HTMLCanvasElement>();
  // const ctxTransToDrawCircle = useRef(null)

  const [pinList, setpinList] = React.useState([]);
  const [ctxTransToDrawCircle, setCtxTransToDrawCircle] = React.useState(null);

  const [isCircleSelectedOnMouseDown, setIsCircleSelectedOnMouseDown] = React.useState<boolean>(false);
  const [isCircleSelectedOnMouseHover, setIsCircleSelectedOnMouseHover] = React.useState<boolean>(false);
  const [dragTarget, setDragTarget] = React.useState(null);
  const [x_axis, setx_Axis] = React.useState<number>(5);
  const [y_axis, sety_Axis] = React.useState<number>(5);
  let startX = null;
  let startY = null;

  // initialize the canvasTransToDrawCircle context
  // useEffect(() => {
  //   console.log('--canvasTansparent-------useEffect--setCtxTransToDrawCircle--')
  //   const canvasToDrawCircleEle = canvasTransToDrawCircle.current;
  //   canvasToDrawCircleEle.width = canvasToDrawCircleEle.clientWidth;
  //   canvasToDrawCircleEle.height = canvasToDrawCircleEle.clientHeight;

  //   const circleContext = canvasToDrawCircleEle.getContext("2d")
  //   circleContext.globalAlpha = 0.15

  //   const imgagDraw = new Image();
  //   imgagDraw.src = props.imgUrl;
  //   imgagDraw.onload = function () {
  //     const hRatio = canvasTransToDrawCircle.current.clientWidth / imgagDraw.width;
  //     const vRatio = canvasTransToDrawCircle.current.clientHeight / imgagDraw.height;
  //     const ratio = Math.min(hRatio, vRatio);
  //     circleContext.drawImage(imgagDraw, 0, 0, imgagDraw.width, imgagDraw.height, 0, 0, imgagDraw.width * ratio, imgagDraw.height * ratio);

  //     console.log('--canvasTansparent-----drawFillCircle----')
  //     const pointSize = 10; // Change according to the size of the point.
  //     //   circleContext.fillStyle = info.isHovering ? info.hovercolor : info.newcolor;
  //     circleContext.fillStyle = "blue"
  //     circleContext.beginPath(); //Start path
  //     console.log('--canvasTansparent--x-axis--Y-axis--pointsize', x_axis, y_axis, pointSize)
  //     circleContext.arc(x_axis, y_axis, pointSize, 0, Math.PI * 2, true); // Draw a point using the arc function of the canvasTransToDrawCircle with a point structure.
  //     circleContext.fill(); // Close the path and fill.
  //     circleContext.closePath();
  //     circleContext.stroke();
  //     circleContext.beginPath(); //Start path
  //     circleContext.fillStyle = "black";
  //     // circleContext.fillText(JSON.stringify(pinList.length + 1), x_axis - 3, y_axis + 3)
  //     circleContext.fillText("1", x_axis - 3, y_axis + 3)
  //     circleContext.fill();
  //     circleContext.closePath();
  //     circleContext.stroke();
  //   }
  //   console.log('--canvasTansparent--circleContext--', circleContext)
  //   ctxTransToDrawCircle.current = circleContext

  // }, []);

  useEffect(() => {
    console.log('--canvas---useEffect--initialize the canvasTransToDrawCircle context--')
    const canvasToDrawCircleEle = canvasTransToDrawCircle.current;
    canvasToDrawCircleEle.width = canvasToDrawCircleEle.clientWidth;
    canvasToDrawCircleEle.height = canvasToDrawCircleEle.clientHeight;
   
    setCtxTransToDrawCircle(canvasToDrawCircleEle.getContext("2d"));
    
    // getPins().then(() => {
    //   console.log("--canvas-0-getPins Done", props.allowToCreateNewPin)
    // })

  }, []);

  useEffect(() => {
    console.log('--canvasTansparent---useEffect--redrawOnMouseHoverOverCircle----')
    if (!isCircleSelectedOnMouseHover)
      return;
    redrawOnMouseHoverOverCircle();
    setIsCircleSelectedOnMouseHover(false);
  }, [isCircleSelectedOnMouseHover]);

  useEffect(() => {
    console.log('--canvas---useEffect--redrawAfterPinPotionChanged--')
    redrawAfterPinPotionChanged();
  }, [pinList]);

  const redrawAfterPinPotionChanged = () => {
    console.log('--canvas---redrawAfterPinPotionChanged--')
    if (ctxTransToDrawCircle) {
      ctxTransToDrawCircle.clearRect(0, 0, canvasTransToDrawCircle.current.clientWidth, canvasTransToDrawCircle.current.clientHeight);
      drawImagesWithPins();
    }
  }

  const drawFillCircle = (info, style = {}) => {
    console.log('--canvastransparent---drawFillCircle--')
    const { x, y, pinNumber } = info;
    const pointSize = 10; // Change according to the size of the point.
    if (!info.isNewPin)
      ctxTransToDrawCircle.fillStyle = info.isHovering ? info.hovercolor : info.blurcolor; // Red color   
    else
      ctxTransToDrawCircle.fillStyle = info.isHovering ? info.hovercolor : info.newcolor;
    ctxTransToDrawCircle.beginPath(); //Start path
    ctxTransToDrawCircle.arc(x, y, pointSize, 0, Math.PI * 2, true); // Draw a point using the arc function of the canvasTransToDrawCircle with a point structure.
    ctxTransToDrawCircle.fill(); // Close the path and fill.
    ctxTransToDrawCircle.closePath();
    ctxTransToDrawCircle.stroke();
    ctxTransToDrawCircle.beginPath(); //Start path
    ctxTransToDrawCircle.fillStyle = "black";
    ctxTransToDrawCircle.fillText(pinNumber, x - 3, y + 3)
    ctxTransToDrawCircle.fill();
    ctxTransToDrawCircle.closePath();
    ctxTransToDrawCircle.stroke();
  }

  const drawImagesWithPins = () => {
    console.log('--canvas---drawImagesWithPins--')
    const imgagDraw = new Image();
    imgagDraw.src = props.imgUrl;
    imgagDraw.onload = function () {
      const hRatio = canvasTransToDrawCircle.current.clientWidth / imgagDraw.width;
      const vRatio = canvasTransToDrawCircle.current.clientHeight / imgagDraw.height;
      const ratio = Math.min(hRatio, vRatio);
      ctxTransToDrawCircle.drawImage(imgagDraw, 0, 0, imgagDraw.width, imgagDraw.height, 0, 0, imgagDraw.width * ratio, imgagDraw.height * ratio);
     
      const drawObj = {
        x: x_axis,
        y: y_axis, r: 10,
        pinNumber: JSON.stringify(1),
        pinsID: "",
        hovercolor: "blue",
        blurcolor: "yellow",
        newcolor: "white",
        isHovering: true,
        isNewPin: true
      }
      setpinList([{...drawObj}])
      // pinList.map(info => {
        drawFillCircle([{...drawObj}])
      // });
    }
  }

  const redrawOnMouseHoverOverCircle = () => {
    console.log('--canvasTansparent-----redrawOnMouseHoverOverCircle----')
    if (ctxTransToDrawCircle) {
      ctxTransToDrawCircle.clearRect(0, 0, canvasTransToDrawCircle.current.clientWidth, canvasTransToDrawCircle.current.clientHeight);
      drawImagesWithPinsOnMouseHover();
    }
  }

  const drawImagesWithPinsOnMouseHover = () => {
    console.log('--canvasTansparent---drawImagesWithPinsOnMouseHover--')
    const imgagDraw = new Image();
    imgagDraw.src = props.imgUrl;
    imgagDraw.onload = function () {
      const hRatio = canvasTransToDrawCircle.current.clientWidth / imgagDraw.width;
      const vRatio = canvasTransToDrawCircle.current.clientHeight / imgagDraw.height;
      const ratio = Math.min(hRatio, vRatio);
      ctxTransToDrawCircle.drawImage(imgagDraw, 0, 0, imgagDraw.width, imgagDraw.height, 0, 0, imgagDraw.width * ratio, imgagDraw.height * ratio);
      pinList.map(info => {
        drawFillCircle(info)
      });
    }
  }

  // const hitCircle = (x, y) => {
  //   console.log('--canvas---hitCircle--')
  //   let isTarget = false;
  //   for (let i = 0; i < pinList.length; i++) {
  //     const box = pinList[i];
  //     const d = Math.pow(box.r, 2) - (((Math.pow(box.x - x, 2))) + ((Math.pow(box.y - y, 2))))
  //     if (d > 0) {
  //       box.isHovering = true;
  //       setDragTarget(box);
  //       isTarget = true;
  //       setIsCircleSelectedOnMouseDown(isTarget);
  //     }
  //     else if (d == 0) { box.isHovering = false; }
  //     else { box.isHovering = false; }
  //   }
  //   return isTarget;
  // }

  const handleMouseDown = e => {
    console.log('--1--canvasTansparent-----handleMouseDown----')
    startX = e.nativeEvent.offsetX - canvasTransToDrawCircle.current.clientLeft;
    startY = e.nativeEvent.offsetY - canvasTransToDrawCircle.current.clientTop;
    setx_Axis(startX);
    sety_Axis(startY);
    // hitCircle(startX, startY);
    console.log('--2--canvasTansparent-----handleMouseDown---startX, startY-', startX, startY)
    if (props.allowToCreateNewPin) {
      props.selectedNewTaskCoOrdinate({ x_axis, y_axis })
    }
  }

  const handleMouseMove = e => {
    if (!isCircleSelectedOnMouseHover) {
      startX = e.nativeEvent.offsetX - canvasTransToDrawCircle.current.clientLeft;
      startY = e.nativeEvent.offsetY - canvasTransToDrawCircle.current.clientTop;
      setx_Axis(startX);
      sety_Axis(startY);
      // console.log('--2--canvasTansparent-----handleMouseMove---startX, startY-', startX, startY)
    }
    if (!isCircleSelectedOnMouseDown) return;
    // console.log('--canvasTansparent----canvas-6-isCircleSelectedOnMouseDown on mouse move', isCircleSelectedOnMouseDown)
    const mouseX = e.nativeEvent.offsetX - canvasTransToDrawCircle.current.clientLeft;
    const mouseY = e.nativeEvent.offsetY - canvasTransToDrawCircle.current.clientTop;
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
    ctxTransToDrawCircle.current.closePath()
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
          width="800" height="700" style={{border: "2px solid red"}}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseOut={handleMouseOut}
          ref={canvasTransToDrawCircle}></canvas>
      </div>
    </div>
  );
}


export default CanvasTransparent_bkp;


