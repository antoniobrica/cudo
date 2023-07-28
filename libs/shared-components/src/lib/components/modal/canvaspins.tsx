import React, { Component, useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { MS_SERVICE_URL } from '@cudo/mf-core';

import CanvasTransparentNewPin from './canvastransparentnewpin';
export interface CanvasPinsProps {
  // imgUrl?,
  coardinates?;
  fileId?;
  allowToCreateNewPin?;
  isPinCreated?;
  setIsPinCreated?;
  savePin?;
  pinSaved?;
  hoveredTaskTypeID?;
  parentWisePinFetch?;
  parentFileId?;
  isVersionSelected?;
  showCompletedPins?;
}
export function CanvasPins(props: CanvasPinsProps) {
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

  const [latestPinNumber, setLatestPinNumber] = React.useState<number>(0);

  const [isAllPinCanvasHide, setAllPinCanvasHide] = useState(true);

  enum Status {
    INPROGRESS = 'INPROGRESS',
    COMPLETED = 'COMPLETED',
  }
  // console.log('-1-parentWisePinFetch---', props?.parentWisePinFetch, )
  // console.log('-2-parentFileId---', props?.parentFileId, )
  // console.log('-3-isVersionSelected---', props?.isVersionSelected, )
  // #region Query and API Call
  const getPinQuery = `query Pins($parentUploadedFileID:String, $uploadedFileID: String, $status: String) {
  pins(
    pinsFilter:{ 
      parentUploadedFileID: $parentUploadedFileID
      uploadedFileID: $uploadedFileID
      status:$status
    }
  ) { 
      pinsID 
      x_axis 
      y_axis 
      z_axis 
      pinNumber
      status
    } 
  }`;

  const createNewPinQuery = `mutation 
  CreatePins(
      $parentUploadedFileID: String
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
        parentUploadedFileID: $parentUploadedFileID
        uploadedFileID: $uploadedFileID
        x_axis:$x_axis
        y_axis:$y_axis
        z_axis:$z_axis
        isDeleted:$isDeleted 
        pageNumber: $pageNumber
        pinNumber: $pinNumber
      }
    )    
    {     
      pinsID 
      parentUploadedFileID
      uploadedFileID 
      x_axis 
      y_axis 
      z_axis 
      pinNumber
      isDeleted 
      updatedBy 
      createdBy 
      createdAt 
      updatedAt 
    }     
  } `;

  const updatePinPositionQuery = `mutation 
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
      }
    )    
    {     
      pinsID 
      uploadedFileID 
      x_axis 
      y_axis 
      z_axis 
      pinNumber
      isDeleted 
      updatedBy 
      createdBy 
      createdAt 
      updatedAt 
    }    
  } `;

  const statusFilter = props?.showCompletedPins === false ? { status: Status.INPROGRESS } : '';
  const pinFetchFilter =
    props?.parentWisePinFetch === true
      ? {
          parentUploadedFileID: props?.isVersionSelected === true ? props?.parentFileId : props.fileId,
          ...statusFilter,
        }
      : {
          uploadedFileID: props.fileId,
          status: Status.INPROGRESS,
        };
  // console.log('-4--canvas----pinFetchFilter---', pinFetchFilter)
  const getPins = async () => {
    try {
      const res = await axios.post(MS_SERVICE_URL['ms_document'].url, {
        query: getPinQuery,
        variables: pinFetchFilter,
        // variables: {
        //   uploadedFileID: props.fileId
        // }
      });

      const lastBoxes = res.data.data.pins.map((box, id) => {
        return {
          x: box.x_axis,
          y: box.y_axis,
          r: 10,
          // pinNumber: JSON.stringify(id + 1),
          pinNumber: JSON.stringify(box.pinNumber),
          pinsID: box.pinsID,
          hovercolor: 'blue',
          blurcolor: 'yellow',
          newcolor: 'white',
          completedcolor: 'green',
          isNewPin: false,
          isHovering: false,
          isCompleted: box.status === 'INPROGRESS' ? false : true,
        };
      });

      props.coardinates(lastBoxes[lastBoxes.length - 1]);
      setpinList([...lastBoxes]);
      return lastBoxes;
    } catch (error) {
      console.log(error);
    }
  };

  const saveNewPin = async (dragTargetTemp) => {
    try {
      if (dragTargetTemp?.pinsID == '') {
        const res = await axios.post(MS_SERVICE_URL['ms_document'].url, {
          query: createNewPinQuery,
          variables: {
            // parentUploadedFileID: props?.parentFileId,
            parentUploadedFileID: props?.isVersionSelected === true ? props?.parentFileId : props.fileId,
            uploadedFileID: props.fileId,
            x_axis: dragTargetTemp.x,
            y_axis: dragTargetTemp.y,
            z_axis: 0,
            pinNumber: Number(dragTargetTemp.pinNumber),
            isDeleted: false,
            pageNumber: 1,
          },
        });
        props.coardinates(res.data.data.createPins);
        dragTargetTemp.pinsID = res.data.data.createPins.pinsID;
        updateSetBoxes(dragTargetTemp);
        props.pinSaved(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updatePin = async (dragTargetTemp) => {
    try {
      if (!dragTargetTemp || dragTargetTemp?.isNewPin) return;
      if (dragTargetTemp?.pinsID != '') {
        const updatePinLocation = await axios.post(MS_SERVICE_URL['ms_document'].url, {
          query: updatePinPositionQuery,
          variables: {
            x_axis: dragTargetTemp.x,
            y_axis: dragTargetTemp.y,
            z_axis: 0,
            isDeleted: false,
            uploadedFileID: props.fileId,
            pinsID: dragTargetTemp.pinsID,
          },
        });
        updateSetBoxes(dragTargetTemp);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getLatestPinNumber = async () => {
    try {
      const res = await axios.post(MS_SERVICE_URL['ms_document'].url, {
        query: getPinQuery,
        variables: {
          parentUploadedFileID: props?.isVersionSelected === true ? props?.parentFileId : props.fileId,
        },
      });
      // console.log('-5---query---getLatestPinNumber--props?.isVersionSelected--',props?.isVersionSelected,
      // '--props?.parentFileId--', props?.parentFileId, '--props.fileId--', props.fileId)

      const latestPinDetail = res?.data?.data?.pins[res?.data?.data?.pins?.length - 1];
      let latestPinNumber = 0;
      if (latestPinDetail) {
        latestPinNumber = latestPinDetail?.pinNumber;
      }
      // console.log('-6--getLatestPinNumber--latestPinNumber----', latestPinDetail?.pinNumber)
      setLatestPinNumber(latestPinNumber);
      return latestPinNumber;
    } catch (error) {
      console.log(error);
    }
  };
  // #endregion

  // initialize the canvasToDrawCircle context
  useEffect(() => {
    const canvasToDrawCircleEle = canvasToDrawCircle.current;
    canvasToDrawCircleEle.width = canvasToDrawCircleEle.clientWidth;
    canvasToDrawCircleEle.height = canvasToDrawCircleEle.clientHeight;
    // const canvasToDrawImageEle = canvasToDrawImage.current;
    // canvasToDrawImageEle.width = canvasToDrawImageEle.clientWidth;
    // canvasToDrawImageEle.height = canvasToDrawImageEle.clientHeight;
    setCtxToDrawCircle(canvasToDrawCircleEle.getContext('2d'));
    // setCtxToDrawImage(canvasToDrawImageEle.getContext("2d"));

    getPins().then(() => {
      //
    });

    getLatestPinNumber().then(() => {
      //
    });
  }, [props?.showCompletedPins]);

  // useEffect (() => {
  //   getLatestPinNumber().then(() => { })
  // }, [props?.showCompletedPins]);

  useEffect(() => {
    if (!props.isPinCreated)
      getPins().then(() => {
        //
      });
  }, [props.isPinCreated]);

  useEffect(() => {
    redrawAfterPinPotionChanged();
  }, [pinList]);

  useEffect(() => {
    if (!isCircleSelectedOnMouseHover) return;
    redrawOnMouseHoverOverCircle();
    setIsCircleSelectedOnMouseHover(false);
  }, [isCircleSelectedOnMouseHover]);

  useEffect(() => {
    if (isCircleSelectedOnMouseDown) {
      props.coardinates({ pinsID: dragTarget?.pinsID, pinNumber: dragTarget?.pinNumber });
      return;
    }
    if (props.isPinCreated || !props.allowToCreateNewPin) {
      return;
    }
    const drawObj = {
      x: x_axis,
      y: y_axis,
      r: 10,
      // pinNumber: JSON.stringify(pinList.length + 1),
      pinNumber: JSON.stringify(pinList[pinList.length - 1]?.pinNumber + 1),
      pinsID: '',
      hovercolor: 'blue',
      blurcolor: 'yellow',
      newcolor: 'white',
      completedcolor: 'green',
      isHovering: true,
      isNewPin: true,
      isCompleted: false,
    };
    let isFound = false;
    let lastBoxes = [...pinList];
    lastBoxes = lastBoxes.map((box) => {
      if (box.pinsID == drawObj.pinsID) {
        const dragObj = { ...box };
        dragObj.x = drawObj.x;
        dragObj.y = drawObj.y;
        dragObj.isNewPin = drawObj.isNewPin;
        dragObj.isHovering = drawObj.isHovering;
        isFound = true;
        return { ...dragObj };
      }
      return box;
    });
    if (!isFound) {
      lastBoxes.push(drawObj);
    }
    setpinList([...lastBoxes]);
    // props.setIsPinCreated(true);
  }, [props.isPinCreated, isCircleSelectedOnMouseDown, x_axis, y_axis]);

  useEffect(() => {
    let lastBoxes = [...pinList];
    lastBoxes = lastBoxes.map((box) => {
      if (box.pinsID == dragTarget.pinsID) {
        const dragObj = { ...box };
        dragObj.x = dragTarget.x;
        dragObj.y = dragTarget.y;
        dragObj.isFound = dragTarget.isFound;
        return { ...dragObj };
      }
      return box;
    });
    if (!isCircleSelectedOnMouseDown && !props.allowToCreateNewPin) {
      setpinList([...lastBoxes]);
    }
    if (!isCircleSelectedOnMouseDown && !props.allowToCreateNewPin && !dragTarget?.isNewPin) {
      updatePin(dragTarget);
    }
    if (isCircleSelectedOnMouseHover) {
      props.coardinates({ pinsID: dragTarget?.pinsID, pinNumber: dragTarget?.pinNumber });
      return;
    }
  }, [dragTarget, isCircleSelectedOnMouseDown, isCircleSelectedOnMouseHover]);

  useEffect(() => {
    if (!props.savePin) {
      props.pinSaved(false);
      return;
    }
    saveNewPin(dragTarget);
  }, [props.savePin]);

  useEffect(() => {
    if (props?.hoveredTaskTypeID) {
      pinList.map((item) => {
        if (item.pinsID === props?.hoveredTaskTypeID) {
          hitCircleOnMouseHover(item.x, item.y);
        }
      });
    }
  }, [props?.hoveredTaskTypeID]);

  const updateSetBoxes = (dragTargetTemp) => {
    let lastBoxes = [...pinList];
    lastBoxes = lastBoxes.map((box) => {
      if (box.pinsID == dragTargetTemp.pinsID) {
        const dragObj = { ...box };
        dragObj.x = dragTargetTemp.x;
        dragObj.y = dragTargetTemp.y;
        return { ...dragObj };
      }
      return box;
    });
    setpinList([...lastBoxes]);
  };

  const drawImagesWithPins = () => {
    pinList.map((info) => {
      drawFillCircle(info);
    });
  };

  const redrawAfterPinPotionChanged = () => {
    if (ctxToDrawCircle) {
      ctxToDrawCircle.clearRect(0, 0, canvasToDrawCircle.current.clientWidth, canvasToDrawCircle.current.clientHeight);
      drawImagesWithPins();
    }
  };

  const redrawOnMouseHoverOverCircle = () => {
    if (ctxToDrawCircle) {
      ctxToDrawCircle.clearRect(0, 0, canvasToDrawCircle.current.clientWidth, canvasToDrawCircle.current.clientHeight);
      drawImagesWithPinsOnMouseHover();
    }
  };

  const drawImagesWithPinsOnMouseHover = () => {
    pinList.map((info) => {
      drawFillCircle(info);
    });
  };

  const drawFillCircle = (info, style = {}) => {
    const { x, y, pinNumber } = info;
    const pointSize = 10; // Change according to the size of the point.
    if (!info.isNewPin)
      ctxToDrawCircle.fillStyle = info.isHovering
        ? info.hovercolor
        : info.isCompleted
        ? info.completedcolor
        : info.blurcolor;
    // Red color
    else ctxToDrawCircle.fillStyle = info.isHovering ? info.hovercolor : info.newcolor;
    ctxToDrawCircle.beginPath(); //Start path
    ctxToDrawCircle.arc(x, y, pointSize, 0, Math.PI * 2, true); // Draw a point using the arc function of the canvasToDrawCircle with a point structure.
    ctxToDrawCircle.fill(); // Close the path and fill.
    ctxToDrawCircle.closePath();
    ctxToDrawCircle.stroke();
    ctxToDrawCircle.beginPath(); //Start path
    ctxToDrawCircle.fillStyle = 'black';
    ctxToDrawCircle.fillText(pinNumber, x - 3, y + 3);
    ctxToDrawCircle.fill();
    ctxToDrawCircle.closePath();
    ctxToDrawCircle.stroke();
  };

  const hitCircle = (x, y) => {
    let isTarget = false;
    for (let i = 0; i < pinList.length; i++) {
      const box = pinList[i];
      const d = Math.pow(box.r, 2) - (Math.pow(box.x - x, 2) + Math.pow(box.y - y, 2));
      if (d > 0) {
        box.isHovering = true;
        setDragTarget(box);
        isTarget = true;
        setIsCircleSelectedOnMouseDown(isTarget);
      } else if (d == 0) {
        box.isHovering = false;
      } else {
        box.isHovering = false;
      }
    }
    return isTarget;
  };

  const hitCircleOnMouseHover = (x, y) => {
    for (let i = 0; i < pinList.length; i++) {
      const box = pinList[i];
      const d = Math.pow(box.r, 2) - (Math.pow(box.x - x, 2) + Math.pow(box.y - y, 2));
      if (d > 0) {
        box.isHovering = true;
        setDragTarget(box);
        setIsCircleSelectedOnMouseHover(true);
      } else if (d == 0) {
        box.isHovering = false;
      } else {
        box.isHovering = false;
      }
    }
  };

  const handleMouseDown = (e) => {
    startX = e.nativeEvent.offsetX - canvasToDrawCircle.current.clientLeft;
    startY = e.nativeEvent.offsetY - canvasToDrawCircle.current.clientTop;
    setx_Axis(startX);
    sety_Axis(startY);
    hitCircle(startX, startY);
  };

  const handleMouseMove = (e) => {
    setAllPinCanvasHide(true);
    if (!isCircleSelectedOnMouseHover) {
      startX = e.nativeEvent.offsetX - canvasToDrawCircle.current.clientLeft;
      startY = e.nativeEvent.offsetY - canvasToDrawCircle.current.clientTop;
      setx_Axis(startX);
      sety_Axis(startY);
      hitCircleOnMouseHover(startX, startY);
    }
    if (!isCircleSelectedOnMouseDown) return;
    const mouseX = e.nativeEvent.offsetX - canvasToDrawCircle.current.clientLeft;
    const mouseY = e.nativeEvent.offsetY - canvasToDrawCircle.current.clientTop;
    startX = mouseX;
    startY = mouseY;
    const dragObj = { ...dragTarget };
    dragObj.x = startX;
    dragObj.y = startY;
    dragObj.isNewPin = true;
    setDragTarget({ ...dragObj });
  };

  const handleMouseUp = (e) => {
    setIsCircleSelectedOnMouseDown(false);
  };

  const handleMouseOut = (e) => {
    handleMouseUp(e);
  };

  const getSelectedNewTaskCoOrdinates = (newPinDetail) => {
    setpinList([...pinList, newPinDetail]);
    props.setIsPinCreated(true);
  };

  return (
    <>
      <canvas
        id="canvasCreatedPins"
        className="transparentCanvas"
        width="800"
        height="700"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseOut={handleMouseOut}
        ref={canvasToDrawCircle}
      ></canvas>

      {props?.allowToCreateNewPin ? (
        <CanvasTransparentNewPin
          allowToCreateNewPin={props.allowToCreateNewPin}
          selectedNewTaskCoOrdinate={getSelectedNewTaskCoOrdinates}
          // lastPinDetail={pinList && pinList?.length > 0 && pinList[pinList?.length - 1]}
          latestPinNumber={latestPinNumber}
        ></CanvasTransparentNewPin>
      ) : null}
    </>
  );
}

export default CanvasPins;
