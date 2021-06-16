
import React, { Component, useEffect, useRef } from 'react'
import axios from 'axios';
import { MS_SERVICE_URL } from '@cudo/mf-core'
export interface CanvasProps {
  imgUrl?,
  coardinates?,
  fileId?,
  allowToCreateNewPin?
  isPinCreated
  setIsPinCreated
}
export function Canvas(props: CanvasProps) {
  const canvas = useRef<HTMLCanvasElement>();
  const [pinList, setboxes] = React.useState([]);
  const [ctx, setctx] = React.useState(null);
  const [isCircleSelectedOnMouseDown, setIsCircleSelectedOnMouseDown] = React.useState<boolean>(false);
  const [isCircleSelectedOnMouseHover, setIsCircleSelectedOnMouseHover] = React.useState<boolean>(false);
  const [dragTarget, setDragTarget] = React.useState(null);
  const [x_axis, setx_Axis] = React.useState<number>(0);
  const [y_axis, sety_Axis] = React.useState<number>(0);
  let startX = null;
  let startY = null;

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

  // initialize the canvas context
  useEffect(() => {
    const canvasEle = canvas.current;
    canvasEle.width = canvasEle.clientWidth;
    canvasEle.height = canvasEle.clientHeight;
    setctx(canvasEle.getContext("2d"));
    getPins().then(() => {
      console.log("getPins Done", props.allowToCreateNewPin)
      // redrawAfterPinPotionChanged();
    })
  }, []);


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
      isHovering: false
    }
    // drawFillCircle(drawObj)
    // const lastBoxes = [...pinList];
    // lastBoxes.push(drawObj)
    let isFound = false;
    let lastBoxes = [...pinList];
    lastBoxes = lastBoxes.map((box) => {
      if (box.pinsID == drawObj.pinsID) {
        const dragObj = { ...box }
        dragObj.x = drawObj.x;
        dragObj.y = drawObj.y;
        isFound = true;
        return { ...dragObj }
      }
      return box
    })
    if (!isFound) {
      lastBoxes.push(drawObj);
    }
    setboxes([...lastBoxes])
    // props.setIsPinCreated(true);
  }, [props.isPinCreated, isCircleSelectedOnMouseDown, x_axis, y_axis]);


  useEffect(() => {
    console.log("On useeffect ", dragTarget, isCircleSelectedOnMouseDown, isCircleSelectedOnMouseHover);
    let lastBoxes = [...pinList];
    lastBoxes = lastBoxes.map((box) => {
      if (box.pinsID == dragTarget.pinsID) {
        const dragObj = { ...box }
        dragObj.x = dragTarget.x;
        dragObj.y = dragTarget.y;
        return { ...dragObj }
      }
      return box
    })
    if (!isCircleSelectedOnMouseDown && !props.allowToCreateNewPin) {
      setboxes([...lastBoxes]);
      saveNewPin(dragTarget);
    }
    if (isCircleSelectedOnMouseHover) {
      props.coardinates({ pinsID: dragTarget?.pinsID, pinNumber: dragTarget?.pinNumber })
      return;
    }

  }, [dragTarget, isCircleSelectedOnMouseDown, isCircleSelectedOnMouseHover]);

  const saveNewPin = async (dragTargetTemp) => {
    try {
      if (dragTargetTemp?.pinsID == '') {
        const res = await axios.post(
          MS_SERVICE_URL['ms_document'].url,
          {
            query,
            variables: {
              x_axis: dragTargetTemp.x,
              y_axis: dragTargetTemp.y,
              z_axis: dragTargetTemp.r,
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
      }
      else if (dragTargetTemp?.pinsID != '') {
        const updatePinLocation = await axios.post(
          MS_SERVICE_URL['ms_document'].url,
          {
            query: updateQuery,
            variables: {
              x_axis: dragTargetTemp.x,
              y_axis: dragTargetTemp.y,
              z_axis: dragTargetTemp.r,
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
    setboxes([...lastBoxes]);
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
          isHovering: false
        }
      });
      props.coardinates(lastBoxes[lastBoxes.length - 1])
      setboxes([...lastBoxes])
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

  const createPinsUp = async () => {
    console.log('createPinsUp');
    // pinList.map(async (box, id) => {
    //   if (box.pinsID == "") {
    //     try {
    //       const res = await axios.post(
    //         MS_SERVICE_URL['ms_document'].url,
    //         {
    //           query,
    //           variables: {
    //             x_axis: box.x,
    //             y_axis: box.y,
    //             z_axis: box.r,
    //             isDeleted: false,
    //             uploadedFileID: props.fileId,
    //             pinNumber: 1,
    //             pageNumber: 1
    //           }
    //         }
    //       )
    //       console.log('create pin-response', res.data.data);
    //       props.coardinates(res.data.data.createPins)
    //       box.pinsID = res.data.data.createPins.pinsID;
    //       pinList[id] = box
    //     } catch (error) {
    //       console.log(error)
    //     }
    //   }
    //   else {
    //     console.log('update-pins response');
    //     return axios.post(
    //       MS_SERVICE_URL['ms_document'].url,
    //       {
    //         query: updateQuery,
    //         variables: {
    //           x_axis: box.x,
    //           y_axis: box.y,
    //           z_axis: box.r,
    //           isDeleted: false,
    //           uploadedFileID: props.fileId,
    //           pinsID: box.pinsID
    //         }
    //       }
    //     ).then(res => {
    //       console.log('update-pin-response', res.data);

    //     })
    //       .catch(err => console.log(err))
    //   }
    // })

  }

  const drawImagesWithPins = () => {
    const imgagDraw = new Image();
    imgagDraw.src = props.imgUrl;
    imgagDraw.onload = function () {
      const hRatio = canvas.current.clientWidth / imgagDraw.width;
      const vRatio = canvas.current.clientHeight / imgagDraw.height;
      const ratio = Math.min(hRatio, vRatio);
      ctx.drawImage(imgagDraw, 0, 0, imgagDraw.width, imgagDraw.height, 0, 0, imgagDraw.width * ratio, imgagDraw.height * ratio);
      pinList.map(info => {
        drawFillCircle(info)
      });
      createPinsUp();
    }
  }

  const redrawAfterPinPotionChanged = () => {
    if (ctx) {
      ctx.clearRect(0, 0, canvas.current.clientWidth, canvas.current.clientHeight);
      drawImagesWithPins();
    }
  }

  const redrawOnMouseHoverOverCircle = () => {
    if (ctx) {
      ctx.clearRect(0, 0, canvas.current.clientWidth, canvas.current.clientHeight);
      drawImagesWithPinsOnMouseHover();
    }
  }

  const drawImagesWithPinsOnMouseHover = () => {
    const imgagDraw = new Image();
    imgagDraw.src = props.imgUrl;
    imgagDraw.onload = function () {
      const hRatio = canvas.current.clientWidth / imgagDraw.width;
      const vRatio = canvas.current.clientHeight / imgagDraw.height;
      const ratio = Math.min(hRatio, vRatio);
      ctx.drawImage(imgagDraw, 0, 0, imgagDraw.width, imgagDraw.height, 0, 0, imgagDraw.width * ratio, imgagDraw.height * ratio);
      pinList.map(info => {
        drawFillCircle(info)
      });
    }
  }

  const drawFillCircle = (info, style = {}) => {
    const { x, y, pinNumber } = info;
    const pointSize = 10; // Change according to the size of the point.
    ctx.fillStyle = info.isHovering ? info.hovercolor : info.blurcolor; // Red color   
    ctx.beginPath(); //Start path
    ctx.arc(x, y, pointSize, 0, Math.PI * 2, true); // Draw a point using the arc function of the canvas with a point structure.
    ctx.fill(); // Close the path and fill.
    ctx.closePath();
    ctx.stroke();
    ctx.beginPath(); //Start path
    ctx.fillStyle = "black";
    ctx.fillText(pinNumber, x - 3, y + 3)
    ctx.fill();
    ctx.closePath();
    ctx.stroke();
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
    startX = e.nativeEvent.offsetX - canvas.current.clientLeft;
    startY = e.nativeEvent.offsetY - canvas.current.clientTop;
    setx_Axis(startX);
    sety_Axis(startY);
    hitCircle(startX, startY);
    if (props.allowToCreateNewPin) {
      props.setIsPinCreated(true);
    }
  }

  const handleMouseMove = e => {
    if (!isCircleSelectedOnMouseHover) {
      startX = e.nativeEvent.offsetX - canvas.current.clientLeft;
      startY = e.nativeEvent.offsetY - canvas.current.clientTop;
      setx_Axis(startX);
      sety_Axis(startY);
      hitCircleOnMouseHover(startX, startY);
    }
    if (!isCircleSelectedOnMouseDown) return;
    console.log("isCircleSelectedOnMouseDown on mouse move", isCircleSelectedOnMouseDown)
    const mouseX = e.nativeEvent.offsetX - canvas.current.clientLeft;
    const mouseY = e.nativeEvent.offsetY - canvas.current.clientTop;
    startX = mouseX;
    startY = mouseY;
    const dragObj = { ...dragTarget }
    dragObj.x = startX;
    dragObj.y = startY;
    setDragTarget({ ...dragObj });
  }

  const handleMouseUp = e => {
    setIsCircleSelectedOnMouseDown(false);
  }

  const handleMouseOut = e => {
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
          ref={canvas}></canvas>
      </div>
    </div>
  );
}


export default Canvas;


