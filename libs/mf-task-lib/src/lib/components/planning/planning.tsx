import React from 'react';

import { ModalPlanningNew } from '@cudo/shared-components';
import {
  Card,
  Form,
  Grid,
  Dropdown,
  Button
} from 'semantic-ui-react';
import EditMileStonePopup from 'libs/shared-components/src/lib/components/modal/editmilestone';
import ModalViewPlanning from '../../../../../shared-components/src/lib/components/modal/viewdetailsplanning';
import SelectDropdown from '../../../../../shared-components/src/lib/components/select_dropdown/select_dropdown';
import { useMilestonesQuery, useMilestoneMutation, useIMileStoneQuery, useMilestoneDeleteMutation, useMilestoneUpdateMutation } from '../../services/useRequest';
import { GET_MILESTONES, ADD_MILESTONE, GET_MILESTONES_BY_ID, DELETE_MILESTONE, UPDATE_MILESTONE } from '../../graphql/graphql';
import { LoaderPage } from "@cudo/shared-components";
import { ModalAlert } from '@cudo/shared-components';

import { ApolloCache, FetchResult, from, useMutation } from '@apollo/client';
import { MilestoneMutation, IMileStones } from '../../interfaces/task'
import PlanDelete from './delete-task';
import moment, { calendarFormat } from 'moment';
import { MS_SERVICE_URL } from '@cudo/mf-core';
import { useTranslation } from 'react-i18next';


export interface PlanningProps {
  worktypes
}

