import React from 'react';
import {
  Button,
  Header,
  Modal,
  Input,
  Form,
  Grid,
  Select,
  TextArea,
  Icon
} from 'semantic-ui-react';
// import SampleModal from './sample-modal';

import PinFileStructure from '../filestructure/pinfilestructure';
import AddPinFile from './pinaddfile';
import FilterPopup from './fliter';
import { relative } from 'path';
import { MS_SERVICE_URL } from '@cudo/mf-core';
export interface FileStructureProps {
  // files?,
  downloadFiles?,
  downloadedImg?,
  viewFiles?
  isTaskFile?,
  files?,
  cancel?,
  savePins?
}
export function SelectFilePopup(props: FileStructureProps) {
  const countryOptions = [
    { key: 'af', value: 'af', text: 'Afghanistan' },
    { key: 'ax', value: 'ax', text: 'Aland Islands' },
  ];

  const [open, setOpen] = React.useState(false);
  const [isTick, setIsTick] = React.useState(false);
  const [isPinFile, setIsPinFile] = React.useState(false);
  const [filesData, setFilesData] = React.useState([]);
  const [fileData, setFileData] = React.useState([]);
  const [imgUrl, setimgUrl] = React.useState('');
  const [fType, setFtype] = React.useState('');
  const [view, setView] = React.useState(false);



  React.useEffect(() => {
    if (props.isTaskFile) {
      setOpen(true)
    }
  }, [props.isTaskFile])

  React.useEffect(() => {
    if (props.files) {
      console.log('setFileData', props.files);
      setFileData(props.files)
    }
  }, [props.files])

  const goToAddPin = () => {
    setOpen(false)
    setIsPinFile(true)
    // cancel()
    setView(true);
  }
  const tick = () => {
    setIsTick(isTick => !isTick)
  }
  const cancel = () => {
    setOpen(false)
    props.cancel(false)
  }

  React.useEffect(() => {
    if (props.downloadedImg) {
      console.log('downloadedImg', props.downloadedImg);
      for (let i = 0; i < props.downloadedImg.length; i++) {
        if (props.downloadedImg[i].filename == filesData['fileTitle']) {
          console.log('url', props.downloadedImg[i].url);

          setimgUrl(props.downloadedImg[i].url);
        }
      }

    }
  })
  const viewFiles = (data) => {
    console.log('data-view', data);

    setFtype(data.fileType);
    // setView(true);
    setFilesData(data);
    props.viewFiles(data)
  }

  return (
    <div style={{ marginTop: -10, marginRight: 8 }}>
      {/* {
        isPinFile && <AddPinFile isOpen={isPinFile} />
      } */}
      {view && imgUrl.length > 0 ?
        <div>
          <AddPinFile isOpen={view} filesData={filesData} dowloadFilesData={props.downloadedImg} savePin={props.savePins} />
        </div> : null}
      <Modal className="modal_media right-side--fixed-modal select-file-modal"
        closeIcon
        onClose={cancel}
        onOpen={() => setOpen(true)}
        open={open}
      // trigger={
      //   <Button className="grey-btn" size="mini">
      //     <img src={img1} className="  mr-10 " />
      //     Task from file
      //   </Button>
      // }
      >
        <Modal.Header>
          <h3>Select file</h3>
        </Modal.Header>
        <Modal.Content body>
          <div>
            <Form>
              <div className="slect-file-search-box">
                <Form.Field>
                  <img src="assets/images/search_white.png" style={{ position: 'relative', top: '11px' }}></img>

                  <Input
                    placeholder="search.."
                    size="small"
                    className="full-width inputfieldarea bordernone"
                    type="search" style={{ marginLeft: '5px' }}
                  />
                </Form.Field>
                <Form.Field>

                  <img src={`${MS_SERVICE_URL['ASSETS_CDN_URL'].url}/assets/images/filter.png`} style={{ position: 'relative', left: '30px', top: '6px' }}></img>
                  {/* <FilterPopup /> */}
                  <Button size="small" className="primary" style={{ marginLeft: '50', }}>
                    <Icon name='add' /> Add New
                  </Button>
                </Form.Field>
              </div>
            </Form><br />
            <PinFileStructure uploadNewVersion={null} files={props.files} downloadFiles={props.downloadFiles} viewFiles={viewFiles} downloadedImg={props.downloadedImg} isPinFile={isPinFile}></PinFileStructure>

            {/* <div className="d-flex align-items-center py-2">
              <span>
                <img src={img4} className="  mr-10 " />
              </span>

              <span className="font-weight-bold mb-0 mr-10">
                Information Data
                <br />
                <span
                  className="navi-text"
                  style={{ color: '#9FB5C5', fontSize: '10px' }}
                >
                  ( 5 files )
                </span>
              </span>
            </div> */}
            {/* <a
              href=" "
              className="navi-link active"
              style={{ float: 'right', marginTop: '-28px' }}
            >
              <img src={img3} />
            </a> */}

            {/* <div className="d-flex align-items-center py-2">
              <span>
                <img src={img7} className="  mr-10 " />
              </span>

              <span className="font-weight-bold mb-0 mr-10">
                File 1
                <br /> */}
            {/* <span
                  className="navi-text"
                  style={{ color: '#9FB5C5', fontSize: '10px' }}
                >
                  ( 5 files )
                </span> */}
            {/* </span>
            </div>
            <a
              onClick={tick}
              className="navi-link active"
              style={{ float: 'right', marginTop: '-28px' }}
            > */}
            {/* <img src={img8} /> */}
            {/* {isTick ? <img src={img8} /> : <img src={img9} />}

            </a>
            <div className="d-flex align-items-center py-2">
              <span>
                <img src={img7} className="  mr-10 " />
              </span>

              <span className="font-weight-bold mb-0 mr-10">
                File 2
                <br /> */}
            {/* <span
                  className="navi-text"
                  style={{ color: '#9FB5C5', fontSize: '10px' }}
                >
                  ( 5 files )
                </span> */}
            {/* </span>
            </div>
            <a
              href=" "
              className="navi-link active"
              style={{ float: 'right', marginTop: '-28px' }}
            >
              <img src={img9} />
            </a> */}


          </div>
        </Modal.Content>
        <Modal.Actions>
          <Button
            content="Continue"
            onClick={goToAddPin}
            positive
            size="small"
            className="primary"
          />
          <Button
            size="small"
            className="icon-border"
            onClick={cancel}
          >
            X Cancel
          </Button>
        </Modal.Actions>
      </Modal>
    </div >
  );
}

export default SelectFilePopup;
