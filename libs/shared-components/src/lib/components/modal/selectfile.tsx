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
} from 'semantic-ui-react';
// import SampleModal from './sample-modal';
import img1 from 'libs/shared-components/src/file_pin.png';
import img3 from 'libs/shared-components/src/grey_arrow.png';

import img7 from 'libs/shared-components/src/powerpoint.png';
import img4 from 'libs/shared-components/src/folder.png';

import img8 from 'libs/shared-components/src/circle_blue.png';

import img9 from 'libs/shared-components/src/grey_circle.png';
import PinFileStructure from '../filestructure/pinfilestructure';
import AddPinFile from './pinaddfile';
import FilterPopup from './fliter';
export interface FileStructureProps {
  // files?,
  downloadFiles,
  downloadedImg,
  viewFiles
  isTaskFile,
  files,
  cancel
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
    setView(true);
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
          <AddPinFile isOpen={view} filesData={filesData} dowloadFilesData={props.downloadedImg} ></AddPinFile>
        </div> : null}
      <Modal
        style={{ width: '500px', marginLeft: '605px', height: '660px' }}
        className="modal_media"
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
          <label>Select file </label>
        </Modal.Header>
        <Modal.Content body>
          <div >

            <Form>
              <Grid columns={2}>
                <Grid.Row>
                  <Grid.Column>
                    <Form.Field>
                      <Input
                        placeholder="search"
                        size="small"
                        className="full-width inputfieldarea"
                        type="search"
                      />
                    </Form.Field>
                  </Grid.Column>
                  <Grid.Column>
                    <Form.Field>
                      &nbsp;&nbsp;
                      <img src={img1} className="  mr-10 " />
                      {/* <FilterPopup /> */}
                      <Button size="mini" className="grey-btn" style={{ marginLeft: 40 }}>
                        + Add New
                      </Button>
                    </Form.Field>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
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
            size="mini"
            className="grey-btn"
          />
          <Button
            size="mini"
            className="icon-border"
            onClick={cancel}
          >
            X Cancel
          </Button>
        </Modal.Actions>
      </Modal>
    </div>
  );
}

export default SelectFilePopup;
