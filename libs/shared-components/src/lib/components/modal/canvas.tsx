
import React, { Component, useEffect, useRef } from 'react'
import axios from 'axios';
import { MS_SERVICE_URL } from '@cudo/mf-core'
export interface CanvasProps {
  imgUrl?,
  coardinates?,
  fileId?,
  isPinTask?

}
export function Canvas(props: CanvasProps) {
  const canvas = useRef<HTMLCanvasElement>();
  const image = useRef<HTMLImageElement>(null);
  const [isRedraw, setisRedraw] = React.useState(false)
  const [pinList, setboxes] = React.useState([]);
  const [ctx, setctx] = React.useState(null);
  const [isCircleSelected, setIsDown] = React.useState<boolean>(false);
  const [dragTarget, setDragTarget] = React.useState(null);
  const [isMouseDown, setIsMouseDown] = React.useState<boolean>(false);
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
    canvasEle.width = canvasEle.clientWidth + 150;
    canvasEle.height = canvasEle.clientHeight + 500;
    setctx(canvasEle.getContext("2d"));
    console.log("Calling from useeffect pinList", pinList)
    if (props.isPinTask == false) {
      getPins().then(() => {
        console.log("getPins Done props.isPinTask", props.isPinTask)
        // redrawAfterPinPotionChanged();
      })

    }
  }, [props.isPinTask]);

  useEffect(() => {
    getPins().then(() => {
      console.log("getPins Done", props.isPinTask)
      // redrawAfterPinPotionChanged();
    })
  }, [props.isPinTask]);

  useEffect(() => {
    redrawAfterPinPotionChanged();
  }, [pinList]);

  useEffect(() => {
    console.log('props.isPinTask :', props.isPinTask);
    console.log('isCircleSelected :', isCircleSelected);
    if (isCircleSelected || props.isPinTask) {
      props.coardinates({ pinsID: dragTarget?.pinsID, pinNumber: dragTarget?.pinNumber })
      return;
    }
    if (!isMouseDown) {
      return;
    }
    const drawObj = {
      x: x_axis,
      y: y_axis, r: 10,
      pinNumber: JSON.stringify(pinList.length + 1),
      pinsID: ""
    }

    console.log('pinList :', pinList)
    drawFillCircle(drawObj)
    const lastBoxes = [...pinList];
    lastBoxes.push(drawObj)
    setboxes([...lastBoxes])
    console.log('pinList after new', lastBoxes)
  }, [isCircleSelected, isMouseDown, x_axis, y_axis]);


  useEffect(() => {
    console.log("Selected dragTarget", dragTarget)
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
    if (!isCircleSelected)
      setboxes([...lastBoxes])
  }, [dragTarget, isCircleSelected])

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
      console.log('get_pin_res', res.data.data);

      const lastBoxes = res.data.data.pins.map((box, id) => {
        return {
          x: box.x_axis,
          y: box.y_axis,
          r: 10,
          pinNumber: JSON.stringify(id + 1),
          pinsID: box.pinsID
        }
      });
      props.coardinates(lastBoxes[lastBoxes.length - 1])
      console.log("After Set Boxess ", lastBoxes)
      await setboxes(lastBoxes)

      await setisRedraw(false);
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
    console.log('cordinates', pinList);
    pinList.map(async (box, id) => {
      if (box.pinsID == "") {
        try {
          const res = await axios.post(
            MS_SERVICE_URL['ms_document'].url,
            {
              query,
              variables: {
                x_axis: box.x,
                y_axis: box.y,
                z_axis: box.r,
                isDeleted: false,
                uploadedFileID: props.fileId,
                pinNumber: 1,
                pageNumber: 1
              }
            }
          )
          console.log('create pin-response', res.data.data);
          props.coardinates(res.data.data.createPins)
          box.pinsID = res.data.data.createPins.pinsID;
          pinList[id] = box
        } catch (error) {
          console.log(error)
        }
      }
      else {
        console.log('update-pins response');
        return axios.post(
          MS_SERVICE_URL['ms_document'].url,
          {
            query: updateQuery,
            variables: {
              x_axis: box.x,
              y_axis: box.y,
              z_axis: box.r,
              isDeleted: false,
              uploadedFileID: props.fileId,
              pinsID: box.pinsID
            }
          }
        ).then(res => {
          console.log('update-pin-response', res.data);

        })
          .catch(err => console.log(err))
      }
    })

  }

  const drawImagesWithPins = () => {
    console.log("Loading image with pinList", pinList)
    const imgagDraw = new Image();
    imgagDraw.src = props.imgUrl;
    imgagDraw.onload = function () {
      console.log("Image Loaded")
      const hRatio = canvas.current.clientWidth / imgagDraw.width;
      const vRatio = canvas.current.clientHeight / imgagDraw.height;
      const ratio = Math.min(hRatio, vRatio);
      ctx.drawImage(imgagDraw, 0, 0, imgagDraw.width, imgagDraw.height, 0, 0, imgagDraw.width * ratio, imgagDraw.height * ratio);
      console.log("Image Draw Completed")
      console.log("Unboxing pins", pinList)
      pinList.map(info => {
        console.log("Calling drawFillCircle", info)
        drawFillCircle(info)
      });
      console.log("Calling createPinsUp")
      createPinsUp();
    }
  }

  const redrawAfterPinPotionChanged = () => {
    if (ctx) {
      ctx.clearRect(0, 0, canvas.current.clientWidth, canvas.current.clientHeight);
      console.log("redrawAfterPinPotionChanged circle ", pinList)
      drawImagesWithPins();
    }
  }

  const drawFillCircle = (info, style = {}) => {
    const { x, y, w, h, pinNumber } = info;
    const pointSize = 10; // Change according to the size of the point.
    ctx.fillStyle = "yellow"; // Red color   
    ctx.beginPath(); //Start path
    ctx.arc(x, y, pointSize, 0, Math.PI * 2, true); // Draw a point using the arc function of the canvas with a point structure.
    ctx.fill(); // Close the path and fill.
    ctx.closePath();
    ctx.stroke();
    ctx.beginPath(); //Start path
    ctx.fillStyle = "blue";
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
        console.log("inside", box);
        setDragTarget(box);
        isTarget = true;
        setIsDown(isTarget);
        console.log(dragTarget)
        break;
      }
      else if (d == 0) { console.log("on the circumference"); }
      else { console.log("outside"); }
    }
    return isTarget;
  }

  const handleMouseDown = e => {
    // setisRedraw(false)
    startX = e.nativeEvent.offsetX - canvas.current.clientLeft;
    startY = e.nativeEvent.offsetY - canvas.current.clientTop;
    setx_Axis(startX);
    sety_Axis(startY);
    console.log('startX, startY :', startX, startY);
    hitCircle(startX, startY)
    setIsMouseDown(!isMouseDown)
  }

  const handleMouseMove = e => {
    if (!isCircleSelected) return;
    const mouseX = e.nativeEvent.offsetX - canvas.current.clientLeft;
    const mouseY = e.nativeEvent.offsetY - canvas.current.clientTop;
    const dx = mouseX - startX;
    const dy = mouseY - startY;
    startX = mouseX;
    startY = mouseY;
    const dragObj = { ...dragTarget }
    dragObj.x = dx;
    dragObj.y = dy;
    setDragTarget({ ...dragObj });
  }

  const handleMouseUp = e => {
    setIsDown(false);
    if (isMouseDown)
      setIsMouseDown(!isMouseDown)
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


