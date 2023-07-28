import React, { Suspense } from 'react';
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
import { useTranslation } from 'react-i18next';
import TaskFileStructure from '../filestructure/filestotask';
import { AddFileSettingUpload } from '@cudo/mf-document-lib';
export interface FileStructureProps {
  // files?,
  downloadFiles?,
  downloadedImg?,
  viewFiles?
  isTaskFile?,
  files?,
  cancel?,
  savePins?,
  selectedFileId?,
  fileVersionDetail?,
  fileVersionLoading?,
  onlyAddFileToTask?
  addSelectedFiles?
  selectedFiles?
  changeAdd?
  isVersionSelected?
}
export function SelectFilePopup(props: FileStructureProps) {
  const countryOptions = [
    { key: 'af', value: 'af', text: 'Afghanistan' },
    { key: 'ax', value: 'ax', text: 'Aland Islands' },
  ];

  const [open, setOpen] = React.useState(false);
  // const [isTick, setIsTick] = React.useState(false);
  const [isPinFile, setIsPinFile] = React.useState(false);
  const [filesData, setFilesData] = React.useState([]);
  const [fileData, setFileData] = React.useState([]);
  const [imgUrl, setimgUrl] = React.useState('');
  const [fType, setFtype] = React.useState('');
  const [view, setView] = React.useState(false);
  const { t } = useTranslation()

  const [isVersionSelected, setIsVersionSelected] = React.useState(false)

  React.useEffect(() => {
    if (props.isTaskFile) {
      setOpen(true)
    }
  }, [props.isTaskFile])

  React.useEffect(() => {
    if (props.files) {
      setFileData(props.files)
    }
  }, [props.files])

  const goToAddPin = (data) => {
    if (props.onlyAddFileToTask) {
      props.downloadFiles(data)
      setOpen(false)
      props.cancel(false)
    } else {
      setOpen(false)
      setIsPinFile(true)
      // cancel()
      setView(true);
    }
  }
  // const tick = () => {
  //   setIsTick(isTick => !isTick)
  // }
  const cancel = () => {
    setOpen(false)
    props.cancel(false)
    setView(false);
    props.addSelectedFiles([])
  }

  React.useEffect(() => {
    if (props.downloadedImg) {
      for (let i = 0; i < props.downloadedImg.length; i++) {
        if (props.downloadedImg[i].filename == filesData['fileTitle']) {

          setimgUrl(props.downloadedImg[i].url);
        }
      }

    }
  }, [props.downloadedImg])

  const viewFiles = (data) => {

    setFtype(data.fileType);
    setFilesData(data);
    props.viewFiles(data)
  }

  const getIsVersionSelected = (isSelected) => {
    setIsVersionSelected(isSelected)
    props?.isVersionSelected(isSelected)
  }

  return (
    <div style={{ marginTop: -10, marginRight: 8 }}>
      {/* {
        isPinFile && <AddPinFile isOpen={isPinFile} />
      } */}
      {view ?
        <div>
          <AddPinFile
            isOpen={view}
            cancel={cancel}
            filesData={filesData}
            dowloadFilesData={props.downloadedImg}
            savePin={props.savePins}
            onSuccess={""}
            isVersionSelected={isVersionSelected}
          />
        </div> : null}
      <Modal className="modal_media right-side--fixed-modal select-file-modal"
        // closeIcon
        onClose={cancel}
        onOpen={() => setOpen(true)}
        open={open}
        // trigger={
        //   <Button className="grey-btn" size="mini">
        //     <img src={img1} className="  mr-10 " />
        //     Task from file
        //   </Button>
        // }
        closeOnDimmerClick={false}
      >
        <div className="fixed-popup-inner-con">
          <Modal.Header>
            <h3>{t("project_tab_menu.files.select_file")}</h3> <Icon name='close' onClick={cancel} />
          </Modal.Header>
          <Modal.Content body>
            <div>
              <Form>
                <div className="slect-file-search-box">
                  <Form.Field className="search-box-file">
                    <img src={`${MS_SERVICE_URL['ASSETS_CDN_URL'].url}/assets/images/search_white.png`}></img>

                    <Input
                      placeholder={t("common.search")}
                      size="small"
                      className="full-width"
                      type="search"
                    />
                  </Form.Field>
                  <Form.Field className="filter-with-add-file">

                    <img src={`${MS_SERVICE_URL['ASSETS_CDN_URL'].url}/assets/images/filter.png`}></img>
                    {/* <FilterPopup /> */}
                    <Suspense fallback={<div>Loading...</div>}>
                      <AddFileSettingUpload />

                    </Suspense>
                    {/* <Button size="small" className="primary" style={{ marginLeft: '50', }}>
                    <Icon name='add' /> {t("common.add_new_button")}
                  </Button>  */}
                  </Form.Field>
                </div>
              </Form><br />
              {
                props?.onlyAddFileToTask ? (
                  <TaskFileStructure
                    uploadNewVersion={null}
                    files={props.files}
                    downloadFiles={props.downloadFiles}
                    viewFiles={viewFiles}
                    downloadedImg={props.downloadedImg}
                    isPinFile={isPinFile}
                    selectedFileId={props.selectedFileId}
                    fileVersionDetail={props.fileVersionDetail}
                    fileVersionLoading={props.fileVersionLoading}
                    addSelectedFiles={props.addSelectedFiles}
                    selectedFiles={props.selectedFiles}
                  />
                ) : (
                  <PinFileStructure
                    uploadNewVersion={null}
                    files={props.files}
                    downloadFiles={props.downloadFiles}
                    viewFiles={viewFiles}
                    downloadedImg={props.downloadedImg}
                    isPinFile={isPinFile}
                    selectedFileId={props.selectedFileId}
                    fileVersionDetail={props.fileVersionDetail}
                    fileVersionLoading={getIsVersionSelected}
                  ></PinFileStructure>
                )
              }




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
              content={t("common.continue")}
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
              <i className="ms-Icon ms-font-xl ms-Icon--CalculatorMultiply"></i> {t("common.cancel")}
            </Button>
          </Modal.Actions>
        </div>
      </Modal>
    </div >
  );
}

export default SelectFilePopup;
