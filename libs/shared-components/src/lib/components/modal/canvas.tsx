
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
  let ctx = null;
  let isLoader = true;
  let boxes = []
  let isDown = false;
  //let isRedraw = true;
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
    ctx = canvasEle.getContext("2d");
    drawImages();
    if (props.isPinTask == false) {
      boxes = []
      getPins()
      draw();
    }
  }, [props.isPinTask]);

  useEffect(() => {
    if (props.isPinTask) {
      getPins();
      draw();
    }
  }, [props.isPinTask]);
  const getPins = async () => {
    return axios.post(
      MS_SERVICE_URL['ms_document'].url,
      {
        query: getPinQuery,
        variables: {
          uploadedFileID: props.fileId
        }
      }
    ).then(res => {
      //setisRedraw(true)
      console.log('get_pin_res', res.data.data);
      res.data.data.pins.map((box, id) => {

        boxes.push({
          x: box.x_axis,
          y: box.y_axis,
          r: box.z_axis,
          title: JSON.stringify(id + 1),
          pinId: box.pinsID
        })
        // draw()
        if (props.isPinTask == false) {
          draw();
        }
        if (id == res.data.data.pins.length - 1) {
          // setisRedraw(false)
        }
      })
      //setisRedraw(false)
    })
      .catch(err => console.log(err))
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

  const createPinsUp = async (boxes) => {
    console.log('cordinates');
    boxes.map((box, id) => {
      if (box.pinId == "") {
        return axios.post(
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
        ).then(res => {
          console.log('pin-response', res.data.data);
          props.coardinates(res.data.data)

          box.pinId = res.data.data.createPins.pinsID;
          boxes[id] = box

        })
          .catch(err => console.log(err))
      }
      else {
        console.log('update-pins');
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
  const drawImages = async () => {

    const imgagDraw = new Image();
    imgagDraw.src = props.imgUrl

    imgagDraw.onload = function () {
      const hRatio = canvas.current.clientWidth / imgagDraw.width;
      const vRatio = canvas.current.clientHeight / imgagDraw.height;
      const ratio = Math.min(hRatio, vRatio);
      ctx.drawImage(imgagDraw, 0, 0, imgagDraw.width, imgagDraw.height, 0, 0, imgagDraw.width * ratio, imgagDraw.height * ratio);
      boxes.map(info => {
        drawFillRect(info)
      });

      createPinsUp(boxes)
      // if (props.isPinTask == false) {
      //   props.coardinates(boxes)
      // }
    }
  }

  // draw rectangle
  const draw = () => {
    ctx.clearRect(0, 0, canvas.current.clientWidth, canvas.current.clientHeight);
    drawImages();

  }


  // draw rectangle with background
  const drawFillRect = (info, style = {}) => {
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
    for (let i = 0; i < boxes.length; i++) {
      const box = boxes[i];
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
    console.log('props.isPinTask', props.isPinTask);

    if (isDown || props.isPinTask == true) return;
    const draw = {
      x: startX,
      y: startY, r: 10,
      title: JSON.stringify(boxes.length + 1),
      pinId: ""
    }
    drawFillRect(draw)
    boxes.push(draw)
    console.log('boxes', boxes)

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


