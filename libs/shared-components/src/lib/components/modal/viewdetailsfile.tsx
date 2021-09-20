import React from 'react'
import { Button, Pagination, Modal, Input, Form, Grid, Image, Comment, Dropdown, Select, TextArea, Radio, Icon } from 'semantic-ui-react'
import Canvas from './canvas';
// import { Document, Page } from 'react-pdf';
import { PinTaskListIndex } from '@cudo/mf-task-lib';
import { CommentAdd, CommentList } from '@cudo/mf-document-lib'

import { Document, Page, pdfjs } from "react-pdf";
import { MS_SERVICE_URL } from '@cudo/mf-core';
import CanvasImage from './canvasimage';
import LazyLoading from '../loader/lazyloader';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

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
const countryOptions = [
  { key: 'af', value: 'af', text: 'Afghanistan' },
  { key: 'ax', value: 'ax', text: 'Aland Islands' },

]

const versionOptions = [
  { key: 'af', value: 'map 1', text: 'Ver 1' },
  { key: 'ax', value: 'map 2', text: 'Ver 2' },
]

export interface FileDetailsProps {
  open?,
  filesData?,
  dowloadFilesData?,
  fType?
  cancel?
}
export const ViewFileDetail = (props: FileDetailsProps) => {
  // const [state, dispatch] = React.useReducer(exampleReducer, {
  //   open: false,
  //   size: undefined,
  // })
  // const { open, size } = state
  const [open, setOpen] = React.useState(null);
  const [files, setFiles] = React.useState();
  const [imgUrl, setimgUrl] = React.useState('');
  const [numPages, setNumPages] = React.useState(null);
  const [pageNumber, setPageNumber] = React.useState(1);
  const [isPinCreated, setIsPinCreated] = React.useState<boolean>(false);
  const [pinSavedOnCanvase, setPinSavedOnCanvase] = React.useState(false);

  const [hideCommentPanel, setHideCommentPanel] = React.useState(false)
  const [expandVersion, setExpandVersion] = React.useState(false);

  const [pinCount, setPinCount] = React.useState(0)
  const [cord, setCord] = React.useState(null);

  const [expand, setExpand] = React.useState(false)
  const [hoveredTaskTypeID, setHoveredTaskTypeID] = React.useState(null)

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }


  React.useEffect(() => {
    // if (props.open) {
      setOpen(props.open)
    // }
  }, [props.open]);


  React.useEffect(() => {
    if (props.dowloadFilesData) {
      for (let i = 0; i < props.dowloadFilesData.length; i++) {
        if (props.dowloadFilesData[i].filename == props.filesData.fileTitle) {
          setimgUrl(props.dowloadFilesData[i].url);
        }
      }

    }
  }, [props.dowloadFilesData])

  React.useEffect(() => {
    if (props.filesData) {
      setFiles(props.filesData)
    }
  }, [props.filesData])

  const cancel = () => {
    setOpen(false);
    props.cancel(true);
  }
  const openf = () => {
    setOpen(true)
  }

  const onClickFileVersion = () => {
    // const onClickFileVersion = (uploadedFileVersionId) => {
    // if (uploadedFileVersionId === selectedExpandVersionId) {
    // 	setExpandVersion(!expandVersion)
    // } else {
    setExpandVersion(!expandVersion)
    // }

    // setSelectedExpandVersionId(uploadedFileVersionId)
    // props.selectedFileId(uploadedFileVersionId)
  }

  const getPinCount = (count) => {
    setPinCount(count)
  }

  const getCoardinates = (data) => {
    setCord(data);
  }

  const getTaskHovered = (taskTypeID) => {
    setHoveredTaskTypeID(taskTypeID)
  }

  const onClickTaskExpand = () => {
    setExpand(!expand)
  }

  return (
    <div id="navbar">
      {/* <Button className="grey-btn" onClick={() => dispatch({ type: 'open', size: 'fullscreen' })}>
           view Files
        </Button> */}
      <Modal className={hideCommentPanel ? "view-pin-detail-popup hide-sidebar" : "view-pin-detail-popup"}
        // closeIcon
        size={'fullscreen'}
        open={open}
        onClose={() => setOpen(false)}
        onOpen={openf}
        closeOnDimmerClick={false}
      >
        <Modal.Content>
          <Form>
            <div className="view-pin-detail-popup">
              <div className="left-side-detail-file">
                {props.fType == 'application/pdf' ?
                  <Document
                    file={imgUrl}
                    onLoadSuccess={onDocumentLoadSuccess}
                  >
                    <Page pageNumber={pageNumber} />
                  </Document>
                  :
                  <div className="left-side-image-canvas">
                    {imgUrl ?
                      <CanvasImage
                        pinSaved={setPinSavedOnCanvase}
                        // savePin={saveNewPinOnCanvase}
                        imgUrl={imgUrl}
                        coardinates={getCoardinates}
                        fileId={props.filesData.uploadedFileID}
                        allowToCreateNewPin={false}
                        isPinCreated={isPinCreated}
                        setIsPinCreated={setIsPinCreated}
                        hoveredTaskTypeID={hoveredTaskTypeID}
                      ></CanvasImage>
                      : <LazyLoading />}
                  </div>
                }
                {/* <div className="file-pagination">File versions
                  <Pagination
                    defaultActivePage={1}
                    firstItem={null}
                    lastItem={null}
                    pointing
                    secondary
                    totalPages={1}
                  />
                </div> */}
              </div>
            </div>



            <div className="right-side-file-information">

              <div>
                <Form>
                  <Modal.Header><h3 className="title-select">
                    <span> File detail
                    </span>
                    <span>
                      <i className="ms-Icon ms-Icon--Hide2 hide-icon" aria-hidden="true" onClick={() => setHideCommentPanel(true)}><span>Hide</span></i>
                      <i aria-hidden="true" className="close icon" onClick={cancel}></i>
                    </span>
                  </h3></Modal.Header>
                  <Grid columns={1}>
                    <Grid.Row>
                      <Grid.Column>
                        <Form.Field>
                          <label>File name</label>
                          <div className="select-version-box">
                            <label>House map - </label>
                            <Select className="small" options={versionOptions} selection clearable/>
                          </div>
                          {/* <p className="form_desc">{props?.filesData?.fileTitle}</p> */}
                        </Form.Field>
                      </Grid.Column>
                    </Grid.Row>
                  </Grid>

                  <Grid columns={2}>
                    <Grid.Row>
                      <Grid.Column>
                        <Form.Field>
                          <label>File type</label>
                          <p className="form_desc">{props?.filesData?.fileType}</p>
                        </Form.Field>
                      </Grid.Column>
                      <Grid.Column>
                        <Form.Field>
                          <label>Phase</label>
                          <p className="form_desc">{props?.filesData?.phaseName}</p>
                        </Form.Field>
                      </Grid.Column>
                    </Grid.Row>
                  </Grid>

                  <Grid columns={2}>
                    <Grid.Row>
                      <Grid.Column>
                        <Form.Field>
                          <label>Uploaded on</label>
                          <p className="form_desc">20 Oct, 2020</p>
                        </Form.Field>
                      </Grid.Column>
                      <Grid.Column>
                        <Form.Field>
                          <label>Uploaded by</label>
                          <p className="form_desc">John Smith</p>
                        </Form.Field>
                      </Grid.Column>
                    </Grid.Row>
                  </Grid>

                 {/*  <Grid columns={1} className={expandVersion ? "file-versioning-box expand" : "file-versioning-box"}>
                    <Grid.Row>
                      <Grid.Column>
                        <Form.Field>
                          <label>File versions(1) <i className="ms-Icon ms-Icon--ChevronDown right_float" aria-hidden="true" onClick={() => onClickFileVersion()}></i></label>
                          <div className="file-version-list">
                            <div className="version-wise-files">
                              <span>Version 1 -</span>
                              <h3>{props?.filesData?.fileTitle}
                                <span>By: John Smith - Uploaded on: 20 Sep, 2020</span>
                              </h3>
                            </div>
                            <i className="ms-Icon ms-Icon--RedEye right_float" aria-hidden="true"></i>
                            <i className="ms-Icon ms-Icon--Delete" aria-hidden="true"></i>
                          </div> */}
                          {/* <div className="file-version-list">
                            <div className="version-wise-files">
                              <span>Version 1 -</span>
                              <h3>2302101_version_03647.pptx
                                <span>By: John Smith - Uploaded on: 20 Sep, 2020</span>
                              </h3>
                            </div>
                            <i className="ms-Icon ms-Icon--RedEye right_float" aria-hidden="true"></i>
                            <i className="ms-Icon ms-Icon--Delete" aria-hidden="true"></i>

                          </div>
                        </Form.Field>
                      </Grid.Column>
                    </Grid.Row>
                  </Grid> */}

                  <Grid columns={1} className={expand ? "completed-task-list expand" : "completed-task-list"}>
                    <Grid.Row>
                      <Grid.Column>
                        <Form.Field>
                          <label>Tasks ({pinCount}) 
                            <span className="task-add-button"><Button size='small' className="icon-border" onClick={cancel}><i className="ms-Icon ms-font-xl ms-Icon--Add"></i> Add New</Button></span> <i className="ms-Icon ms-Icon--ChevronDown right_float" aria-hidden="true" onClick={() => { onClickTaskExpand() }}></i></label>
                          <PinTaskListIndex filesData={props.filesData} cord={cord} pinCount={getPinCount} taskHovered={getTaskHovered} ></PinTaskListIndex>

                          {/* <div className="pin-task-completed-card">
                            <img src={`${MS_SERVICE_URL['ASSETS_CDN_URL'].url}/assets/images/dots.png`} />
                            <div className="pin-task-description-box">
                              <div className="task-full-details">
                                <div className="pin-task-info">
                                  <h3>
                                    <i className="ms-Icon ms-font-xl ms-Icon--Completed"></i>
                                    This is task name here
                                  </h3>
                                  <p>Starts Tomorrow ↦ Due Fri Aug 28th</p>
                                </div>
                                <div className="user-img">
                                  <img src={`${MS_SERVICE_URL['ASSETS_CDN_URL'].url}/assets/images/people_1.png`} />
                                </div>
                              </div>
                              <div className="added-task-listing">
                                <p>Strategic Planning - Paint Work</p>
                                <div className="symbol-group">
                                  <div className="symbol symbol-30">
                                    <span className="">
                                      <Dropdown icon='ellipsis horizontal' pointing="right">
                                        <Dropdown.Menu>
                                          <Dropdown.Item icon='eye' text='View detail' />
                                          <Dropdown.Item icon='pencil' text='Edit' />
                                          <Dropdown.Item icon='check circle outline' text='Mark as complete' />
                                          <Dropdown.Item icon='trash alternate outline' text='Delete' />
                                        </Dropdown.Menu>
                                      </Dropdown>
                                    </span>
                                  </div>
                                </div>
                              </div>
                              <a href="" className="add-new-task-link">+ Add new task</a>
                            </div>
                          </div> */}
                        </Form.Field>
                      </Grid.Column>
                    </Grid.Row>
                  </Grid>

                  <Grid columns={1} className="completed-task-list with-completed-toggle">
                    <Grid.Row>
                      <Grid.Column>
                        <Form.Field>
                          <div className="toggle-label">
                            <label>Show Completed Tasks (1)</label>
                            <Radio toggle />
                          </div>
                          <div className="pin-task-completed-card">
                            <div className="pin-task-description-box">
                              <div className="task-full-details">
                                <div className="pin-task-info">
                                  <h3 className="task-completed">
                                    <i className="ms-Icon ms-font-xl ms-Icon--Completed"></i>
                                    This is task name here
                                  </h3>
                                  <p>Starts Tomorrow ↦ Due Fri Aug 28th</p>
                                </div>
                                <div className="user-img">
                                  <img src={`${MS_SERVICE_URL['ASSETS_CDN_URL'].url}/assets/images/people_1.png`} />
                                </div>
                              </div>
                              <div className="added-task-listing">
                                <p>Strategic Planning - Paint Work</p>
                                <div className="symbol-group">
                                  <div className="symbol symbol-30">
                                    <span className="">
                                      <Dropdown icon='ellipsis horizontal' pointing="right">
                                        <Dropdown.Menu>
                                          <Dropdown.Item icon='eye' text='View detail' />
                                          <Dropdown.Item icon='pencil' text='Edit' />
                                          <Dropdown.Item icon='check circle outline' text='Mark as complete' />
                                          <Dropdown.Item icon='trash alternate outline' text='Delete' />
                                        </Dropdown.Menu>
                                      </Dropdown>
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </Form.Field>
                      </Grid.Column>
                    </Grid.Row>
                  </Grid>

                  <Grid columns={1} className="add-comments">
                    <Grid.Row>
                      <Grid.Column>
                        <Form.Field>
                          {/* <label>Comments (2)</label>
                          <Input placeholder='click to add comment' size='small' className="full-width" type="text" />
                          <div className="comments-action">
                            <Button positive size='small' className="primary full-width">Add Comment</Button>
                          </div> */}
                          <CommentAdd uploadedFileID={props?.filesData?.uploadedFileID} />
                        </Form.Field>
                      </Grid.Column>
                    </Grid.Row>
                  </Grid>

                  <Grid columns={1} className="comments-con">
                    <Grid.Row>
                      <Grid.Column>
                      <CommentList uploadedFileID={props?.filesData?.uploadedFileID} />
                        {/* <div className="comments-section">
                          <div className="comment-user-img">
                            <img src={`${MS_SERVICE_URL['ASSETS_CDN_URL'].url}/assets/images/people_1.png`} />
                          </div>
                          <div className="comment-info">
                            <h3>John Smith <span>20 Aug, 2021</span></h3>
                            <p>I have a query that exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit.</p>
                          </div>
                        </div>
                        <div className="comments-section">
                          <div className="comment-user-img"><img src={`${MS_SERVICE_URL['ASSETS_CDN_URL'].url}/assets/images/people_1.png`} /></div>
                          <div className="comment-info">
                            <h3>John Smith <span>20 Aug, 2021</span></h3>
                            <p>I have a query that exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit.</p>
                          </div>
                        </div> */}
                      </Grid.Column>
                    </Grid.Row>
                  </Grid>
                </Form>
              </div>
            </div>
            <span className="expand-sidebar" onClick={() => setHideCommentPanel(false)}>Comments</span>

          </Form>
        </Modal.Content>
      </Modal>
    </div>
  )
}

export default ViewFileDetail