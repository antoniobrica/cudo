
import React, { Component, useEffect, useRef, useState } from 'react'
import LazyLoading from '../loader/lazyloader';
import CanvasPins from './canvaspins';

export interface CanvasImageProps {
  imgUrl?,
  coardinates?,
  fileId?,
  allowToCreateNewPin?
  isPinCreated?
  setIsPinCreated?
  savePin?
  pinSaved?
  hoveredTaskTypeID?
  parentWisePinFetch?
  parentFileId?
  isVersionSelected?
  showCompletedPins?
}
export function CanvasImage(props: CanvasImageProps) {
  const [loading, setLoading] = useState(false)
  const canvasImage = useRef<HTMLCanvasElement>();

  useEffect(() => {
    setLoading(true)
  },[])
  
  useEffect(() => {
    if (props.imgUrl) {
      const imgagDraw = new Image();
      imgagDraw.src = props.imgUrl;
      imgagDraw.onload = function () {
        const canvasImageElement = canvasImage.current
        // setLoading(false)
        canvasImageElement.width = canvasImageElement.clientWidth
        canvasImageElement.height = canvasImageElement.clientHeight
        const hRatio = canvasImage.current.clientWidth / imgagDraw.width;
        const vRatio = canvasImage.current.clientHeight / imgagDraw.height;
        const ratio = Math.min(hRatio, vRatio);

        const canvasImageContext = canvasImageElement.getContext('2d')
        canvasImageContext.drawImage(imgagDraw, 0, 0, imgagDraw.width, imgagDraw.height, 0, 0, imgagDraw.width * ratio, imgagDraw.height * ratio);
      }
      setLoading(false)
    }
  }, [props.imgUrl]);

  return (


    <div className="outsideWrapper">
      <div className="insideWrapper">
        {
          loading ? <LazyLoading /> : (
            <canvas id="canvasImage" className="coveringCanvas"
              width="800" height="700"
              ref={canvasImage}></canvas>
          )
        }


        <CanvasPins
          pinSaved={props?.pinSaved}
          savePin={props?.savePin}
          coardinates={props?.coardinates}
          fileId={props?.fileId}
          allowToCreateNewPin={props?.allowToCreateNewPin}
          isPinCreated={props?.isPinCreated}
          setIsPinCreated={props?.setIsPinCreated}
          hoveredTaskTypeID={props?.hoveredTaskTypeID}
          parentWisePinFetch={props?.parentWisePinFetch}
          parentFileId={props?.parentFileId}
          isVersionSelected={props?.isVersionSelected}
          showCompletedPins={props?.showCompletedPins}
        ></CanvasPins>
      </div>
    </div>
  );
}

export default CanvasImage;


