import { boolean, number } from '@storybook/addon-knobs';
import { title } from 'process';
import React, { Component, useEffect, useRef } from 'react'

export function TestCanvas() {
  const canvas = useRef<HTMLCanvasElement>();
  const image = useRef<HTMLImageElement>(null);
  let ctx = null;
  const boxes = []
  let isDown = false;
  let dragTarget = null;
  let startX = null;
  let startY = null;

  // initialize the canvas context
  useEffect(() => {
    // dynamically assign the width and height to canvas
    const canvasEle = canvas.current;
    canvasEle.width = canvasEle.clientWidth + 150;
    canvasEle.height = canvasEle.clientHeight + 500;
    ctx = canvasEle.getContext("2d");
    drawImages();
  }, []);

  useEffect(() => {
    draw();
  }, []);

  const drawImages = () => {
    const imgagDraw = new Image();
    imgagDraw.src = 'https://images.unsplash.com/photo-1621569899323-55c203a0f7f1?ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxfHx8ZW58MHx8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
    imgagDraw.onload = function () {
      ctx.drawImage(imgagDraw, 0, 0);
      boxes.map(info => drawFillRect(info));
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
    // console.log("Info", info)
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
        // console.log("inside", box);
        dragTarget = box;
        isTarget = true;
        break;
      }
      else if (d == 0) {
        console.log("on the circumference");
      }
      else {
        console.log("outside");
      }
    }
    return isTarget;
  }

  const handleMouseDown = e => {
    startX = e.nativeEvent.offsetX - canvas.current.clientLeft;
    startY = e.nativeEvent.offsetY - canvas.current.clientTop;
    isDown = hitBox(startX, startY);
    if (isDown) return;
    const draw = {
      x: startX,
      y: startY, r: 10,
      title: JSON.stringify(boxes.length + 1)
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
        <canvas className="coveringCanvas" onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseOut={handleMouseOut}
          ref={canvas}></canvas>
      </div>
    </div>
  );
}


export default TestCanvas;


