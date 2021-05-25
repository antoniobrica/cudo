import React, { Component } from 'react'
import img1 from 'libs/shared-components/src/powerpoint.png';
type MyProps = {
  // using `interface` is also ok
  imgUrl: string;
};
export default class Canvas extends Component<MyProps> {
  componentDidMount() {
    // const canvas = this.refs.canvas
    // const ctx = canvas.getContext("2d")

    let canvas = document.getElementById('canvas') as
      HTMLCanvasElement;
    let context = canvas.getContext("2d");
    console.log('context', context);
    console.log('canvas', canvas);

    const img = this.refs.image;
    console.log('img', img)
    // const img = document.getElementById('img')
    console.log('img', img);

    img.onload = () => {
      context.drawImage(img, 10, 10)
      // context.font = "40px Courier"
      // context.fillText(this.context, 210, 75)
    }
    // const x = 357.75
    // const y = 457.75
    // this.drawCoordinates(x, y)
  }

  drawCoordinates = (x, y) => {
    console.log('x,y', x, y);

    let pointSize = 10; // Change according to the size of the point.
    let canvas = document.getElementById('canvas') as
      HTMLCanvasElement;
    let context = canvas.getContext("2d");
    context.fillStyle = "#FFA500"; // Red color
    context.fillText('1', x + 20, y + 20)
    context.beginPath(); //Start path
    context.arc(x, y, pointSize, 0, Math.PI * 2, true); // Draw a point using the arc function of the canvas with a point structure.
    context.fill(); // Close the path and fill.
  }

  getPosition = (event) => {
    let canvas = document.getElementById('canvas') as
      HTMLCanvasElement;
    let rect = canvas.getBoundingClientRect();
    let x = event.clientX - rect.left; // x == the location of the click in the document - the location (relative to the left) of the canvas in the document
    let y = event.clientY - rect.top; // y == the location of the click in the document - the location (relative to the top) of the canvas in the document
    console.log('dimenstion', x, y);

    // This method will handle the coordinates and will draw them in the canvas.
    this.drawCoordinates(x, y);
  }

  render() {
    return (
      <div>
        <canvas id="canvas" width="900" height="801" onClick={this.getPosition} />
        <img ref="image" src={this.props.imgUrl} style={{ display: 'none' }} className="hidden" />
      </div>
    )
  }
}
