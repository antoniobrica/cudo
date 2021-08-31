
import React, { useEffect, useRef, useState } from 'react'

export interface CanvasTransparentNewPinProps {
  allowToCreateNewPin?
  selectedNewTaskCoOrdinate?
  lastPinDetail?
}
export function CanvasTransparentNewPin(props: CanvasTransparentNewPinProps) {
  const canvasToDrawCircle = useRef<HTMLCanvasElement>();
  const canvasToDrawImage = useRef<HTMLCanvasElement>();
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
    // console.log('--canvastransparent---useEffect--initialize the canvasToDrawCircle context--')
    const canvasToDrawCircleEle = canvasToDrawCircle.current;
    canvasToDrawCircleEle.width = canvasToDrawCircleEle.clientWidth;
    canvasToDrawCircleEle.height = canvasToDrawCircleEle.clientHeight;

    setCtxToDrawCircle(canvasToDrawCircleEle.getContext("2d"));

  }, []);

  useEffect(() => {
    // console.log('--canvastransparent---useEffect--redrawAfterPinPotionChanged--')
    redrawAfterPinPotionChanged();
  }, [pinList]);

  useEffect(() => {
    // console.log('--canvastransparent---useEffect--redrawOnMouseHoverOverCircle--')
    if (!isCircleSelectedOnMouseHover)
      return;
    redrawOnMouseHoverOverCircle();
    setIsCircleSelectedOnMouseHover(false);
  }, [isCircleSelectedOnMouseHover]);

  useEffect(() => {
    // console.log('---canvastransparent--1-props?.lastPinDetail----', props?.lastPinDetail, props?.lastPinDetail?.pinNumber)
    const drawObj = {
      x: x_axis,
      y: y_axis, r: 10,
      pinNumber: JSON.stringify(Number(Number(props?.lastPinDetail?.pinNumber) > 0 ? Number(props?.lastPinDetail?.pinNumber) : 0 + 1)),
      pinsID: "",
      hovercolor: "blue",
      blurcolor: "yellow",
      newcolor: "white",
      isHovering: true,
      isNewPin: true
    }
    // console.log('---canvastransparent--2-drawObj----', drawObj)
    let isFound = false;
    let lastBoxes = [...pinList];
    lastBoxes = lastBoxes.map((box) => {
      if (box.pinsID === drawObj.pinsID) {
        // console.log("is matched---box.pinsID = drawObj.pinsID---", box.pinsID, drawObj.pinsID);
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
    // console.log("Last boooox array",lastBoxes)
    if (!isFound) {
      // console.log("nnnnnnnno box found",lastBoxes)
      lastBoxes.push(drawObj);
    }
    // console.log('---canvastransparent--5-lastBoxes----', lastBoxes)
    setpinList([...lastBoxes])

  }, [isCircleSelectedOnMouseDown, x_axis, y_axis]);

  useEffect(() => {
    // console.log("--canvastransparent--useEffect--setpinList--updatePin--On circle mouse down and hover ", dragTarget, isCircleSelectedOnMouseDown, isCircleSelectedOnMouseHover);
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
    // console.log('--canvastransparent---drawImagesWithPins--')
    pinList.map(info => {
      drawFillCircle(info)
    });
  }

  const redrawAfterPinPotionChanged = () => {
    // console.log('--canvastransparent---redrawAfterPinPotionChanged--')
    if (ctxToDrawCircle) {
      ctxToDrawCircle.clearRect(0, 0, canvasToDrawCircle.current.clientWidth, canvasToDrawCircle.current.clientHeight);
      drawImagesWithPins();
    }
  }

  const redrawOnMouseHoverOverCircle = () => {
    // console.log('--canvastransparent---redrawOnMouseHoverOverCircle--')
    if (ctxToDrawCircle) {
      ctxToDrawCircle.clearRect(0, 0, canvasToDrawCircle.current.clientWidth, canvasToDrawCircle.current.clientHeight);
      drawImagesWithPinsOnMouseHover();
    }
  }

  const drawImagesWithPinsOnMouseHover = () => {
    // console.log('--canvastransparent---drawImagesWithPinsOnMouseHover--')
    pinList.map(info => {
      drawFillCircle(info)
    });
  }

  const drawFillCircle = (info, style = {}) => {
    // console.log('--canvastransparent---drawFillCircle--')
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
    // console.log('--canvastransparent--handleMouseDown--')

    startX = e.nativeEvent.offsetX - canvasToDrawCircle.current.clientLeft;
    startY = e.nativeEvent.offsetY - canvasToDrawCircle.current.clientTop;
    setx_Axis(startX);
    sety_Axis(startY);

    props.selectedNewTaskCoOrdinate(pinList[0])
  }

  const handleMouseMove = e => {
    // console.log('--canvastransparent--handleMouseMove--')
    if (props.allowToCreateNewPin) {
      if (!isCircleSelectedOnMouseHover) {
        startX = e.nativeEvent.offsetX - canvasToDrawCircle.current.clientLeft;
        startY = e.nativeEvent.offsetY - canvasToDrawCircle.current.clientTop;
        setx_Axis(startX);
        sety_Axis(startY);
      }
      if (!isCircleSelectedOnMouseDown) return;
      // console.log("--canvas-6-isCircleSelectedOnMouseDown on mouse move", isCircleSelectedOnMouseDown)
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
  }

  const handleMouseUp = e => {
    // console.log('--canvastransparent--handleMouseUp--')
    setIsCircleSelectedOnMouseDown(false);
  }

  const handleMouseOut = e => {
    // console.log('--canvastransparent--handleMouseOut--')
    handleMouseUp(e);
  }

  return (
    <canvas id="canvasNewPin" className="transparentCanvas"
      width="800" height="700"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseOut={handleMouseOut}
      ref={canvasToDrawCircle}></canvas>
  );
}


export default CanvasTransparentNewPin;


