
import React from 'react';
import { Button, Modal, Grid, Image, Segment, Form, Input, TextArea, Select, Checkbox, Dropdown } from 'semantic-ui-react';

// import Canvas from './canvas';
import CanvasImage from './canvasimage';

import { useHistory } from 'react-router';
import axios from 'axios';
import { CreateFileTaskIndex, PinTaskListIndex } from '@cudo/mf-task-lib';
import { MS_SERVICE_URL } from '@cudo/mf-core';
import { useTranslation } from 'react-i18next';

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
  taskData?

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

  React.useEffect(() => {
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
      setFileId(props.filesData.uploadedFileID)
      setFileData(props.filesData)
    }
  }, [props.filesData])

  React.useEffect(() => {
    if (props.dowloadFilesData) {
      for (let i = 0; i < props.dowloadFilesData.length; i++) {
        if (props.dowloadFilesData[i].filename == props.filesData.fileTitle) {
          setimgUrl(props.dowloadFilesData[i].url);
          
        }
      }
    }
  }, [props.dowloadFilesData])

  const getCoardinates = (data) => {
    setCord(data);
  }
  const onSuccess = async () => {
    setAllowToCreateNewPin(false);
    setIsPinCreated(false);
  }
  const changePinTask = () => {
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
              <CanvasImage
                pinSaved={setPinSavedOnCanvase}
                savePin={saveNewPinOnCanvase}
                imgUrl={imgUrl}
                coardinates={getCoardinates}
                fileId={fileId}
                allowToCreateNewPin={allowToCreateNewPin}
                isPinCreated={isPinCreated}
                setIsPinCreated={setIsPinCreated}
              ></CanvasImage>  
              
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