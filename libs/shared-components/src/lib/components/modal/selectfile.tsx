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
import img1 from 'libs/shared-components/src/pin_file.png';
import img3 from 'libs/shared-components/src/grey_arrow.png';

import img7 from 'libs/shared-components/src/powerpoint.png';
import img4 from 'libs/shared-components/src/folder.png';

import img8 from 'libs/shared-components/src/circle_blue.png';

import img9 from 'libs/shared-components/src/grey_circle.png';
import FileStructure from '../filestructure/filestask';
import AddPinFile from './pinaddfile';
export interface FileStructureProps {
  // files?,
  // downloadFiles,
  // downloadedImg,
  // viewFiles
}
export function SelectFilePopup(props: FileStructureProps) {
  const countryOptions = [
    { key: 'af', value: 'af', text: 'Afghanistan' },
    { key: 'ax', value: 'ax', text: 'Aland Islands' },
  ];

  const [open, setOpen] = React.useState(false);
  const [isTick, setIsTick] = React.useState(false);
  const [isPinFile, setIsPinFile] = React.useState(false);


  const goToAddPin = () => {
    setOpen(false)
    setIsPinFile(true)

  }
  const tick = () => {
    setIsTick(isTick => !isTick)
  }
  return (
    <div style={{ marginTop: 22, marginRight: 8 }}>
      {
        isPinFile && <AddPinFile isOpen={isPinFile} />
      }
      <Modal
        style={{ width: '360px', marginLeft: '810px', height: '660px' }}
        className="modal_media"
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        trigger={
          <div>
            <img src={img1} className="  mr-10 " />
            <span style={{ marginLeft: '-8px', fontSize: '12px' }}>Task from file</span>
          </div>
        }
      >
        <Modal.Header>
          <label>Select file </label>
        </Modal.Header>
        <Modal.Content body>
          <div>
            {/* <FileStructure files={props.files} downloadFiles={props.downloadFiles} viewFiles={props.viewFiles} downloadedImg={''}></FileStructure> */}

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
                      <Button size="mini" className="grey-btn">
                        + Add New
                      </Button>
                    </Form.Field>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Form><br />
            <div className="d-flex align-items-center py-2">
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
            </div>
            <a
              href=" "
              className="navi-link active"
              style={{ float: 'right', marginTop: '-28px' }}
            >
              <img src={img3} />
            </a>

            <div className="d-flex align-items-center py-2">
              <span>
                <img src={img7} className="  mr-10 " />
              </span>

              <span className="font-weight-bold mb-0 mr-10">
                File 1
                <br />
                {/* <span
                  className="navi-text"
                  style={{ color: '#9FB5C5', fontSize: '10px' }}
                >
                  ( 5 files )
                </span> */}
              </span>
            </div>
            <a
              onClick={tick}
              className="navi-link active"
              style={{ float: 'right', marginTop: '-28px' }}
            >
              {/* <img src={img8} /> */}
              {isTick ? <img src={img8} /> : <img src={img9} />}

            </a>
            <div className="d-flex align-items-center py-2">
              <span>
                <img src={img7} className="  mr-10 " />
              </span>

              <span className="font-weight-bold mb-0 mr-10">
                File 2
                <br />
                {/* <span
                  className="navi-text"
                  style={{ color: '#9FB5C5', fontSize: '10px' }}
                >
                  ( 5 files )
                </span> */}
              </span>
            </div>
            <a
              href=" "
              className="navi-link active"
              style={{ float: 'right', marginTop: '-28px' }}
            >
              <img src={img9} />
            </a>


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
            onClick={() => setOpen(false)}
          >
            X Cancel
          </Button>
        </Modal.Actions>
      </Modal>
    </div>
  );
}

export default SelectFilePopup;
