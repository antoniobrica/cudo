
import { boolean, number } from '@storybook/addon-knobs';
import { title } from 'process';
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

  let isDown = false;
  let dragTarget = null;
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
      getPins().then((lastBoxes) => {
        console.log("getPins Done props.isPinTask", props.isPinTask)
        draw();
      })

    }
  }, [props.isPinTask]);

  useEffect(() => {
    getPins().then(() => {
      console.log("getPins Done", props.isPinTask)
      draw();
    })
  }, []);

  useEffect(() => {
    drawImages();
  }, [pinList]);

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
          r: box.z_axis,
          title: JSON.stringify(id + 1),
          pinId: box.pinsID
        }
      });
      console.log("After Set Boxess ", lastBoxes)
      setboxes(lastBoxes)

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
      if (box.pinId == "") {
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
          props.coardinates(res.data.data)
          box.pinId = res.data.data.createPins.pinsID;
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
              pinsID: box.pinId
            }
          }
        ).then(res => {
          console.log('update-pin-response', res.data);

        })
          .catch(err => console.log(err))
      }
    })

  }
  const drawImages = () => {
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
      createPinsUp()
      // if (props.isPinTask == false) {
      //   props.coardinates(pinList)
      // }
    }
  }

  // draw rectangle
  const draw = () => {
    ctx.clearRect(0, 0, canvas.current.clientWidth, canvas.current.clientHeight);
    console.log("draw circle ", pinList)
    drawImages();

  }


  // draw rectangle with background
  const drawFillCircle = (info, style = {}) => {
    const { x, y, w, h, title } = info;
    console.log("Info", ctx)

    const pointSize = 10; // Change according to the size of the point.
    ctx.fillStyle = "yellow"; // Red color   
    ctx.beginPath(); //Start path
    ctx.arc(x, y, pointSize, 0, Math.PI * 2, true); // Draw a point using the arc function of the canvas with a point structure.
    ctx.fill(); // Close the path and fill.
    ctx.closePath();
    ctx.stroke();
    ctx.beginPath(); //Start path
    ctx.fillStyle = "blue";
    ctx.fillText(title, x - 3, y + 3)
    ctx.fill();
    ctx.closePath();
    ctx.stroke();
  }

  // identify the click event in the rectangle
  const hitBox = (x, y) => {
    let isTarget = null;
    for (let i = 0; i < pinList.length; i++) {
      const box = pinList[i];
      const d = Math.pow(box.r, 2) - (((Math.pow(box.x - x, 2))) + ((Math.pow(box.y - y, 2))))
      if (d > 0) {
        console.log("inside", box);
        dragTarget = box;
        isTarget = true;
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
    isDown = hitBox(startX, startY);
    console.log('props.isPinTask :', props.isPinTask);
    console.log('isDown :', isDown);
    if (isDown || props.isPinTask == true) return;
    const drawObj = {
      x: startX,
      y: startY, r: 10,
      title: JSON.stringify(pinList.length + 1),
      pinId: ""
    }

    console.log('pinList :', pinList)
    drawFillCircle(drawObj)
    const lastBoxes = [...pinList];
    lastBoxes.push(drawObj)
    setboxes([...lastBoxes])
    // draw();
    console.log('pinList after new', lastBoxes)

  }
  const handleMouseMove = e => {
    if (!isDown) return;
    const mouseX = e.nativeEvent.offsetX - canvas.current.clientLeft;
    const mouseY = e.nativeEvent.offsetY - canvas.current.clientTop;
    const dx = mouseX - startX;
    const dy = mouseY - startY;
    startX = mouseX;
    startY = mouseY;
    dragTarget.x += dx;
    dragTarget.y += dy;
  }
  const handleMouseUp = e => {
    if (!isDown) return;
    console.log("Mouse UP")
    draw();
    dragTarget = null;
    isDown = false;
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


