
import React from 'react';
import { Button, Modal, Grid, Image, Segment, Form, Input, TextArea, Select, Checkbox, Dropdown } from 'semantic-ui-react';
// import SampleModal from './sample-modal';
import Canvas from './canvas';
// import CanvasNew from './canvasnew';
import { useHistory } from 'react-router';
import axios from 'axios';
import { CreateFileTaskIndex, PinTaskListIndex } from '@cudo/mf-task-lib';
import { MS_SERVICE_URL } from '@cudo/mf-core';
import { useTranslation } from 'react-i18next';

import ImageMarker, { Marker } from 'react-image-marker';


function exampleReducer(state, action) {
  switch (action.type) {
    case 'close':
      return { open: false }
    case 'open':
      return { open: true, size: action.size }
    default:
      throw new Error('Unsupported action...')
  }

}

export interface AddPinProps {
  isOpen?,
  cancel?,
  filesData?,
  dowloadFilesData?,
  onSuccess?,
  savePin?,

}
export const AddPinFile = (props: AddPinProps) => {
  const [open, setOpen] = React.useState(false);
  const [allowToCreateNewPin, setAllowToCreateNewPin] = React.useState(false);
  const [fileData, setFileData] = React.useState(null);
  const [pinTasks, setPinTasks] = React.useState([]);
  const [isPinCreated, setIsPinCreated] = React.useState<boolean>(false);
  const [cord, setCord] = React.useState(null);
  const [imgUrl, setimgUrl] = React.useState('');
  const [fileId, setFileId] = React.useState('');
  const [saveNewPinOnCanvase, setSaveNewPinOnCanvase] = React.useState(false);
  const [pinSavedOnCanvase, setPinSavedOnCanvase] = React.useState(false);

  const { t } = useTranslation();
  
  const [markers, setMarkers] = React.useState<Marker[]>([{ top: 10, left: 50 }, { top: 20, left: 70 }, { top: 30, left: 75 }, { top: 35, left: 80 }])

  React.useEffect(() => {
    console.log("--pinaddfile-1-New Pin created ", isPinCreated);
    setAllowToCreateNewPin(false);
  }, [isPinCreated])

  const close = () => {    
    setOpen(false)
    props.cancel(false)
  }

  const openM = () => {
    setOpen(true)
  }

  React.useEffect(() => {
    if (props.isOpen) {
      setOpen(props.isOpen)
    }
  }, [props.isOpen]);

  React.useEffect(() => {
    if (props.filesData) {
      console.log('--pinaddfile-2-filesData==', props.filesData);
      setFileId(props.filesData.uploadedFileID)
      setFileData(props.filesData)
    }
  }, [props.filesData])

  React.useEffect(() => {
    if (props.dowloadFilesData) {
      // const tempPdfFilePath = `${MS_SERVICE_URL['ASSETS_CDN_URL'].url}/assets/images/sample_mk.pdf`
      console.log('--pinaddfile-3-dowloadFilesData-s', props.dowloadFilesData);
      for (let i = 0; i < props.dowloadFilesData.length; i++) {
        if (props.dowloadFilesData[i].filename == props.filesData.fileTitle) {
          console.log('--pinaddfile-4-uploadedfileid', props.dowloadFilesData[i]);
          setimgUrl(props.dowloadFilesData[i].url);
          // setimgUrl(tempPdfFilePath);
        }
      }
    }
  }, [props.dowloadFilesData])

  const getCoardinates = (data) => {
    console.log('--pinaddfile-5-getCoardinates', data);
    setCord(data);
  }
  const onSuccess = async () => {
    console.log('--pinaddfile-6-onSuccess');
    setAllowToCreateNewPin(false);
    setIsPinCreated(false);
  }
  const changePinTask = () => {
    console.log('--pinaddfile-7-changePinTask');
    setAllowToCreateNewPin(true);
  }
  const taskClose = () => {
    setAllowToCreateNewPin(false);
    setIsPinCreated(false);
  }
  return (
    <div >
      <Modal className="pin-add-file"
        closeIcon
        size={'fullscreen'}
        onClose={close}
        onOpen={openM}
        open={open}
        closeOnDimmerClick={false}
      >
        <Modal.Header>
          <h3>
            {props.filesData?.fileTitle}
          </h3>
          <span>
            <a href=""><i className="ms-Icon ms-Icon--ZoomOut" aria-hidden="true"></i></a>
            <a href=""><i className="ms-Icon ms-Icon--ZoomIn" aria-hidden="true"></i></a>
            <a href=""><i className="ms-Icon ms-Icon--Rotate90CounterClockwise" aria-hidden="true"></i></a>
            <a href=""><i className="ms-Icon ms-Icon--Rotate90Clockwise" aria-hidden="true"></i></a>
          </span>
        </Modal.Header>
        <Modal.Content>
          <Form>
            <div className="left-side-image-canvas">
              <Canvas pinSaved={setPinSavedOnCanvase} savePin={saveNewPinOnCanvase} imgUrl={imgUrl} coardinates={getCoardinates} fileId={fileId} allowToCreateNewPin={allowToCreateNewPin} isPinCreated={isPinCreated} setIsPinCreated={setIsPinCreated}></Canvas>
            </div>

            <div className="right-side-file-details">
              <div className="add-pin-mark-field">
                {!isPinCreated ?
                    <Form.Field className="pin-add-field">
                      <button className="ui mini button pinbutton" onClick={changePinTask}>{t('pin_mask.pin_mark_task')}</button>
                      <img src={`${MS_SERVICE_URL['ASSETS_CDN_URL'].url}/assets/images/grey_pin.png`} className="pinadd" />
                    </Form.Field>
                  :
                  <CreateFileTaskIndex pinsaved={pinSavedOnCanvase} savePin={setSaveNewPinOnCanvase} close={taskClose} onSuccess={onSuccess} cord={cord} fileData={fileData}></CreateFileTaskIndex>
                }
                {!isPinCreated ?
                  <PinTaskListIndex filesData={fileData} cord={cord}></PinTaskListIndex> : null}
              </div>
            </div>
          </Form>
        </Modal.Content>

      </Modal>
    </div >
  )
}

export default AddPinFile