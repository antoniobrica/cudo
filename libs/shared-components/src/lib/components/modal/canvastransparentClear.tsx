import React, { useEffect, useRef, useState } from 'react'
 
export interface CanvasTransparentClearProps {
  imgUrl?,
  fileId?,
  allowToCreateNewPin?
  selectedNewTaskCoOrdinate?
}
export function CanvasTransparentClear(props: CanvasTransparentClearProps) {
  const canvasToDrawCircle = useRef<HTMLCanvasElement>();
  const [pinList, setpinList] = React.useState([]);
   
  const [ctxToDrawCircle, setCtxToDrawCircle] = React.useState(null);
  const [isCircleSelectedOnMouseDown, setIsCircleSelectedOnMouseDown] = React.useState<boolean>(false);
  const [isCircleSelectedOnMouseHover, setIsCircleSelectedOnMouseHover] = React.useState<boolean>(false);
  const [dragTarget, setDragTarget] = React.useState(null);
  const [x_axis, setx_Axis] = React.useState<number>(0);
  const [y_axis, sety_Axis] = React.useState<number>(0);
  let startX = null;
  let startY = null;
 
  // initialize the canvasToDrawCircle context
  useEffect(() => {
    console.log('--canvas---useEffect--initialize the canvasToDrawCircle context--')
    const canvasToDrawCircleEle = canvasToDrawCircle.current;
    canvasToDrawCircleEle.width = canvasToDrawCircleEle.clientWidth;
    canvasToDrawCircleEle.height = canvasToDrawCircleEle.clientHeight;
    
    setCtxToDrawCircle(canvasToDrawCircleEle.getContext("2d"));  

  }, []);
   
  useEffect(() => {
    console.log('--canvas---useEffect--redrawAfterPinPotionChanged--')
    redrawAfterPinPotionChanged();
  }, [pinList]);

  useEffect(() => {
    console.log('--canvas---useEffect--redrawOnMouseHoverOverCircle--')
    if (!isCircleSelectedOnMouseHover)
      return;
    redrawOnMouseHoverOverCircle();
    setIsCircleSelectedOnMouseHover(false);
  }, [isCircleSelectedOnMouseHover]);

  useEffect(() => {
    console.log('--canvas---useEffect--drawObj--setpinlist--')
    
    const drawObj = {
      x: x_axis,
      y: y_axis, r: 10,
      pinNumber: JSON.stringify(pinList.length + 1),
      pinsID: "",
      hovercolor: "blue",
      blurcolor: "yellow",
      newcolor: "white",
      isHovering: true,
      isNewPin: true
    }
    let isFound = false;
    let lastBoxes = [...pinList];
    lastBoxes = lastBoxes.map((box) => {
      if (box.pinsID == drawObj.pinsID) {
        const dragObj = { ...box }
        dragObj.x = drawObj.x;
        dragObj.y = drawObj.y;
        dragObj.isNewPin = drawObj.isNewPin;
        dragObj.isHovering = drawObj.isHovering;
        isFound = true;
        return { ...dragObj }
      }
      return box
    })
    if (!isFound) {
      lastBoxes.push(drawObj);
    }
    setpinList([...lastBoxes])     
  }, [ isCircleSelectedOnMouseDown, x_axis, y_axis]);

  useEffect(() => {
    console.log("--canvas--useEffect--setpinList--updatePin--On circle mouse down and hover ", dragTarget, isCircleSelectedOnMouseDown, isCircleSelectedOnMouseHover);
    let lastBoxes = [...pinList];
    lastBoxes = lastBoxes.map((box) => {
      if (box.pinsID == dragTarget.pinsID) {
        const dragObj = { ...box }
        dragObj.x = dragTarget.x;
        dragObj.y = dragTarget.y;
        dragObj.isFound = dragTarget.isFound;
        return { ...dragObj }
      }
      return box
    })
    if (!isCircleSelectedOnMouseDown && !props.allowToCreateNewPin) {
      setpinList([...lastBoxes]);
    }     

  }, [dragTarget, isCircleSelectedOnMouseDown, isCircleSelectedOnMouseHover]);

  const drawImagesWithPins = () => {
    console.log('--canvas---drawImagesWithPins--')
    const imgagDraw = new Image();
    imgagDraw.src = props.imgUrl;
    imgagDraw.onload = function () {
      const hRatio = canvasToDrawCircle.current.clientWidth / imgagDraw.width;
      const vRatio = canvasToDrawCircle.current.clientHeight / imgagDraw.height;
      const ratio = Math.min(hRatio, vRatio);
      ctxToDrawCircle.globalAlpha = 0.15
      ctxToDrawCircle.drawImage(imgagDraw, 0, 0, imgagDraw.width, imgagDraw.height, 0, 0, imgagDraw.width * ratio, imgagDraw.height * ratio);
      pinList.map(info => {
        drawFillCircle(info)
      });
    }
  }

  const redrawAfterPinPotionChanged = () => {
    console.log('--canvas---redrawAfterPinPotionChanged--')
    if (ctxToDrawCircle) {
      ctxToDrawCircle.clearRect(0, 0, canvasToDrawCircle.current.clientWidth, canvasToDrawCircle.current.clientHeight);
      drawImagesWithPins();
    }
  }

  const redrawOnMouseHoverOverCircle = () => {
    console.log('--canvas---redrawOnMouseHoverOverCircle--')
    if (ctxToDrawCircle) {
      ctxToDrawCircle.clearRect(0, 0, canvasToDrawCircle.current.clientWidth, canvasToDrawCircle.current.clientHeight);
      drawImagesWithPinsOnMouseHover();
    }
  }

  const drawImagesWithPinsOnMouseHover = () => {
    console.log('--canvas---drawImagesWithPinsOnMouseHover--')
    const imgagDraw = new Image();
    imgagDraw.src = props.imgUrl;
    imgagDraw.onload = function () {
      const hRatio = canvasToDrawCircle.current.clientWidth / imgagDraw.width;
      const vRatio = canvasToDrawCircle.current.clientHeight / imgagDraw.height;
      const ratio = Math.min(hRatio, vRatio);
      ctxToDrawCircle.drawImage(imgagDraw, 0, 0, imgagDraw.width, imgagDraw.height, 0, 0, imgagDraw.width * ratio, imgagDraw.height * ratio);
      pinList.map(info => {
        drawFillCircle(info)
      });
    }
  }

  const drawFillCircle = (info, style = {}) => {
    console.log('--canvas---drawFillCircle--')
    const { x, y, pinNumber } = info;
    const pointSize = 10; // Change according to the size of the point.
    if (!info.isNewPin)
      ctxToDrawCircle.fillStyle = info.isHovering ? info.hovercolor : info.blurcolor; // Red color   
    else
      ctxToDrawCircle.fillStyle = info.isHovering ? info.hovercolor : info.newcolor;
    ctxToDrawCircle.beginPath(); //Start path
    ctxToDrawCircle.arc(x, y, pointSize, 0, Math.PI * 2, true); // Draw a point using the arc function of the canvasToDrawCircle with a point structure.
    ctxToDrawCircle.fill(); // Close the path and fill.
    ctxToDrawCircle.closePath();
    ctxToDrawCircle.stroke();
    ctxToDrawCircle.beginPath(); //Start path
    ctxToDrawCircle.fillStyle = "black";
    ctxToDrawCircle.fillText(pinNumber, x - 3, y + 3)
    ctxToDrawCircle.fill();
    ctxToDrawCircle.closePath();
    ctxToDrawCircle.stroke();
  }

  const handleMouseDown = e => {
    console.log('--canvas--handleMouseDown--')
    
    startX = e.nativeEvent.offsetX - canvasToDrawCircle.current.clientLeft;
    startY = e.nativeEvent.offsetY - canvasToDrawCircle.current.clientTop;
    setx_Axis(startX);
    sety_Axis(startY);
    
    props.selectedNewTaskCoOrdinate({ x_axis, y_axis })
  }

  const handleMouseMove = e => {
    console.log('--canvas--handleMouseMove--')
    
    if (!isCircleSelectedOnMouseHover) {
      startX = e.nativeEvent.offsetX - canvasToDrawCircle.current.clientLeft;
      startY = e.nativeEvent.offsetY - canvasToDrawCircle.current.clientTop;
      setx_Axis(startX);
      sety_Axis(startY);
      
    }
    if (!isCircleSelectedOnMouseDown) return;
    console.log("--canvas-6-isCircleSelectedOnMouseDown on mouse move", isCircleSelectedOnMouseDown)
    const mouseX = e.nativeEvent.offsetX - canvasToDrawCircle.current.clientLeft;
    const mouseY = e.nativeEvent.offsetY - canvasToDrawCircle.current.clientTop;
    startX = mouseX;
    startY = mouseY;
    const dragObj = { ...dragTarget }
    dragObj.x = startX;
    dragObj.y = startY;
    dragObj.isNewPin = true;
    setDragTarget({ ...dragObj });
  }

  const handleMouseUp = e => {
    console.log('--canvas--handleMouseUp--')
    setIsCircleSelectedOnMouseDown(false);
  }

  const handleMouseOut = e => {
    console.log('--canvas--handleMouseOut--')
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
          ref={canvasToDrawCircle}></canvas>
      </div>
    </div>
  );
}


export default CanvasTransparentClear;


