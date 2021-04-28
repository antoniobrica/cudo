import React from 'react';

import './planning.module.scss';
import { ModalPlanningNew } from '@cudo/shared-components';
import {
  Card,
  Form,
  Grid,
  Dropdown
} from 'semantic-ui-react';

import ModalViewPlanning from '../../../../../shared-components/src/lib/components/modal/viewdetailsplanning'
import { useMilestonesQuery, useMilestoneMutation, useIMileStoneQuery, useMilestoneDeleteMutation } from '../../services/useRequest';
import { GET_MILESTONES, ADD_MILESTONE, GET_MILESTONES_BY_ID, DELETE_MILESTONE, } from '../../graphql/graphql';
import { LoaderPage } from "@cudo/shared-components";
import { ApolloCache, FetchResult, from } from '@apollo/client';
import { MilestoneMutation, IMileStones } from '../../interfaces/task'
import PlanDelete from './delete-task';


// import { ModalViewPlanning } from '@cudo/shared-components';
/* eslint-disable-next-line */
export interface PlanningProps { }

export function Planning(props: PlanningProps) {
  const [open, setOpen] = React.useState(false);
  const [openD, setOpenD] = React.useState(false);
  const [milestoneID, setmilestoneID] = React.useState('');
  const [milestoneIDd, setmilestoneIDd] = React.useState('');
  const [milestoneByID, setmilestoneByID] = React.useState({});
  const { loading, error, data } = useMilestonesQuery(GET_MILESTONES);
  const [addPlan] = useMilestoneMutation(ADD_MILESTONE);
  const [planData, setPlanData] = React.useState();
  const { loading: milLoading, error: MileError, data: MilestoneData } = useIMileStoneQuery(GET_MILESTONES_BY_ID, {
    variables: { milestoneID: milestoneID },
  });
  const [planDelete] = useMilestoneDeleteMutation(DELETE_MILESTONE,{
    variables: { milestoneID: milestoneIDd },
  });

  React.useEffect(()=>{
    if(MilestoneData){
      setmilestoneByID(MilestoneData)
      setOpen(true)
      console.log('MilestoneData', MilestoneData);
    }
  }, [MilestoneData])

  const cancel = () => {
    setOpen(false)
  }

  const viewDetail = (id) => {
    setmilestoneID(id);
  }
  const deletePlan =(data) =>{
    setPlanData(data)
    setmilestoneIDd(data.milestoneID);
    setOpenD(true)
  }
  const getMilestoneData = (data) => {
    console.log('getMilestoneData', data);
    addPlan({
      variables: data,
      update: (
        cache,
        { data: { addPlan } }: FetchResult
      ) => {
        const cacheData = cache.readQuery({ query: GET_MILESTONES }) as IMileStones;
        cache.writeQuery({
          query: GET_MILESTONES,
          data: {
            tasks: [...cacheData.MileStones, addPlan]
          },
        });
      }
    });
  }
  const confirmationDelete = (plan) => {
    setOpenD(false)
    const milestoneID = plan.milestoneID;
    console.log('plan=milestoneID', milestoneID);
    planDelete({
      variables: {
        milestoneID
      },
      update: (
        cache
      ) => {
      const cacheData = cache.readQuery({ query: GET_MILESTONES , variables: { milestoneID }}) as IMileStones;
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
  if (loading) return <LoaderPage />;
  if (data) {
    console.log('milestone-data', data.MileStones);
  }
  return (
    <div>
      <ModalPlanningNew getMilestoneData={getMilestoneData}></ModalPlanningNew>
      { open ?
        <div style={{ marginLeft: 900 }} >
          <ModalViewPlanning
           openPlanningDetail={open} 
           cancel={cancel}
           milestoneDataById={milestoneByID}
           loading={milLoading}
            ></ModalViewPlanning>
        </div>
        : null}
         {openD ?
        <div style={{ marginLeft: 900 }} >
          <PlanDelete openAlertF={openD} confirm={confirmationDelete} planData={planData} cancel={cancel}></PlanDelete>
        </div>
        : null}
      <div className="ui-tabs">
        <h6 className="h5heading planningtop planningbelow">
          Planning
            </h6>
        <hr style={{ borderColor: 'rgba(34,36,38,.1)' }}></hr>
        <h6 className="headingactive">
          Active Milestone{' '}
        </h6>
        <Form style={{ marginTop: '-20px'}}>

          <Grid columns={4}>

            <Grid.Row>
              {data.MileStones.map((plan, i) => {
                return (
                  <Grid.Column>
                    <Card>
                      <div className="ui card">
                        <div className="content">
                          <div className="description">
                            <span className="time">{plan.dueDate}</span>
                            <span className="summary">
                              {' '}
                              <a href="">
                                {' '}
                                <i
                                  className="ms-Icon ms-Icon--Completed mr-10"
                                  aria-hidden="true"
                                ></i>
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
                              {' '}
                              {plan.description}
                            </p>
                          </div>
                          <br /> <br />
                          <div className="data-built">
                            Project/Work type
                            <span className="summary">Electrical Work</span>
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
                                  <Dropdown.Item icon="pencil" text="Edit" />
                                  <Dropdown.Item
                                    onClick={() => deletePlan(plan)}
                                    icon="trash alternate outline"
                                    text="Delete"
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
              {/* <Grid.Column>
                    <Card>
                      <div className="ui card">
                        <div className="content">
                          <div className="description">
                            <span className="time">Aug 20, Wednesday</span>
                            <span className="summary">
                              {' '}
                              <a href="">
                                {' '}
                                <i
                                  className="ms-Icon ms-Icon--Completed mr-10"
                                  aria-hidden="true"
                                ></i>
                              </a>
                            </span>
                          </div>
                          <div className="header font-header">Checkpoints</div>
                          <div className="description">
                            John & co. +2 others responsible
                          </div>
                        </div>

                        <div className="content">
                          <div className="data-built">
                            <p>
                              {' '}
                              This is description will be show sunt in culpa qui
                              officia deserunt mollit anim id est laborum...
                            </p>
                          </div>
                          <br /> <br />
                          <div className="data-built">
                            Project/Work type
                            <span className="summary">Electrical Work</span>
                          </div>
                          <div className="data-built">
                            Phase
                            <span className="summary">Prelimary Studies</span>
                          </div>
                          <br />
                          <div className="description">
                            <span className="daysarea">20 days away </span>
                            <span className="summary mr-2">
                              <Dropdown text="...">
                                <Dropdown.Menu>
                                  <Dropdown.Item
                                    icon="eye"
                                    text="View detail"
                                  />
                                  <Dropdown.Item icon="pencil" text="Edit" />
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
                    </Card>
                  </Grid.Column>
                  <Grid.Column>
                    <Card>
                      <div className="ui card">
                        <div className="content">
                          <div className="description">
                            <span className="time2">Aug 1, Saturday</span>
                            <span className="summary">
                              {' '}
                              <a href="">
                                {' '}
                                <i
                                  className="ms-Icon ms-Icon--Completed mr-10"
                                  aria-hidden="true"
                                ></i>
                              </a>
                            </span>
                          </div>
                          <div className="header font-header">Checkpoints</div>
                          <div className="description">
                            John & co. +2 others responsible
                          </div>
                        </div>

                        <div className="content">
                          <div className="data-built">
                            <p>
                              {' '}
                              This is description will be show sunt in culpa qui
                              officia deserunt mollit anim id est laborum...
                            </p>
                          </div>
                          <br /> <br />
                          <div className="data-built">
                            Project/Work type
                            <span className="summary">Electrical Work</span>
                          </div>
                          <div className="data-built">
                            Phase
                            <span className="summary">Prelimary Studies</span>
                          </div>
                          <br />
                          <div className="description">
                            <span className="daysarea2">3 days away </span>
                            <span className="summary mr-2">
                              <Dropdown text="...">
                                <Dropdown.Menu>
                                  <Dropdown.Item
                                    icon="eye"
                                    text="View detail"
                                  />
                                  <Dropdown.Item icon="pencil" text="Edit" />
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
                    </Card>
                  </Grid.Column> */}

            </Grid.Row>

          </Grid>

        </Form>
      </div>

    </div>
  );
}

export default Planning;
