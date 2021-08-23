import React from 'react'
import { Button, Pagination, Modal, Input, Form, Grid, Image, Comment, Dropdown, Select, TextArea } from 'semantic-ui-react'
import Canvas from './canvas';
// import { Document, Page } from 'react-pdf';

import { Document, Page, pdfjs } from "react-pdf";
import { MS_SERVICE_URL } from '@cudo/mf-core';
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
export interface FileDetailsProps {
  open?,
  filesData?,
  dowloadFilesData?,
  fType?
}
export const ViewFileDetail = (props: FileDetailsProps) => {
  // const [state, dispatch] = React.useReducer(exampleReducer, {
  //   open: false,
  //   size: undefined,
  // })
  // const { open, size } = state
  const [open, setOpen] = React.useState(false);
  const [files, setFiles] = React.useState();
  const [imgUrl, setimgUrl] = React.useState('');
  const [numPages, setNumPages] = React.useState(null);
  const [pageNumber, setPageNumber] = React.useState(1);
  const [isPinCreated, setIsPinCreated] = React.useState<boolean>(false);
  function onDocumentLoadSuccess({ numPages }) {
    console.log('numPages', numPages);
    setNumPages(numPages);
  }


  React.useEffect(() => {
    if (props.open) {
      setOpen(props.open)
    }
  }, [props.open]);


  React.useEffect(() => {
    if (props.dowloadFilesData) {
      for (let i = 0; i < props.dowloadFilesData.length; i++) {
        if (props.dowloadFilesData[i].filename == props.filesData.fileTitle) {
          setimgUrl(props.dowloadFilesData[i].url);
        }
      }

    }
  })
  React.useEffect(() => {
    if (props.filesData) {
      console.log('filesData', props.filesData);
      setFiles(props.filesData)
    }
  }, [props.filesData])

  const cancel = () => {
    setOpen(false);
  }
  const openf = () => {
    setOpen(true)
  }
  return (
    <div id="navbar">
      {/* <Button className="grey-btn" onClick={() => dispatch({ type: 'open', size: 'fullscreen' })}>
           view Files
        </Button> */}
      <Modal className="view-pin-detail-popup hide-sidebar"
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
                {/* <Canvas imgUrl={imgUrl} ></Canvas> */}
                {/* <Image src={imgUrl} fluid /> */}
                {props.fType == 'application/pdf' ?
                  <Document
                    file={imgUrl}
                    onLoadSuccess={onDocumentLoadSuccess}
                  >
                    <Page pageNumber={pageNumber} />
                  </Document>
                  :
                  // <Canvas imgUrl={imgUrl} isPinCreated={isPinCreated} setIsPinCreated={setIsPinCreated}></Canvas>
                  <Image src={imgUrl} fluid />
                }
                <div className="file-pagination">File versions
                  <Pagination
                    defaultActivePage={1}
                    firstItem={null}
                    lastItem={null}
                    pointing
                    secondary
                    totalPages={3}
                  />
                </div>
              </div>
            </div>

            

            <div className="right-side-file-information">
              
              <div>
                <Form>
                  <Modal.Header><h3>File detail 
                    <span>
                      <i className="ms-Icon ms-Icon--Hide2 hide-icon" aria-hidden="true"><span>Hide</span></i>
                      <i aria-hidden="true" className="close icon" onClick={cancel}></i>
                    </span>
                    </h3></Modal.Header>
                  <Grid columns={2}>
                    <Grid.Row>
                      <Grid.Column>
                        <Form.Field>
                          <label>File name</label>
                          <p className="form_desc">cost-module</p>
                        </Form.Field>
                      </Grid.Column>
                      <Grid.Column>
                        <Form.Field>
                          <label>File type</label>
                          <p className="form_desc">File type</p>
                        </Form.Field>
                      </Grid.Column>
                    </Grid.Row>
                  </Grid>

                  <Grid columns={2}>
                    <Grid.Row>
                      <Grid.Column>
                        <Form.Field>
                          <label>Phase</label>
                          <p className="form_desc">phase</p>
                        </Form.Field>
                      </Grid.Column>
                      <Grid.Column>
                        <Form.Field>
                          <label>Uploaded on</label>
                          <p className="form_desc">20 Oct, 2020</p>
                        </Form.Field>
                      </Grid.Column>
                    </Grid.Row>
                  </Grid>

                  <Grid columns={1}>
                    <Grid.Row>
                      <Grid.Column>
                        <Form.Field>
                          <label>Uploaded by</label>
                          <p className="form_desc">John Smith</p>
                        </Form.Field>
                      </Grid.Column>
                    </Grid.Row>
                  </Grid>

                  <Grid columns={1} className="file-versioning-box expand">
                    <Grid.Row>
                      <Grid.Column>
                        <Form.Field>
                          <label>File versions(1) <i className="ms-Icon ms-Icon--ChevronDown right_float" aria-hidden="true"></i></label>
                          <div className="file-version-list">
                            <div className="version-wise-files">
                              <span>Version 2 -</span>
                              <h3>2302101_version_03647.pptx
                                <span>By: John Smith - Uploaded on: 20 Sep, 2020</span>
                              </h3>
                            </div>
                            <i className="ms-Icon ms-Icon--RedEye right_float" aria-hidden="true"></i>
                          </div>
                          <div className="file-version-list">
                            <div className="version-wise-files">
                              <span>Version 1 -</span>
                              <h3>2302101_version_03647.pptx
                                <span>By: John Smith - Uploaded on: 20 Sep, 2020</span>
                              </h3>
                            </div>
                            <i className="ms-Icon ms-Icon--RedEye right_float" aria-hidden="true"></i>
                          </div>
                        </Form.Field>
                      </Grid.Column>
                    </Grid.Row>
                  </Grid>

                  <Grid columns={1} className="completed-task-list">
                    <Grid.Row>
                      <Grid.Column>
                        <Form.Field>
                          <label>Tasks (1)</label>
                          <div className="pin-task-completed-card">
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
                          </div>
                        </Form.Field>
                      </Grid.Column>
                    </Grid.Row>
                  </Grid>

                  <Grid columns={1}>
                    <Grid.Row>
                      <Grid.Column>
                        <Form.Field>
                          <label>Comments (2)</label>
                          <Input placeholder='click to add comment' size='small' className="full-width" type="text" />
                        </Form.Field>
                      </Grid.Column>
                    </Grid.Row>
                  </Grid>

                  <Grid columns={1} className="comments-con">
                    <Grid.Row>
                      <Grid.Column>
                        <div className="comments-section">
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
                        </div>
                      </Grid.Column>
                    </Grid.Row>
                  </Grid>
                </Form>
              </div>
            </div>
            <span className="expand-sidebar">Comments</span>
            
          </Form>
        </Modal.Content>
      </Modal>
    </div>
  )
}

export default ViewFileDetail