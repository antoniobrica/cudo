
import React from 'react';
import { Button, Modal, Grid, Image, Segment, Form, Input, TextArea, Select, Checkbox, Dropdown } from 'semantic-ui-react';
// import SampleModal from './sample-modal';
import Canvas from './canvas';
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
  
  React.useEffect(() => {
    console.log("New Pin created ", isPinCreated);
    setAllowToCreateNewPin(false);
  }, [isPinCreated])

  const close = () => {
    setOpen(false)
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
      console.log('filesData==', props.filesData);
      setFileId(props.filesData.uploadedFileID)
      setFileData(props.filesData)
    }
  }, [props.filesData])
  React.useEffect(() => {
    if (props.dowloadFilesData) {
      console.log('dowloadFilesData-s', props.dowloadFilesData);
      for (let i = 0; i < props.dowloadFilesData.length; i++) {
        if (props.dowloadFilesData[i].filename == props.filesData.fileTitle) {
          console.log('uploadedfileid', props.dowloadFilesData[i]);
          setimgUrl(props.dowloadFilesData[i].url);
        }
      }
    }
  })

  const getCoardinates = (data) => {
    console.log('getCoardinates', data);
    setCord(data);
  }
  const onSuccess = async () => {
    console.log('onSuccess');
    setAllowToCreateNewPin(false);
    setIsPinCreated(false);
  }
  const changePinTask = () => {
    console.log('changePinTask');
    setAllowToCreateNewPin(true);
  }
  const taskClose = () => {
    setAllowToCreateNewPin(false);
    setIsPinCreated(false);
  }
  return (
    <div >
      <Modal
        size={'fullscreen'}
        onClose={close}
        onOpen={openM}
        open={open}
        style={{ marginLeft: '35px' }}
        closeOnDimmerClick={false}
      >
        <Modal.Header>{props.filesData?.fileTitle}
          <div style={{ textAlign: 'center', marginBottom: '-30px' }}>
            <img src={`${MS_SERVICE_URL['ASSETS_CDN_URL'].url}/assets/images/icons_top.png`} style={{ position: 'relative', top: '-17px' }} />

            <a onClick={close}><img src={`${MS_SERVICE_URL['ASSETS_CDN_URL'].url}/assets/images/cross_grey.png`} style={{ position: 'relative', top: '-17px', left: '540px' }} /></a>
          </div>
        </Modal.Header>
        <Modal.Content style={{ marginTop: '-1px' }}>
          <Form>
            <Grid stackable columns={2}>
              <Grid.Column className="colorback" style={{ width: '65%' }}>
                <Segment>
                  <Canvas pinSaved={setPinSavedOnCanvase} savePin={saveNewPinOnCanvase} imgUrl={imgUrl} coardinates={getCoardinates} fileId={fileId} allowToCreateNewPin={allowToCreateNewPin} isPinCreated={isPinCreated} setIsPinCreated={setIsPinCreated}></Canvas>
                </Segment>
              </Grid.Column>
              <Grid.Column style={{ width: '35%', marginLeft: '-9px', marginTop: '-10px' }}>
                <div style={{ background: '#F1F5F8', padding: '10px', marginBottom: '-18px' }}>
                  <div>
                    {!isPinCreated ?
                      <div style={{ background: '#F1F5F8', padding: '10px', marginBottom: '-18px' }}>
                        <Form.Field classname="buttonbluedown">
                          <label> </label>
                          <button className="ui mini button pinbutton" onClick={changePinTask}>{t('pin_mask.pin_mark_task')}</button>
                          <img src={`${MS_SERVICE_URL['ASSETS_CDN_URL'].url}/assets/images/grey_pin.png`} className="pinadd" />
                        </Form.Field>
                      </div>
                      :
                      <CreateFileTaskIndex pinsaved={pinSavedOnCanvase} savePin={setSaveNewPinOnCanvase} close={taskClose} onSuccess={onSuccess} cord={cord} fileData={fileData}></CreateFileTaskIndex>
                    }
                    {!isPinCreated ?
                      <PinTaskListIndex filesData={fileData} cord={cord}></PinTaskListIndex> : null}
                  </div>
                </div>
              </Grid.Column>

            </Grid>
          </Form>
        </Modal.Content>

      </Modal>
    </div >
  )
}

export default AddPinFile