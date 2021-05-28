// import React, { Component } from 'react'
// import img1 from 'libs/shared-components/src/powerpoint.png';
// type MyProps = {
//   // using `interface` is also ok
//   imgUrl: string;
// };
// // const boxes = [
// //   { x: 200, y: 220, r: 10 },
// // ]
// export default class Canvas extends Component<MyProps> {
//   canvas: React.RefObject<HTMLCanvasElement>;

//   constructor(props) {
//     super(props);
//     this.canvas = React.createRef();
//     // this.state = {
//     //   isDown: false,
//     //   dragTarget: null,
//     //   startX: null,
//     //   startY: null

//     // }
//   }
//   state = {
//     isDown: false,
//     dragTarget: {
//       x: null,
//       y: null
//     },
//     boxes: [{
//       x: 200, y: 220, r: 10
//     }],
//     startX: null,
//     startY: null

//   }

//   componentDidMount() {
//     // const canvas = this.refs.canvas
//     // const ctx = canvas.getContext("2d")

//     const canvasEle = this.canvas.current;
//     canvasEle.width = canvasEle.clientWidth;
//     canvasEle.height = canvasEle.clientHeight;
//     console.log('canvasEle', this.canvas);
//     this.draw()
//     // get context of the canvas
//     // ctx = canvasEle.getContext("2d");
//     let canvas = document.getElementById('canvas') as
//       HTMLCanvasElement;
//     let context = canvas.getContext("2d");
//     console.log('context', context);
//     console.log('canvas', canvas);

//     const img = this.refs.image;
//     img.onload = () => {
//       context.drawImage(img, 10, 10)
//       // context.font = "40px Courier"
//       // context.fillText(this.context, 210, 75)
//     }
//     // const x = 357.75
//     // const y = 457.75
//     // this.drawCoordinates(x, y)
//   }

//   drawCoordinates = (x, y) => {
//     console.log('x,y', x, y);

//     let pointSize = 10; // Change according to the size of the point.
//     let canvas = document.getElementById('canvas') as
//       HTMLCanvasElement;
//     let context = canvas.getContext("2d");
//     context.fillStyle = "#FFA500"; // Red color
//     context.fillText('1', x + 20, y + 20)
//     context.beginPath(); //Start path
//     context.arc(x, y, pointSize, 0, Math.PI * 2, true); // Draw a point using the arc function of the canvas with a point structure.
//     context.fill(); // Close the path and fill.

//     // const draw = {
//     //   x: x,
//     //   y: y,
//     //   r: pointSize
//     // }
//     // if (this.state.isDown === false) {
//     //   const boxes = [...this.state.boxes];
//     //   boxes.push(draw)
//     //   this.setState({ boxes });
//     // }
//     // else {
//     //   const id = this.state.boxes.findIndex(xc => (xc.x === x) && xc.y === y)
//     //   const boxes = [...this.state.boxes];
//     //   boxes[id] = draw;
//     //   this.setState({ boxes })
//     // }
//     console.log('boxes_length', this.state.boxes);

//   }

//   getPosition = (event) => {
//     let canvas = document.getElementById('canvas') as
//       HTMLCanvasElement;
//     let rect = canvas.getBoundingClientRect();
//     let x = event.clientX - rect.left; // x == the location of the click in the document - the location (relative to the left) of the canvas in the document
//     let y = event.clientY - rect.top; // y == the location of the click in the document - the location (relative to the top) of the canvas in the document
//     const isTaget = this.hitBox(x, y);
//     if (!isTaget) return;
//     this.drawCoordinates(x, y);
//   }

//   handleMouseDown = (e) => {
//     // let canvas = document.getElementById('canvas') as
//     //   HTMLCanvasElement;
//     const startX = e.nativeEvent.offsetX - this.canvas.current.clientLeft;
//     const startY = e.nativeEvent.offsetY - this.canvas.current.clientTop;
//     this.setState({ startX: startX });
//     this.setState({ startY: startY });
//     const isDown = this.hitBox(startX, startY);
//     this.setState({ isDown: isDown })
//     console.log('hitRresult', isDown);
//     if (isDown) return;
//     this.drawCoordinates(startX, startY);
//     let draw = {
//       x: startX,
//       y: startY,
//       w: 100, h: 50, r: 10
//     }


//     const boxes = [...this.state.boxes];
//     boxes.push(draw)
//     this.setState({ boxes });

