import React, { Component } from 'react'
// import img1 from 'libs/shared-components/src/powerpoint.png';
type MyProps = {
  // using `interface` is also ok
  imgUrl: string;
};
export default class Canvas extends Component<MyProps> {
  componentDidMount() {
    // const canvas = this.refs.canvas
    // const ctx = canvas.getContext("2d")

    const canvas = document.getElementById('canvas') as
      HTMLCanvasElement;
    const context = canvas.getContext("2d");
    console.log('context', context);
    console.log('canvas', canvas);

    // const img = this.refs.image;
    // console.log('img', img)
    // const img = document.getElementById('img')
    // console.log('img', img);

    // img.onload = () => {
    //   context.drawImage(img, 0, 0)
    //   // context.font = "40px Courier"
    //   // context.fillText(this.context, 210, 75)
    // }
  }
  render() {
    return (
      <div>
        <canvas id="canvas" />
        {/* <img ref="image" src={this.props.imgUrl} style={{ display: 'none' }} className="hidden" /> */}
      </div>
    )
  }
}