export function Planning(props: PlanningProps) {
  const [open, setOpen] = React.useState(false);
  const [openNew, setIsOpen] = React.useState(false);
  const [openD, setOpenD] = React.useState(false);
  const [openUpdate, setOpenUpdate] = React.useState(false);

  const [openEdit, setOpenEdit] = React.useState(false);
  const [milestoneID, setmilestoneID] = React.useState('');
  const [milestoneIDd, setmilestoneIDd] = React.useState('');
  const [milestoneIDe, setmilestoneIDE] = React.useState('');
  const [updateStaus, setUpdateStatus] = React.useState('');
  const [milestoneStatus, setMilestoneStatus] = React.useState('')
  const [milestoneByID, setmilestoneByID] = React.useState({});
  const { loading, error, data } = useMilestonesQuery(GET_MILESTONES);
  // const [addPlan] = useMilestoneMutation(ADD_MILESTONE);
  const {t} = useTranslation()
  enum Status {
    INPROGRESS = 'INPROGRESS',
    COMPLETED = 'COMPLETED',
  }
  const [addPlan, { data: refreshData }] = useMutation(ADD_MILESTONE,
    {
      refetchQueries: [
        { query: GET_MILESTONES }
      ]
    }
  )
  const [planData, setPlanData] = React.useState();
  const { loading: milLoading, error: MileError, data: MilestoneData } = useIMileStoneQuery(GET_MILESTONES_BY_ID, {
    variables: { milestoneID: milestoneID },
  });
  const [planDelete] = useMilestoneDeleteMutation(DELETE_MILESTONE, {
    variables: { milestoneID: milestoneIDd },
  });
  const [milestoneUpdate, { data: refreshMilestone }] = useMutation(UPDATE_MILESTONE,
    {
      variables: { milestoneID: milestoneIDd },
      refetchQueries: [
        { query: GET_MILESTONES }
      ]
    }
  )
  // const [milestoneUpdate] = useMilestoneUpdateMutation(UPDATE_MILESTONE,{
  //   variables: { milestoneID: milestoneIDd },
  // });

  // React.useEffect(() => {
  //   if (MilestoneData) {
  //     setmilestoneByID(MilestoneData)
  //     setOpen(true)
  //     console.log('MilestoneData', MilestoneData);
  //   }
  // }, [MilestoneData])
  // React.useEffect(() => {
  //   if (props.worktypes) {
  //     console.log('worktypes-planning', props.worktypes);
  //   }
  // }, [props.worktypes])

  const cancel = () => {
    setOpen(false)
    setOpenUpdate(false)
  }
  const closeDeletePopup = () =>{
    setOpenD(false)
  }
  const closeEditPopup = () => {
    setOpenEdit(false)
  }

  const viewDetail = (data) => {
    setmilestoneByID(data)
    setOpen(true)
  }
  const deletePlan = (data) => {
    setPlanData(data)
    setmilestoneIDd(data.milestoneID);
    setOpenD(true)
  }
  const update = (data) => {
    setPlanData(data)
    if (data.status === 'COMPLETED') {
      setMilestoneStatus(t("project_tab_menu.task.re_open"));
    } else {
      setMilestoneStatus(t("project_tab_menu.mark_completed"));
    }
    setUpdateStatus(data.milestoneID)
    setOpenUpdate(true)
  }

  const confirmation = (data, task) => {
    // console.log('data', task);
    setOpenUpdate(false);
    let status;
    if (task.status === 'COMPLETED') {
      status = Status.INPROGRESS;
    } else {
      status = Status.COMPLETED;
    }
    const updatedMilestone = {
      milestoneID: task.milestoneID,
      description: task.description,
      worktypeName: task.worktypeName,
      milestoneTitle: task.milestoneTitle,
      phaseName: task.phaseName,
      dueDate: task.dueDate,
      status: status
    }

    milestoneUpdate({
      variables: updatedMilestone,
      update: (cache) => {
        // console.log('updatedMilestone', updatedMilestone)
        const cacheData = cache.readQuery({ query: GET_MILESTONES }) as IMileStones;
        cache.writeQuery({
          query: GET_MILESTONES,
          data: {
            tasks: [...cacheData.MileStones, milestoneUpdate]
          },
        });
      }

    });
  };
  const edittPlan = (data) => {
    setPlanData(data)
    setmilestoneIDE(data.milestoneID);
    setOpenEdit(true)
  }

  const getMilestoneData = (data) => {
    // console.log('getMilestoneData', data);
    addPlan({
      variables: data,
      update: (
        cache,
        data
      ) => {
        const cacheData = cache.readQuery({ query: GET_MILESTONES }) as IMileStones;
        cache.writeQuery({
          query: GET_MILESTONES,
          data: {
            getMileStones: [...cacheData.MileStones, data['createMileStone']]
          },
        });
      }
    });
  }

  const confirmationUpdate = (plan) => {
    closeEditPopup()
  }
  const confirmationDelete = (plan) => {
    closeDeletePopup()
    const milestoneID = plan.milestoneID;
    // console.log('plan=milestoneID', milestoneID);
    planDelete({
      variables: {
        milestoneID
      },
      update: (
        cache
      ) => {
        const cacheData = cache.readQuery({ query: GET_MILESTONES, variables: { milestoneID } }) as IMileStones;
        const newTask = cacheData.MileStones.filter(item => item.milestoneID !== milestoneID);
        cache.writeQuery({
          query: GET_MILESTONES,
          data: {
            MileStones: newTask
          },
          variables: { milestoneID },
        });
      }

    });
  }

  // const updateMilestone = (task) => {
  //   setTaskData(task)
  //   setOpen(true)
  //   if (task.status === 'COMPLETED') {
  //     settaskStatus('Re-open')
  //   }
  //   else {
  //     settaskStatus('Mark as Complete')
  //   }

  // }
  const editMilestoneData = (data) => {
    // console.log('edited-data', data);
    milestoneUpdate({
      variables: data,
      update: (
        cache,
        { data: { milestoneUpdate } }: FetchResult
      ) => {
        const cacheData = cache.readQuery({ query: GET_MILESTONES }) as IMileStones;
        cache.writeQuery({
          query: GET_MILESTONES,
          data: {
            tasks: [...cacheData.MileStones, milestoneUpdate]
          },
        });
      }
    });

  }
  if (loading) return <LoaderPage />;
  if (error) return (
    <div>
      <ModalPlanningNew worktypes={props.worktypes} getMilestoneData={getMilestoneData}></ModalPlanningNew>
    </div>
  );
  if (data) {
    // console.log('milestone-data', data.MileStones);
  }
  const openAdd = () => {
    setIsOpen(true)
  }
  const cancelAdd = () => {
    setIsOpen(false)
  }
const getAddLinkSelect = (selectedValue)=>{
  console.log('---getAddLinkSelect---selectedValue--', selectedValue)
  if(selectedValue==='addLink'){
    console.log('---if selectedValue--', selectedValue)
    setIsOpen(true)
  } else {
    console.log('---else selectedValue--', selectedValue)
  }
}



  return (
    <div>
      {openNew && <ModalPlanningNew worktypes={props.worktypes} cancel={cancelAdd} openNew={openNew} getMilestoneData={getMilestoneData}></ModalPlanningNew>}
      {open ?
        <div style={{ marginLeft: 900 }} >
          <ModalViewPlanning
            openPlanningDetail={open}
            cancel={cancel}
            milestoneDataById={milestoneByID}
            loading={milLoading}
            edit={edittPlan}
            delete={deletePlan}
          ></ModalViewPlanning>
        </div>
        : null}
      {openUpdate ? (
        <div className="pin_area">
          <ModalAlert
            name='Milestone'
            openAlertF={openUpdate}
            confirm={confirmation}
            taskData={planData}
            taskStatus={milestoneStatus}
            cancel={cancel}
          ></ModalAlert>
        </div>
      ) : null}
      {openD ?
        <div style={{ marginLeft: 900 }} >
          <PlanDelete openAlertF={openD} confirm={confirmationDelete} planData={planData} cancel={closeDeletePopup}></PlanDelete>
        </div>
        : null}
      {openEdit ?
        <div style={{ marginLeft: 900 }} >
          <EditMileStonePopup worktypes={props.worktypes} openEdit={openEdit} confirm={confirmationUpdate} getMilestoneData={editMilestoneData} planData={planData} cancel={closeEditPopup}></EditMileStonePopup>
        </div>
        : null}
      <div className="tabs-main-info-container planning-outer-con">
        <h3>{t("project_tab_menu.planning.title")}
          <Button size="small" className="primary" onClick={openAdd}>
            <i className="ms-Icon ms-font-xl ms-Icon--Add"></i> {t("common.add_new_button")}
          </Button>
        </h3>

        <div className="active-milestone">
          <h4 className="headingactive">
          {t("project_tab_menu.planning.active_milestone")}
          <SelectDropdown selectedValue={getAddLinkSelect}/>          
          </h4>
          <Form>
            {/* <Grid columns={4}>
              <Grid.Row>
                {data.MileStones.map((plan, i) => {
                  return (
                    <Grid.Column>
                      <Card>
                        <div className="ui card ui_width">
                          <div className="content ui_width">
                            <div className="description">
                              <span className="time">{new Date(plan.dueDate).toDateString()}</span>
                              <span className="summary">
                                
                                <a onClick={() => update(plan)}>
                                  
                                  {plan.status == "INPROGRESS" ?
                                    <i
                                      className="ms-Icon ms-Icon--Completed mr-10"
                                      aria-hidden="true"
                                    ></i> : <img src={`${MS_SERVICE_URL['ASSETS_CDN_URL'].url}/assets/images/green_tick.png`} className=" mr-2 mr-10 " />
                                  }

                                </a>
                              </span>
                            </div>
                            <div className="header font-header" style={{ color: '#1B1B40' }}>
                              {plan.milestoneTitle}
                            </div>
                            <div className="description">
                              John & co. +2 others responsible
                            </div>
                          </div>

                          <div className="content">
                            <div className="data-built">
                              <p>
                                
                                {plan.description}
                              </p>
                            </div>
                            <br /> <br />
                            <div className="data-built">
                              Project/Work type
                              <span className="summary">{plan.worktypeName}</span>
                            </div>
                            <div className="data-built">
                              Phase
                              <span className="summary">{plan.phaseName}</span>
                            </div>
                            <br />
                            <div className="description">
                              <span className="daysarea">26 days away </span>
                              <span className="summary mr-2">
                                <Dropdown text="...">
                                  <Dropdown.Menu>
                                    <Dropdown.Item
                                      onClick={() => viewDetail(plan.milestoneID)}
                                      icon="eye"
                                      text="View detail"
                                    />
                                    <Dropdown.Item
                                      onClick={() => edittPlan(plan)}
                                      icon="pencil" text="Edit" />
                                    <Dropdown.Item
                                      onClick={() => deletePlan(plan)}
                                      icon="trash alternate outline"
                                      text="Delete"
                                    />
                                    <Dropdown.Item
                                      onClick={() => update(plan)}
                                      icon="ms-Icon ms-Icon--Completed"
                                      text="update"
                                    />
                                  </Dropdown.Menu>
                                </Dropdown>
                              </span>
                            </div>
                          </div>
                        </div>
                      </Card>
                    </Grid.Column>
                  )
                })}



              </Grid.Row>
            </Grid> */}


            {/* Html for milestone cards */}
            <div className="milestone-lisiting-cards">
              <ul>
                {data.MileStones.map((plan, i) => {
                  return (
                    <li>
                      <div className="date-status">
                        <label>{new Date(plan.dueDate).toDateString()}</label>
                        <a onClick={() => update(plan)}>
                          
                          {plan.status == "INPROGRESS" ?
                            <i className="ms-Icon ms-Icon--Completed" aria-hidden="true"></i>
                            : <img src={`${MS_SERVICE_URL['ASSETS_CDN_URL'].url}/assets/images/green_tick.png`} className=" mr-2 mr-10 " />
                          }

                        </a>
                      </div>

                      <div className="milestone-info">
                        <h3>  {plan.milestoneTitle} <span>John & co. + 2 others responsible</span></h3>
                        <p>{plan.description}</p>
                      </div>

                      <div className="milestone-details">
                        <p>{t("project_tab_menu.task.project_worktype")} <span>{plan.worktypeName}</span></p>
                        <p>{t("common.phase")} <span>{plan.phaseName}</span></p>
                      </div>

                      <div className="how-many-days">
                        <span>26 days away</span>
                        <div className="milestone-action">
                          <div className="symbol symbol-30 d-flex">
                            <span className="dropdown-action">
                              <Dropdown icon='ellipsis horizontal' floating labeled>
                                <Dropdown.Menu className="dropdowncomplete">
                                  <Dropdown.Item
                                    onClick={() => viewDetail(plan)}
                                    icon="eye"
                                    text={t("common.view_details")}
                                  />
                                  <Dropdown.Item
                                    onClick={() => edittPlan(plan)}
                                    icon="pencil" text={t("common.edit")} />
                                  <Dropdown.Item
                                    onClick={() => deletePlan(plan)}
                                    icon="trash alternate outline"
                                    text={t("common.delete")}
                                  />
                                </Dropdown.Menu>
                              </Dropdown>
                            </span>
                          </div>
                        </div>
                      </div>
                    </li>
                  )
                })}
                {/* <li>
                  <div className="date-status">
                    <label>Aug, 26 Wednesday</label>
                    <i className="ms-Icon ms-Icon--Completed" aria-hidden="true"></i>
                  </div>

                  <div className="milestone-info">
                    <h3>High priority things <span>John & co. + 2 others responsible</span></h3>
                    <p>This is description will be show sunt in culpa qui officia deserunt mollit anim id est laborum...</p>
                  </div>

                  <div className="milestone-details">
                    <p>Project/Work type <span>Electrical Work</span></p>
                    <p>Phase <span>Preliminary Studies</span></p>
                  </div>

                  <div className="how-many-days">
                    <span>26 days away</span>
                    <div className="milestone-action">
                        <div className="symbol symbol-30 d-flex">
                          <span className="dropdown-action">
                            <Dropdown icon='ellipsis horizontal' floating labeled>
                              <Dropdown.Menu className="dropdowncomplete">
                                <Dropdown.Item
                                  // onClick={() => viewDetail(plan.milestoneID)}
                                  icon="eye"
                                  text="View detail"
                                />
                                <Dropdown.Item
                                  // onClick={() => edittPlan(plan)}
                                  icon="pencil" text="Edit" />
                                <Dropdown.Item
                                  // onClick={() => deletePlan(plan)}
                                  icon="trash alternate outline"
                                  text="Delete"
                                />
                              </Dropdown.Menu>
                            </Dropdown>
                          </span>
                        </div>
                      </div>
                  </div>
                </li>

                <li>
                  <div className="date-status">
                    <label className="close-date">Aug, 26 Wednesday</label>
                    <i className="ms-Icon ms-Icon--Completed" aria-hidden="true"></i>
                  </div>

                  <div className="milestone-info">
                    <h3>High priority things <span>John & co. + 2 others responsible</span></h3>
                    <p>This is description will be show sunt in culpa qui officia deserunt mollit anim id est laborum...</p>
                  </div>

                  <div className="milestone-details">
                    <p>Project/Work type <span>Electrical Work</span></p>
                    <p>Phase <span>Preliminary Studies</span></p>
                  </div>

                  <div className="how-many-days">
                    <span>26 days away</span>
                    <div className="milestone-action">
                        <div className="symbol symbol-30 d-flex">
                          <span className="dropdown-action">
                            <Dropdown icon='ellipsis horizontal' floating labeled>
                              <Dropdown.Menu className="dropdowncomplete">
                                <Dropdown.Item
                                  // onClick={() => viewDetail(plan.milestoneID)}
                                  icon="eye"
                                  text="View detail"
                                />
                                <Dropdown.Item
                                  // onClick={() => edittPlan(plan)}
                                  icon="pencil" text="Edit" />
                                <Dropdown.Item
                                  // onClick={() => deletePlan(plan)}
                                  icon="trash alternate outline"
                                  text="Delete"
                                />
                              </Dropdown.Menu>
                            </Dropdown>
                          </span>
                        </div>
                      </div>
                  </div>
                </li> */}
              </ul>

              <div className="compltete-phase">
                <a href=""><i className="ms-Icon ms-Icon--Completed" aria-hidden="true"></i> <span>Complete this phase</span></a>
              </div>
            </div>



          </Form>
        </div>
      </div>

    </div>
  );
}

export default Planning;
