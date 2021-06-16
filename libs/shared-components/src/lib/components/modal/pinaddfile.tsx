
import React from 'react';
import { Button, Modal, Grid, Image, Segment, Form, Input, TextArea, Select, Checkbox, Dropdown } from 'semantic-ui-react';
// import SampleModal from './sample-modal';
import img2 from 'libs/shared-components/src/people_1.png';

import img3 from 'libs/shared-components/src/check_grey.png';
import img4 from 'libs/shared-components/src/dots.png';
import img6 from 'libs/shared-components/src/dotss.png';
import img7 from 'libs/shared-components/src/Image 3.png';
import img from 'libs/shared-components/src/assets/images/grey_pin.png'
import Canvas from './canvas';
import { useHistory } from 'react-router';
import axios from 'axios';
import { CreateFileTaskIndex } from '@cudo/mf-task-lib'
import { MS_SERVICE_URL } from '@cudo/mf-core';
// import PinMaskTask from './pinmasktask';


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
  { key: 'af', value: 'af', text: 'Sachin' },
  { key: 'ax', value: 'ax', text: 'Aland' },

]
export interface AddPinProps {
  isOpen?,
  filesData?,
  dowloadFilesData?,
  onSuccess?,
  savePins?

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
  const history = useHistory();
  const res = history.location.pathname.split("/");
  const referenceID = res[3]?.toString();

  const getPinQuery = `query TasksByTasktypes(
   $referenceID: String!,
  $fileID: String!
    ) {
    tasksByTasktypes(
    referenceFilter:{referenceID: $referenceID ,referenceType:PROJECTTYPE} 
    taskTypeFilter:{fileID: $fileID,taskType:PIN})
    { 
    taskTitle 
    fileID 
    fileName
    taskID 
    taskType
    taskTypeID
    taskType 
    status
    startDate
    endDate
    description
    estimatedDays
    BKPID
    BKPTitle
    phaseID
    phaseName
    
    } 
   }`;
  console.log("referenceID", referenceID)
  // console.log("referenceID", props.filesData.uploadedFileID)
  const getPins = async () => {
    return axios.post(
      MS_SERVICE_URL['ms_task'].url,
      {
        query: getPinQuery,
        variables: {
          fileID: props.filesData?.uploadedFileID,
          referenceID: referenceID
        }
      }
    ).then(res => {
      //setisRedraw(true)
      console.log('get_pin_tasks', res.data.data);
      setPinTasks(res.data.data.tasksByTasktypes)

    })
      .catch(err => console.log(err))
  }

  React.useEffect(() => {
    console.log("New Pin created ", isPinCreated);
    setAllowToCreateNewPin(false);
  }, [isPinCreated])

  React.useEffect(() => {
    getPins();
  }, [])

  //  const onCreateTaskSuccess=()=>{

  //  }
  const phaseOptions = [
    { key: 'Phase_1', value: 'Preliminary', text: 'Preliminary' },
    { key: 'Phase_2', value: 'Project Planning', text: 'Project Planning' },
    { key: 'Phase_3', value: 'Tender', text: 'Tender' },
    { key: 'Phase_4', value: 'Realization', text: 'Realization' },

  ]
  const bkpOptions = [
    { key: 'BKP_1', value: '30 - Baugrund', text: '30 - Baugrund' },
    { key: 'BKP_2', value: '31 - Grundwasser', text: '31 - GrundwasserBKP 2' },
  ]
  const workTypes = [
    { key: 'w1', value: 'w1', text: 'Electrical Work' },
    { key: 'w2', value: 'w2', text: 'HVAC work' },
    { key: 'w3', value: 'w3', text: 'Pipelines work' },
    { key: 'w4', value: 'w4', text: 'Plumbing Work' },
  ]

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