//   }
//   handleMouseUp = (e) => {
//     console.log('handleMouseUp', e);
//     // this.draw();

//     this.setState({
//       dragTarget: null,
//       isDown: false
//     })
//   }
//   handleMouseOut = (e) => {
//     console.log('handleMouseout', e);

//     this.handleMouseUp(e);
//   }

//   handleMouseMove = e => {

//     if (!this.state.isDown) return;

//     // const canvas = document.getElementById('canvas') as
//     //   HTMLCanvasElement;
//     const mouseX = e.nativeEvent.offsetX - this.canvas.current.clientLeft;
//     const mouseY = e.nativeEvent.offsetY - this.canvas.current.clientTop;
//     const dx = mouseX - this.state.startX;
//     const dy = mouseY - this.state.startY;
//     this.setState({
//       startX: mouseX,
//       startY: mouseY,
//     })
//     console.log('dim', this.state.dragTarget);

//     // this.state.dragTarget.x += dx;
//     // this.state.dragTarget.y += dy;
//     const target = {
//       x: this.state.dragTarget.x + dx,
//       y: this.state.dragTarget.y + dy
//     }
//     this.setState({ dragTarget: target })
//     // console.log('dragtrgt', this.state.dragTarget);
//     this.draw();
//     //this.drawCoordinates(target.x, target.y);

//   }
//   draw = () => {
//     let canvas = document.getElementById('canvas') as
//       HTMLCanvasElement;
//     let context = canvas.getContext("2d");
//     // const img = this.refs.image;
//     // img.onload = () => {
//     //   context.drawImage(img, 0, 0)
//     // }
//     context.clearRect(0, 0, this.canvas.current.clientWidth, this.canvas.current.clientHeight);
//     this.state.boxes.map(info => {
//       this.drawCoordinates(info.x, info.y)
//     });
//   }
//   drawFillRect = (info, style = {}) => {
//     const { x, y, w, h } = info;
//     let canvas = document.getElementById('canvas') as
//       HTMLCanvasElement;
//     let ctx = canvas.getContext("2d");
//     // let ctx = this.canvas.getContext("2d");

//     ctx.beginPath();
//     ctx.fillStyle = 'black';
//     ctx.fillRect(x, y, w, h);
//   }

//   hitBox = (x, y) => {
//     console.log(x, y)
//     let isTarget = null;
//     for (let i = 0; i < this.state.boxes.length; i++) {
//       console.log('length', this.state.boxes.length);

//       const box = this.state.boxes[i];
//       // if (x >= box.x - box.r && x <= box.x + box.r && y >= box.y - box.r && y <= box.y + box.r) {
//       const d = Math.pow(box.r, 2) - (((Math.pow(box.x - x, 2))) + ((Math.pow(box.y - y, 2))))
//       if (d > 0) {
//         console.log("inside", box);
//         this.setState({
//           dragTarget: box,
//         })
//         isTarget = true
//         break
//       }

//       else if (d == 0) { console.log("on the circumference"); }
//       else { console.log("outside"); }


//       // isTarget = true;

//       // }
//       console.log(x, box.x, y, box.y, box.r);

//     }
//     return isTarget;
//   }

//   render() {
//     return (
//       <div>
//         <canvas ref={this.canvas} id="canvas" width="900" height="801"
//           //  onClick={this.getPosition}
//           onMouseDown={this.handleMouseDown}
//           onMouseMove={this.handleMouseMove}
//           onMouseUp={this.handleMouseUp}
//           onMouseOut={this.handleMouseOut}
//         />
//         <img ref="image" src={this.props.imgUrl} style={{ display: 'none' }} />
//       </div>
//     )
//   }
// }


import { boolean, number } from '@storybook/addon-knobs';
import { title } from 'process';
import React, { Component, useEffect, useRef } from 'react'
interface CanvasProps {
  imgUrl
}
export function Canvas(props: CanvasProps) {
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
    imgagDraw.src = props.imgUrl

    imgagDraw.onload = function () {
      const hRatio = canvas.current.clientWidth / imgagDraw.width;
      const vRatio = canvas.current.clientHeight / imgagDraw.height;
      const ratio = Math.min(hRatio, vRatio);
      ctx.drawImage(imgagDraw, 0, 0, imgagDraw.width, imgagDraw.height, 0, 0, imgagDraw.width * ratio, imgagDraw.height * ratio);
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
    console.log("Info", info)
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


