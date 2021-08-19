
import React, { Component, useEffect, useRef, useState } from 'react'
import axios from 'axios';
import { MS_SERVICE_URL } from '@cudo/mf-core'
import CanvasTransparent from './canvastransparent';
export interface CanvasProps {
  imgUrl?,
  coardinates?,
  fileId?,
  allowToCreateNewPin?
  isPinCreated?
  setIsPinCreated?
  savePin?
  pinSaved?
}
export function Canvas(props: CanvasProps) {
  const canvasToDrawCircle = useRef<HTMLCanvasElement>();
  const canvasToDrawImage = useRef<HTMLCanvasElement>();
  const [pinList, setpinList] = React.useState([]);
  // const [ctxToDrawImage, setCtxToDrawImage] = React.useState(null);
  const [ctxToDrawCircle, setCtxToDrawCircle] = React.useState(null);
  const [isCircleSelectedOnMouseDown, setIsCircleSelectedOnMouseDown] = React.useState<boolean>(false);
  const [isCircleSelectedOnMouseHover, setIsCircleSelectedOnMouseHover] = React.useState<boolean>(false);
  const [dragTarget, setDragTarget] = React.useState(null);
  const [x_axis, setx_Axis] = React.useState<number>(0);
  const [y_axis, sety_Axis] = React.useState<number>(0);
  let startX = null;
  let startY = null;

  const [isAllPinCanvasHide, setAllPinCanvasHide] = useState(true)

  const getPinQuery = `query Pins($uploadedFileID: String!) {
  pins(pinsFilter:{ 
    uploadedFileID: $uploadedFileID
      }){ 
        pinsID 
        x_axis 
        y_axis 
        z_axis 
      } 
 }`;

  // initialize the canvasToDrawCircle context
  useEffect(() => {
    const canvasToDrawCircleEle = canvasToDrawCircle.current;
    canvasToDrawCircleEle.width = canvasToDrawCircleEle.clientWidth;
    canvasToDrawCircleEle.height = canvasToDrawCircleEle.clientHeight;
    // const canvasToDrawImageEle = canvasToDrawImage.current;
    // canvasToDrawImageEle.width = canvasToDrawImageEle.clientWidth;
    // canvasToDrawImageEle.height = canvasToDrawImageEle.clientHeight;
    setCtxToDrawCircle(canvasToDrawCircleEle.getContext("2d"));
    // setCtxToDrawImage(canvasToDrawImageEle.getContext("2d"));

    getPins().then(() => {
      console.log("--canvas-0-getPins Done", props.allowToCreateNewPin)
    })

  }, []);
  useEffect(() => {
    if (!props.isPinCreated)
      getPins().then(() => {
        console.log("--canvas-1-getPins Done", props.allowToCreateNewPin);
      })
  }, [props.isPinCreated]);

  useEffect(() => {
    redrawAfterPinPotionChanged();
  }, [pinList]);

  useEffect(() => {
    if (!isCircleSelectedOnMouseHover)
      return;
    redrawOnMouseHoverOverCircle();
    setIsCircleSelectedOnMouseHover(false);
  }, [isCircleSelectedOnMouseHover]);

  useEffect(() => {
    if (isCircleSelectedOnMouseDown) {
      props.coardinates({ pinsID: dragTarget?.pinsID, pinNumber: dragTarget?.pinNumber })
      return;
    }
    if (props.isPinCreated || !props.allowToCreateNewPin) {
      return;
    }
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
  }, [props.isPinCreated, isCircleSelectedOnMouseDown, x_axis, y_axis]);


  useEffect(() => {
    console.log("--canvas-2-On useeffect ", dragTarget, isCircleSelectedOnMouseDown, isCircleSelectedOnMouseHover);
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
    if (!isCircleSelectedOnMouseDown && !props.allowToCreateNewPin && !dragTarget?.isNewPin) {
      updatePin(dragTarget);
    }
    if (isCircleSelectedOnMouseHover) {
      props.coardinates({ pinsID: dragTarget?.pinsID, pinNumber: dragTarget?.pinNumber })
      return;
    }

  }, [dragTarget, isCircleSelectedOnMouseDown, isCircleSelectedOnMouseHover]);

  useEffect(() => {
    console.log("--canvas-3-Pin Save flag recieved in canvas component ", props.savePin)
    if (!props.savePin) { props.pinSaved(false); return; }
    saveNewPin(dragTarget);
  }, [props.savePin]);

  const saveNewPin = async (dragTargetTemp) => {
    try {
      if (dragTargetTemp?.pinsID == '') {

        console.log("--canvas-4-Save Pin call", dragTargetTemp)
        const res = await axios.post(
          MS_SERVICE_URL['ms_document'].url,
          {
            query,
            variables: {
              x_axis: dragTargetTemp.x,
              y_axis: dragTargetTemp.y,
              z_axis: 0,
              isDeleted: false,
              uploadedFileID: props.fileId,
              pinNumber: 1,
              pageNumber: 1
            }
          }
        )
        props.coardinates(res.data.data.createPins)
        dragTargetTemp.pinsID = res.data.data.createPins.pinsID;
        updateSetBoxes(dragTargetTemp);
        props.pinSaved(true);
      }
    } catch (error) {
      console.log(error)
    }
  }

  const updatePin = async (dragTargetTemp) => {
    try {
      if (!dragTargetTemp || dragTargetTemp?.isNewPin)
        return;
      if (dragTargetTemp?.pinsID != '') {
        const updatePinLocation = await axios.post(
          MS_SERVICE_URL['ms_document'].url,
          {
            query: updateQuery,
            variables: {
              x_axis: dragTargetTemp.x,
              y_axis: dragTargetTemp.y,
              z_axis: 0,
              isDeleted: false,
              uploadedFileID: props.fileId,
              pinsID: dragTargetTemp.pinsID
            }
          });
        updateSetBoxes(dragTargetTemp);
      }
    } catch (error) {
      console.log(error)
    }
  }

  const updateSetBoxes = (dragTargetTemp) => {
    let lastBoxes = [...pinList];
    lastBoxes = lastBoxes.map((box) => {
      if (box.pinsID == dragTargetTemp.pinsID) {
        const dragObj = { ...box }
        dragObj.x = dragTargetTemp.x;
        dragObj.y = dragTargetTemp.y;
        return { ...dragObj }
      }
      return box
    })
    setpinList([...lastBoxes]);
  }

  const getPins = async () => {
    try {
      const res = await axios.post(
        MS_SERVICE_URL['ms_document'].url,
        {
          query: getPinQuery,
          variables: {
            uploadedFileID: props.fileId
          }
        }
      );

      const lastBoxes = res.data.data.pins.map((box, id) => {
        return {
          x: box.x_axis,
          y: box.y_axis,
          r: 10,
          pinNumber: JSON.stringify(id + 1),
          pinsID: box.pinsID,
          hovercolor: "blue",
          blurcolor: "yellow",
          newcolor: "white",
          isNewPin: false,
          isHovering: false
        }
      });
      props.coardinates(lastBoxes[lastBoxes.length - 1])
      setpinList([...lastBoxes])
      console.log('--canvas-5---getPins---lastBoxes--', lastBoxes)
      return lastBoxes;
    } catch (error) {
      console.log(error)
    }
  }

  const query = `mutation 
    CreatePins(
    $uploadedFileID: String!
    $x_axis: Float!
    $y_axis: Float!
    $z_axis: Float!
    $isDeleted: Boolean!
    $pageNumber: Float!
    $pinNumber:Float!
      )
     { 
      createPins(
        pinsDetails:{ 
        x_axis:$x_axis
        y_axis:$y_axis
        z_axis:$z_axis
        isDeleted:$isDeleted 
        uploadedFileID: $uploadedFileID
        pageNumber: $pageNumber
        pinNumber: $pinNumber
      }) 
    
      { 
    
        pinsID 
        uploadedFileID 
        x_axis 
        y_axis 
        z_axis 
        isDeleted 
        updatedBy 
        createdBy 
        createdAt 
        updatedAt 
      } 
    
    } `;

  const updateQuery = `mutation 
    UpdatePins(
    $uploadedFileID: String!
    $x_axis: Float!
    $y_axis: Float!
    $z_axis: Float!
    $isDeleted: Boolean!
    $pinsID: String!
      )
     { 
      updatePins(
        pinsFilter:{
          uploadedFileID: $uploadedFileID
          pinsID: $pinsID
          }
          pinsUpdateDto:{ 
        x_axis:$x_axis
        y_axis:$y_axis
        z_axis:$z_axis
        isDeleted:$isDeleted 
      
      }) 
    
      { 
    
        pinsID 
        uploadedFileID 
        x_axis 
        y_axis 
        z_axis 
        isDeleted 
        updatedBy 
        createdBy 
        createdAt 
        updatedAt 
      } 
    
    } `;

  const drawImagesWithPins = () => {
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

  const redrawAfterPinPotionChanged = () => {
    if (ctxToDrawCircle) {
      ctxToDrawCircle.clearRect(0, 0, canvasToDrawCircle.current.clientWidth, canvasToDrawCircle.current.clientHeight);
      drawImagesWithPins();
    }
  }

  const redrawOnMouseHoverOverCircle = () => {
    if (ctxToDrawCircle) {
      ctxToDrawCircle.clearRect(0, 0, canvasToDrawCircle.current.clientWidth, canvasToDrawCircle.current.clientHeight);
      drawImagesWithPinsOnMouseHover();
    }
  }

  const drawImagesWithPinsOnMouseHover = () => {
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

  const hitCircle = (x, y) => {
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
    // setisRedraw(false)
    startX = e.nativeEvent.offsetX - canvasToDrawCircle.current.clientLeft;
    startY = e.nativeEvent.offsetY - canvasToDrawCircle.current.clientTop;
    setx_Axis(startX);
    sety_Axis(startY);
    hitCircle(startX, startY);
    if (props.allowToCreateNewPin) {
      props.setIsPinCreated(true);
    }
  }

  const handleMouseMove = e => {
    setAllPinCanvasHide(true)
    if (!isCircleSelectedOnMouseHover) {
      startX = e.nativeEvent.offsetX - canvasToDrawCircle.current.clientLeft;
      startY = e.nativeEvent.offsetY - canvasToDrawCircle.current.clientTop;
      setx_Axis(startX);
      sety_Axis(startY);
      hitCircleOnMouseHover(startX, startY);
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
    setIsCircleSelectedOnMouseDown(false);
  }

  const handleMouseOut = e => {
    handleMouseUp(e);
  }

  const getSelectedNewTaskCoOrdinates = (coOrdinates) => {
    console.log('--canvas--getSelectedNewTaskCoOrdinates--coOrdinates--', coOrdinates)
  }

  return (
    <div className="outsideWrapper">
      <div className="insideWrapper">
        {/* {!isAllPinCanvasHide ? <> */}
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
        {/* </>   : */}
        <CanvasTransparent
          imgUrl={props.imgUrl}
          fileId={props.fileId}
          allowToCreateNewPin={true}
          selectedNewTaskCoOrdinate={getSelectedNewTaskCoOrdinates}
        ></CanvasTransparent>
        {/* } */}
      </div>
    </div>
  );
}


export default Canvas;


