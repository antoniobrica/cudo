
import React, { Component, useEffect, useRef } from 'react'
import axios from 'axios';
import { MS_SERVICE_URL } from '@cudo/mf-core'
export interface CanvasTransparentProps {
  imgUrl?,
  fileId?,
  allowToCreateNewPin?
  // isPinCreated?
  // setIsPinCreated?
  // savePin?
  // pinSaved?
}
export function CanvasTransparent(props: CanvasTransparentProps) {
  const canvasToDrawCircle = useRef<HTMLCanvasElement>();
  const canvasToDrawImage = useRef<HTMLCanvasElement>();
  const ctxToDrawCircle = useRef(null)

  const [pinList, setpinList] = React.useState([]);
  // const [ctxToDrawImage, setCtxToDrawImage] = React.useState(null);
  // const [ctxToDrawCircle, setCtxToDrawCircle] = React.useState(null);
  const [isCircleSelectedOnMouseDown, setIsCircleSelectedOnMouseDown] = React.useState<boolean>(false);
  const [isCircleSelectedOnMouseHover, setIsCircleSelectedOnMouseHover] = React.useState<boolean>(false);
  const [dragTarget, setDragTarget] = React.useState(null);
  const [x_axis, setx_Axis] = React.useState<number>(0);
  const [y_axis, sety_Axis] = React.useState<number>(0);
  let startX = null;
  let startY = null;

  // initialize the canvasToDrawCircle context
  useEffect(() => {
    console.log('--canvasTansparent-------useEffect--setCtxToDrawCircle--')
    const canvasToDrawCircleEle = canvasToDrawCircle.current;
    canvasToDrawCircleEle.width = canvasToDrawCircleEle.clientWidth;
    canvasToDrawCircleEle.height = canvasToDrawCircleEle.clientHeight;

    // setCtxToDrawCircle(canvasToDrawCircleEle.getContext("2d"));

    // start added MK ===================
    const circleContext = canvasToDrawCircleEle.getContext("2d")
    circleContext.globalAlpha = 0.15

    const imgagDraw = new Image();
    imgagDraw.src = props.imgUrl;
    imgagDraw.onload = function () {
      const hRatio = canvasToDrawCircle.current.clientWidth / imgagDraw.width;
      const vRatio = canvasToDrawCircle.current.clientHeight / imgagDraw.height;
      const ratio = Math.min(hRatio, vRatio);
      // circleContext.arc(x_axis, y_axis, pinList.length + 1, 0, Math.PI * 2, true);
      // circleContext.drawImage(imgagDraw, 0, 0, imgagDraw.width, imgagDraw.height, 0, 0, imgagDraw.width * ratio, imgagDraw.height * ratio);
    }

    //======
    console.log('--canvasTansparent-----drawFillCircle----')
    // const { x, y, pinNumber } = info;
    const pointSize = 10; // Change according to the size of the point.
    // if (!info.isNewPin)
    //  circleContext.fillStyle = info.isHovering ? info.hovercolor : info.blurcolor; // Red color   
    // else
    //   circleContext.fillStyle = info.isHovering ? info.hovercolor : info.newcolor;
    circleContext.beginPath(); //Start path
    circleContext.arc(x_axis, y_axis, pointSize, 0, Math.PI * 2, true); // Draw a point using the arc function of the canvasToDrawCircle with a point structure.
    circleContext.fill(); // Close the path and fill.
    circleContext.closePath();
    circleContext.stroke();
    circleContext.beginPath(); //Start path
    circleContext.fillStyle = "black";
    circleContext.fillText(JSON.stringify(pinList.length + 1), x_axis - 3, y_axis + 3)
    circleContext.fill();
    circleContext.closePath();
    circleContext.stroke();
    //======

    ctxToDrawCircle.current = circleContext
    // end added mk =================

    // getPins().then(() => {
    //   console.log('--canvasTansparent----canvas-0-getPins Done', props.allowToCreateNewPin)
    // })

    

  }, []);
  // useEffect(() => {
  //   if (!props.isPinCreated)
  //     getPins().then(() => {
  //       console.log('--canvasTansparent----canvas-1-getPins Done', props.allowToCreateNewPin);
  //     })
  // }, [props.isPinCreated]);

  useEffect(() => {
    redrawAfterPinPositionChanged();
  }, [pinList]);

  useEffect(() => {
    console.log('--canvasTansparent-------useEffect--redrawOnMouseHoverOverCircle---setIsCircleSelectedOnMouseHover--')
    if (!isCircleSelectedOnMouseHover)
      return;
    redrawOnMouseHoverOverCircle();
    setIsCircleSelectedOnMouseHover(false);
  }, [isCircleSelectedOnMouseHover]);

  useEffect(() => {
    console.log('--canvasTansparent-------useEffect--drawObj--lastBoxes--')
    // if (isCircleSelectedOnMouseDown) {
    //   props.coardinates({ pinsID: dragTarget?.pinsID, pinNumber: dragTarget?.pinNumber })
    //   return;
    // }
    // if (props.isPinCreated || !props.allowToCreateNewPin) {
    //   return;
    // }
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
    // props.setIsPinCreated(true);
    // }, [props.isPinCreated, isCircleSelectedOnMouseDown, x_axis, y_axis]);
  }, [isCircleSelectedOnMouseDown, x_axis, y_axis]);


  useEffect(() => {
    console.log('--canvasTansparent-------useEffect---lastBoxes--setpinList--')
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
    // if (!isCircleSelectedOnMouseDown && !props.allowToCreateNewPin && !dragTarget?.isNewPin) {
    //   updatePin(dragTarget);
    // }
    // if (isCircleSelectedOnMouseHover) {
    //   props.coardinates({ pinsID: dragTarget?.pinsID, pinNumber: dragTarget?.pinNumber })
    //   return;
    // }

  }, [dragTarget, isCircleSelectedOnMouseDown]);

  const drawImagesWithPins = () => {
    console.log('--canvasTansparent-------drawImagesWithPins--imgUrl--', props.imgUrl)
    const imgagDraw = new Image();
    imgagDraw.src = props.imgUrl;
    imgagDraw.onload = function () {
      const hRatio = canvasToDrawCircle.current.clientWidth / imgagDraw.width;
      const vRatio = canvasToDrawCircle.current.clientHeight / imgagDraw.height;
      const ratio = Math.min(hRatio, vRatio);

      // ctxToDrawCircle.globalAlpha = 0.15;
      // ctxToDrawCircle.drawImage(imgagDraw, 0, 0, imgagDraw.width, imgagDraw.height, 0, 0, imgagDraw.width * ratio, imgagDraw.height * ratio);
      pinList.map(info => {
        drawFillCircle(info)
      });
    }
  }

  const redrawAfterPinPositionChanged = () => {
    if (ctxToDrawCircle) {
      // ctxToDrawCircle.clearRect(0, 0, canvasToDrawCircle.current.clientWidth, canvasToDrawCircle.current.clientHeight);
      drawImagesWithPins();
    }
  }

  const redrawOnMouseHoverOverCircle = () => {
    console.log('--canvasTansparent-----redrawOnMouseHoverOverCircle----')
    if (ctxToDrawCircle) {
      // ctxToDrawCircle.clearRect(0, 0, canvasToDrawCircle.current.clientWidth, canvasToDrawCircle.current.clientHeight);
      drawImagesWithPinsOnMouseHover();
    }
  }

  const drawImagesWithPinsOnMouseHover = () => {
    console.log('--canvasTansparent-----drawImagesWithPinsOnMouseHover----')
    const imgagDraw = new Image();
    imgagDraw.src = props.imgUrl;
    imgagDraw.onload = function () {
      const hRatio = canvasToDrawCircle.current.clientWidth / imgagDraw.width;
      const vRatio = canvasToDrawCircle.current.clientHeight / imgagDraw.height;
      const ratio = Math.min(hRatio, vRatio);
      // ctxToDrawCircle.drawImage(imgagDraw, 0, 0, imgagDraw.width, imgagDraw.height, 0, 0, imgagDraw.width * ratio, imgagDraw.height * ratio);
      pinList.map(info => {
        drawFillCircle(info)
      });
    }
  }

  const drawFillCircle = (info, style = {}) => {
    console.log('--canvasTansparent-----drawFillCircle----')
    const { x, y, pinNumber } = info;
    const pointSize = 10; // Change according to the size of the point.
    // if (!info.isNewPin)
    //   ctxToDrawCircle.fillStyle = info.isHovering ? info.hovercolor : info.blurcolor; // Red color   
    // else
    //   ctxToDrawCircle.fillStyle = info.isHovering ? info.hovercolor : info.newcolor;
    // ctxToDrawCircle.beginPath(); //Start path
    // ctxToDrawCircle.arc(x, y, pointSize, 0, Math.PI * 2, true); // Draw a point using the arc function of the canvasToDrawCircle with a point structure.
    // ctxToDrawCircle.fill(); // Close the path and fill.
    // ctxToDrawCircle.closePath();
    // ctxToDrawCircle.stroke();
    // ctxToDrawCircle.beginPath(); //Start path
    // ctxToDrawCircle.fillStyle = "black";
    // ctxToDrawCircle.fillText(pinNumber, x - 3, y + 3)
    // ctxToDrawCircle.fill();
    // ctxToDrawCircle.closePath();
    // ctxToDrawCircle.stroke();
  }

  const hitCircle = (x, y) => {
    console.log('--canvasTansparent-----hitCircle----')
    let isTarget = false;
    for (let i = 0; i < pinList.length; i++) {
      const box = pinList[i];
      const d = Math.pow(box.r, 2) - (((Math.pow(box.x - x, 2))) + ((Math.pow(box.y - y, 2))))
      if (d > 0) {
        box.isHovering = true;
        setDragTarget(box);
        isTarget = true;
        setIsCircleSelectedOnMouseDown(isTarget);
      }
      else if (d == 0) { box.isHovering = false; }
      else { box.isHovering = false; }
    }
    return isTarget;
  }

  const hitCircleOnMouseHover = (x, y) => {
    console.log('--canvasTansparent-----hitCircleOnMouseHover----')
    for (let i = 0; i < pinList.length; i++) {
      const box = pinList[i];
      const d = Math.pow(box.r, 2) - (((Math.pow(box.x - x, 2))) + ((Math.pow(box.y - y, 2))))
      if (d > 0) {
        box.isHovering = true;
        setDragTarget(box);
        setIsCircleSelectedOnMouseHover(true);
      }
      else if (d == 0) { box.isHovering = false; }
      else { box.isHovering = false; }
    }
  }

  const handleMouseDown = e => {
    console.log('--canvasTansparent-----handleMouseDown----')
    // setisRedraw(false)
    startX = e.nativeEvent.offsetX - canvasToDrawCircle.current.clientLeft;
    startY = e.nativeEvent.offsetY - canvasToDrawCircle.current.clientTop;
    setx_Axis(startX);
    sety_Axis(startY);
    hitCircle(startX, startY);
    // if (props.allowToCreateNewPin) {
    //   props.setIsPinCreated(true);
    // }
  }

  const handleMouseMove = e => {
    console.log('--canvasTansparent-----handleMouseMove----')
    if (!isCircleSelectedOnMouseHover) {
      startX = e.nativeEvent.offsetX - canvasToDrawCircle.current.clientLeft;
      startY = e.nativeEvent.offsetY - canvasToDrawCircle.current.clientTop;
      setx_Axis(startX);
      sety_Axis(startY);
      hitCircleOnMouseHover(startX, startY);
    }
    if (!isCircleSelectedOnMouseDown) return;
    console.log('--canvasTansparent----canvas-6-isCircleSelectedOnMouseDown on mouse move', isCircleSelectedOnMouseDown)
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
    console.log('--canvasTansparent-----handleMouseUp--setIsCircleSelectedOnMouseDown--')
    setIsCircleSelectedOnMouseDown(false);
    ctxToDrawCircle.current.closePath()
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
        {/* <canvas className="coveringCanvas" 
            width="800" height="700"          
            ref={canvasToDrawImage}></canvas> */}
      </div>
    </div>
  );
}


export default CanvasTransparent;


