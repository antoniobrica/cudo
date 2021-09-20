import React from 'react';

import { LazyLoading, ModalPlanningNew } from '@cudo/shared-components';
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
import { SelectSearchableDropdown } from '../../../../../shared-components/src/lib/components/select_dropdown/select_searchable';
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
  // const [milestoneLoading, setMilestoneLoading] = React.useState(false)
  const [openEdit, setOpenEdit] = React.useState(false);
  const [milestoneID, setmilestoneID] = React.useState('');
  const [milestoneIDd, setmilestoneIDd] = React.useState('');
  const [milestoneIDe, setmilestoneIDE] = React.useState('');
  const [updateStaus, setUpdateStatus] = React.useState('');
  const [milestoneStatus, setMilestoneStatus] = React.useState('')
  const [milestoneByID, setmilestoneByID] = React.useState({});
  const { loading, error, data } = useMilestonesQuery(GET_MILESTONES);
  // const [addPlan] = useMilestoneMutation(ADD_MILESTONE);
  const { t } = useTranslation()
  enum Status {
    INPROGRESS = 'INPROGRESS',
    COMPLETED = 'COMPLETED',
  }
  const [addPlan, { loading: addPlanningLoading, error: addPlanningError, data: addPlanningData }] = useMutation(ADD_MILESTONE,
    {
      refetchQueries: [
        { query: GET_MILESTONES }
      ]
    }
  )
  const [planData, setPlanData] = React.useState();
  const { loading: detailPlanningLoading, error: detailPlanningError, data: detailPlanningData } = useIMileStoneQuery(GET_MILESTONES_BY_ID, {
    variables: { milestoneID: milestoneID },
  });
  // const [planDelete] = useMilestoneDeleteMutation(DELETE_MILESTONE, {
  const [planDelete, { loading: deletePlanningLoading, error: deletePlanningError, data: deletePlanningData }] = useMutation(DELETE_MILESTONE, {
    variables: { milestoneID: milestoneIDd },
  });
  const [milestoneUpdate, { loading: updatePlanningLoading, error: updatePlanningError, data: updatePlanningData }] = useMutation(UPDATE_MILESTONE,
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
  //   }
  // }, [MilestoneData])
  // React.useEffect(() => {
  //   if (props.worktypes) {
  //   }
  // }, [props.worktypes])

  const cancel = () => {
    setOpen(false)
    setOpenUpdate(false)
  }
  const closeDeletePopup = () => {
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
      setMilestoneStatus(t("project_tab_menu.mark_complete"));
    }
    setUpdateStatus(data.milestoneID)
    setOpenUpdate(true)
  }

  const confirmation = (data, task) => {
    // setMilestoneLoading(true);

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
      worktypeID: task.worktypeID,
      milestoneTitle: task.milestoneTitle,
      phaseName: task.phaseName,
      dueDate: task.dueDate,
      status: status
    }

    milestoneUpdate({
      variables: updatedMilestone,
      update: (cache) => {
        const cacheData = cache.readQuery({ query: GET_MILESTONES }) as IMileStones;
        cache.writeQuery({
          query: GET_MILESTONES,
          data: {
            tasks: [...cacheData.MileStones, milestoneUpdate]
          },
        });
        // setMilestoneLoading(false);

      }

    });
  };
  const edittPlan = (data) => {
    setPlanData(data)
    setmilestoneIDE(data.milestoneID);
    setOpenEdit(true)
  }

  const getMilestoneData = (data) => {
    // setMilestoneLoading(true);
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
        // setMilestoneLoading(false);

      }
    });


  }

  const confirmationUpdate = (plan) => {
    closeEditPopup()
  }
  const confirmationDelete = (plan) => {
    // setMilestoneLoading(true);

    closeDeletePopup()
    const milestoneID = plan.milestoneID;
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
        // setMilestoneLoading(false);

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
    // setMilestoneLoading(true);

    setOpen(false)
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
        // setMilestoneLoading(false);

      }
    });

  }
  if (loading)
    return (
      <h1>
        {' '}
        <LazyLoading />
      </h1>
    );

  if (error) return (
    <div>
      <ModalPlanningNew worktypes={props.worktypes} getMilestoneData={getMilestoneData}
        addLoading={addPlanningLoading} addData={addPlanningData} listData={data}
      ></ModalPlanningNew>
    </div>
  );

  const openAdd = () => {
    setIsOpen(true)
  }
  const cancelAdd = () => {
    setIsOpen(false)
  }
  const getAddLinkSelect = (selectedValue) => {
    if (selectedValue === 'addLink') {
      setIsOpen(true)
    }
  }

  const getSearchSelect = (selectedValue) => {
    if (selectedValue === 'addLink') {
      setIsOpen(true)
    }
  }

  return (
    <div>
      {/* {
        milestoneLoading && <LoaderPage />
      } */}
      {openNew &&
        <ModalPlanningNew worktypes={props.worktypes} cancel={cancelAdd} openNew={openNew} getMilestoneData={getMilestoneData}
          addLoading={addPlanningLoading} addData={addPlanningData} listData={data}></ModalPlanningNew>}
      {open ?
        <div style={{ marginLeft: 900 }} >
          <ModalViewPlanning
            openPlanningDetail={open}
            cancel={cancel}
            milestoneDataById={milestoneByID}
            loading={detailPlanningLoading}
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
          <EditMileStonePopup
            worktypes={props.worktypes} openEdit={openEdit} confirm={confirmationUpdate}
            getMilestoneData={editMilestoneData} planData={planData} cancel={closeEditPopup}
            updateLoading={updatePlanningLoading} updateData={updatePlanningData} listData={data}
          ></EditMileStonePopup>
        </div>
        : null}


      <div className="tabs-main-info-container planning-outer-con">
        {/* <LazyLoading /> */}
        <h3>{t("project_tab_menu.planning.title")}
          <Button size="small" className="primary" onClick={openAdd}>
            <i className="ms-Icon ms-font-xl ms-Icon--Add"></i> {t("common.add_new_button")}
          </Button>
        </h3>

        <div className="active-milestone">
          <h4 className="headingactive">
            {t("project_tab_menu.planning.active_milestone")}
            {/* <SelectDropdown selectedValue={getAddLinkSelect} />

            <SelectSearchableDropdown selectedValue={getSearchSelect} /> */}
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
                            : <img src={`${MS_SERVICE_URL['ASSETS_CDN_URL'].url}/assets/images/green_tick.png`} />
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