    setCord(data)
  }
  const onSuccess = async () => {
    console.log('onSuccess');
    await getPins();
    setAllowToCreateNewPin(false);
    props.savePins(cord)
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

      {/* <Button size='mini' className="grey-btn" onClick={openM}>
          Pin File
        </Button> */}

      <Modal
        size={'fullscreen'}
        onClose={close}
        onOpen={openM}
        open={open}
        style={{ marginLeft: '35px' }}
      >
        <Modal.Header>{props.filesData?.fileTitle}
          <div style={{ textAlign: 'center', marginBottom: '-30px' }}>
            <img src="/assets/images/icons_top.png" style={{ position: 'relative', top: '-17px' }} />

            <a onClick={close}><img src="assets/images/cross_grey.png" style={{ position: 'relative', top: '-17px', left: '540px' }} /></a>
          </div>
        </Modal.Header>
        <Modal.Content style={{ marginTop: '-1px' }}>
          <Form>
            <Grid stackable columns={2}>
              <Grid.Column className="colorback" style={{ width: '65%' }}>
                <Segment>
                  <Canvas imgUrl={imgUrl} coardinates={getCoardinates} fileId={fileId} allowToCreateNewPin={allowToCreateNewPin} isPinCreated={isPinCreated} setIsPinCreated={setIsPinCreated}></Canvas>
                </Segment>

              </Grid.Column>
              <Grid.Column style={{ width: '35%', marginLeft: '-9px', marginTop: '-10px' }}>
                <div style={{ background: '#F1F5F8', padding: '10px', marginBottom: '-18px' }}>
                  {/* <Grid.Column style={{ width: '30%', marginLeft: '-9px', marginTop: '-10px' }}> */}

                  <div>
                    {!isPinCreated ?
                      <div style={{ background: '#F1F5F8', padding: '10px', marginBottom: '-18px' }}>
                        <Form.Field classname="buttonbluedown">
                          <label> </label>
                          <button className="ui mini button pinbutton" onClick={changePinTask}>Click to add pin-mark task</button>
                          <img src={img} className="pinadd" />
                        </Form.Field>
                      </div>
                      :
                      <CreateFileTaskIndex close={taskClose} onSuccess={onSuccess} cord={cord} fileData={fileData}></CreateFileTaskIndex>
                    }
                    <Form.Field style={{ marginTop: '20px' }} >
                      <div className="card1 card-custom gutter-b" style={{ paddingTop: '12px' }}>
                        {pinTasks && pinTasks.map((task, i) => {
                          return (
                            <div key={i}>
                              <div className="card-body d-flex align-items-center justify-content-between flex-wrap py-3">
                                <div className="d-flex align-items-center  py-2">
                                  <span>

                                    <img src={img4} style={{ marginRight: '6px !important;' }} />
                                  </span>

                                  <span>

                                    <img src={img3} className=" mr-10 " />
                                  </span>
                                  <span className="font-weight-bold mb-0 mr-10  ">
                                    {task.taskTitle}
                                  </span>
                                </div>

                                <div className="symbol-group symbol-hover py-2 text-right">
                                  <div className="symbol symbol-30">
                                    <img src={img2} />
                                  </div>
                                </div>
                              </div>
                              <div className="card-body d-flex align-items-center justify-content-between flex-wrap py-3">
                                <div className="d-flex align-items-center  py-2">
                                  <span className="  mr-10 "> </span>

                                  <span className=" mr-2 mr-10 "> </span>
                                  <span
                                    style={{ color: '#718898', fontSize: '11px;', fontWeight: 'normal', marginTop: '-12px' }}
                                    className="font-weight-bold mb-0 mr-10 fontcad "
                                  >
                                    ( {new Date(task?.startDate).toDateString()} ↦ Due {new Date(task?.endDate).toDateString()})
                                  </span>
                                </div>
                              </div>
                              <div className="card-body d-flex align-items-center justify-content-between flex-wrap py-3">
                                <div className="d-flex align-items-center  py-2" style={{ marginTop: '-9px' }}>
                                  <span className=" mr-2 mr-10 li_area"></span>
                                  <span className=" mr-2 mr-10 li_area">

                                    <i
                                      className="ms-Icon ms-Icon--LocationDot "
                                      aria-hidden="true"
                                      style={{ color: '#D0D8DF', verticalAlign: 'middle' }}
                                    ></i>
                                    Tender
                                  </span>
                                  <span className=" mr-2 mr-10 li_area">

                                    <i
                                      className="ms-Icon ms-Icon--LocationDot "
                                      aria-hidden="true"
                                      style={{ color: '#D0D8DF', verticalAlign: 'middle' }}
                                    ></i>
                                    Paint Work
                                  </span>
                                </div>

                                <div className="symbol-group symbol-hover py-2 text-right" style={{ marginTop: '-9px' }}>
                                  <div className="symbol symbol-30">
                                    <span className="mr-2">
                                      <Dropdown text="..." className="dotlinearea">
                                        <Dropdown.Menu>
                                          <Dropdown.Item
                                            icon="eye"
                                            text="View detail"
                                          />
                                          <Dropdown.Item icon="pencil" text="Edit" />
                                          <Dropdown.Item
                                            icon="check circle outline"
                                            text="Mark as complete"
                                          />
                                          <Dropdown.Item
                                            icon="trash alternate outline"
                                            text="Delete"
                                          />
                                        </Dropdown.Menu>
                                      </Dropdown>
                                    </span>
                                  </div>
                                </div>
                              </div>
                              <div style={{ borderTop: '1px solid #ddd', paddingTop: '12px' }}>
                              </div>


                              {/* <div style={{ borderTop: '1px solid #ddd' }}>
                                <div className="card-body d-flex align-items-center justify-content-between flex-wrap py-3">
                                  <div className="d-flex align-items-center  py-2">
                                    <span>

                                      <img src={img4} className="  mr-10 " />{' '}
                                    </span>

                                    <span>

                                      <img src={img3} className=" mr-2 mr-10 " />{' '}
                                    </span>
                                    <span className="font-weight-bold mb-0 mr-10  ">
                                      This is task name here
                            </span>
                                  </div>

                                  <div className="symbol-group symbol-hover py-2 text-right">
                                    <div className="symbol symbol-30">
                                      <img src={img2} />
                                    </div>
                                  </div>
                                </div>
                                <div className="card-body d-flex align-items-center justify-content-between flex-wrap py-3">
                                  <div className="d-flex align-items-center  py-2">
                                    <span className="  mr-10 "> </span>

                                    <span className=" mr-2 mr-10 "> </span>
                                    <span
                                      style={{ color: '#718898' }}
                                      className="font-weight-bold mb-0 mr-10  "
                                    >
                                      Starts Tomorrow ↦ Due Fri Aug 28th
                            </span>
                                  </div>
                                </div>

                                <div className="card-body d-flex align-items-center justify-content-between flex-wrap py-3">
                                  <div className="d-flex align-items-center  py-2">
                                    <span className=" mr-2 mr-10 li_area"></span>
                                    <span className=" mr-2 mr-10 li_area">

                                      <i
                                        className="ms-Icon ms-Icon--LocationDot "
                                        aria-hidden="true"
                                        style={{ color: '#D0D8DF' }}
                                      ></i>
                              Tender
                            </span>
                                    <span className=" mr-2 mr-10 li_area">

                                      <i
                                        className="ms-Icon ms-Icon--LocationDot "
                                        aria-hidden="true"
                                        style={{ color: '#D0D8DF' }}
                                      ></i>
                              Paint Work
                            </span>
                                  </div>

                                  <div className="symbol-group symbol-hover py-2 text-right">
                                    <div className="symbol symbol-30">

                                      <span className="mr-2">
                                        <Dropdown text="..." className="dotlinearea">
                                          <Dropdown.Menu>
                                            <Dropdown.Item
                                              icon="eye"
                                              text="View detail"
                                            />
                                            <Dropdown.Item icon="pencil" text="Edit" />
                                            <Dropdown.Item
                                              icon="check circle outline"
                                              text="Mark as complete"
                                            />
                                            <Dropdown.Item
                                              icon="trash alternate outline"
                                              text="Delete"
                                            />
                                          </Dropdown.Menu>
                                        </Dropdown>
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div> */}
                            </div>
                          )
                        })}
                      </div>
                    </Form.Field>

                    <Form.Field>
                      <div className="card1 card-custom gutter-b"></div>
                    </Form.Field>
                  </div>
                  {/* <Form.Field>
                      <label>Task Title <span className="danger">*</span></label>
                      <Input placeholder='task title' size='small' className="full-width" type="text" />
                    </Form.Field>
                    <Form.Field>
                      <label>Description </label>
                      <TextArea placeholder='type here...' />
                    </Form.Field>
                    <Form.Field>
                      <label>Assoicate with work type  </label>
                      <Select placeholder='Select' className="small" options={workTypes} />
                    </Form.Field>
                    <Form.Field>
                      <label>Select phase  </label>
                      <Select placeholder='Select' className="small" options={phaseOptions} />
                    </Form.Field>
                    <Form.Field>
                      <label>Select BKP  </label>
                      <Select placeholder='Select' className="small" options={bkpOptions} />
                    </Form.Field>
                    <Form.Field>
                      <label>Assignee <span className="danger">*</span></label>
                      <Select placeholder='Select' className="small" options={countryOptions} />
                    </Form.Field>
                    <Grid columns={2}>
                      <Grid.Row>
                        <Grid.Column>
                          <Form.Field>
                            <label>Followers </label>
                            <Select placeholder='Select' className="small" options={countryOptions} />

                          </Form.Field>
                        </Grid.Column>

                        <Grid.Column>
                          <Form.Field>
                            <div className="event">
                              <div className="label-green label-spacer" style={{ width: '30px', height: '30px', padding: '6px 0px 0px 8px' }}>
                                <span className="white-text">AB</span>
                              </div>
                              <div className="label-purple label-spacer" style={{ width: '30px', height: '30px', padding: '6px 0px 0px 8px' }}>
                                <span className="white-text ">RJ</span>
                              </div>

                            </div>
                          </Form.Field>
                        </Grid.Column>
                      </Grid.Row>
                    </Grid>
                    <Form.Field>
                      <Checkbox label='send notification to assignee/followers for the task' />
                    </Form.Field>
                    <Form.Field>
                      <Grid columns={2}>
                        <Grid.Row>
                          <Grid.Column>
                            <Form.Field>
                              <label>Start Date </label>
                              <Input size='small' className="full-width" type="date" />
                            </Form.Field>
                          </Grid.Column>

                          <Grid.Column>
                            <Form.Field>
                              <label>End Date </label>
                              <Input size='small' className="full-width" type="date" />
                            </Form.Field>
                          </Grid.Column>
                        </Grid.Row>
                      </Grid>
                    </Form.Field>
                    <Form.Field>
                      <label>Estimated Days </label>
                      <Input placeholder='Estimated Days' size='small' className="full-width" type="text" />
                    </Form.Field>
                    <Form.Field>

                      <Button
                        content="Submit"
                        onClick={close}
                        positive
                        size='mini' className="grey-btn"
                      />
                      <Button size='mini' className="icon-border" onClick={close}>
                        X  Cancel
        </Button>

                    </Form.Field> */}
                </div>
                {/* <Form.Field>

                    <div className="card1 card-custom gutter-b" style={{ border: '1px solid #ddd' }}>

                      <div className="card-body d-flex align-items-center justify-content-between flex-wrap py-3">

                        <div className="d-flex align-items-center  py-2">
                          <span> <img src={img4} className="  mr-10 " />  </span>

                          <span>  <img src={img3} className=" mr-2 mr-10 " />   </span>
                          <span className="font-weight-bold mb-0 mr-10  ">This is task name here</span>

                        </div>

                        <div className="symbol-group symbol-hover py-2 text-right">
                          <div className="symbol symbol-30">

                            <img src={img2} />

                          </div>

                        </div>

                      </div>
                      <div className="card-body d-flex align-items-center justify-content-between flex-wrap py-3">
                        <div className="d-flex align-items-center  py-2">
                          <span className="  mr-10 " >    </span>

                          <span className=" mr-2 mr-10 " >   </span>
                          <span style={{ color: '#718898' }} className="font-weight-bold mb-0 mr-10  ">Starts Tomorrow ↦ Due Fri Aug 28th</span>

                        </div>

                      </div>

                      <div className="card-body d-flex align-items-center justify-content-between flex-wrap py-3">

                        <div className="d-flex align-items-center  py-2">
                          <span className=" mr-2 mr-10 li_area"></span>
                          <span className=" mr-2 mr-10 li_area">  <i className="ms-Icon ms-Icon--LocationDot " aria-hidden="true" style={{ color: '#D0D8DF' }}></i>Tender</span>
                          <span className=" mr-2 mr-10 li_area">  <i className="ms-Icon ms-Icon--LocationDot " aria-hidden="true" style={{ color: '#D0D8DF' }}></i>Paint Work</span>
                        </div>

                        <div className="symbol-group symbol-hover py-2 text-right">
                          <div className="symbol symbol-30">

                            <img src={img6} />

                          </div>

                        </div>

                      </div>


                    </div>


                  </Form.Field>
                  <Form.Field>

                    <div className="card1 card-custom gutter-b" style={{ border: '1px solid #ddd' }}>

                      <div className="card-body d-flex align-items-center justify-content-between flex-wrap py-3">

                        <div className="d-flex align-items-center  py-2">
                          <span> <img src={img4} className="  mr-10 " />  </span>

                          <span>  <img src={img3} className=" mr-2 mr-10 " />   </span>
                          <span className="font-weight-bold mb-0 mr-10  ">This is task name here</span>

                        </div>

                        <div className="symbol-group symbol-hover py-2 text-right">
                          <div className="symbol symbol-30">

                            <img src={img2} />

                          </div>

                        </div>

                      </div>
                      <div className="card-body d-flex align-items-center justify-content-between flex-wrap py-3">
                        <div className="d-flex align-items-center  py-2">
                          <span className="  mr-10 " >    </span>

                          <span className=" mr-2 mr-10 " >   </span>
                          <span style={{ color: '#718898' }} className="font-weight-bold mb-0 mr-10  ">Starts Tomorrow ↦ Due Fri Aug 28th</span>

                        </div>

                      </div>

                      <div className="card-body d-flex align-items-center justify-content-between flex-wrap py-3">

                        <div className="d-flex align-items-center  py-2">
                          <span className=" mr-2 mr-10 li_area"></span>
                          <span className=" mr-2 mr-10 li_area">  <i className="ms-Icon ms-Icon--LocationDot " aria-hidden="true" style={{ color: '#D0D8DF' }}></i>Tender</span>
                          <span className=" mr-2 mr-10 li_area">  <i className="ms-Icon ms-Icon--LocationDot " aria-hidden="true" style={{ color: '#D0D8DF' }}></i>Paint Work</span>
                        </div>

                        <div className="symbol-group symbol-hover py-2 text-right">
                          <div className="symbol symbol-30">
                            <img src={img6} />

                          </div>

                        </div>

                      </div>


                    </div>


                  </Form.Field> */}
              </Grid.Column>

            </Grid>
          </Form>
        </Modal.Content>

      </Modal>
    </div >
  )
}

export default AddPinFile