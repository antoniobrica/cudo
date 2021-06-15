import React from 'react';

import '../../../style/index.scss';
import { Segment, Dropdown, Input, Grid, Form } from 'semantic-ui-react';
import img from 'libs/shared-components/src/user.png';
import img2 from 'libs/shared-components/src/user2.png';
import img3 from 'libs/shared-components/src/green_tick.png';
import img4 from 'libs/shared-components/src/dots.png';
import img5 from 'libs/shared-components/src/tasks.png';
import img6 from 'libs/shared-components/src/calendar1.png';
import img7 from 'libs/shared-components/src/plus_icon_grey.png';
/* eslint-disable-next-line */
export interface Tasks {}

export function TaskArea(props: Tasks) {
  const description = [
    <Segment>Pellentesque habitant morbi tristique senectus.</Segment>,
  ];
  return (
    <div className="app-content-body ">
      <div className="card1 card-custom gutter-b">
        <div className="card-body d-flex align-items-center justify-content-between flex-wrap py-3">
          <div className="d-flex align-items-center py-2">
            <span>
              {' '}
              <img src={img4} className="  mr-10 " />{' '}
            </span>
            <span className="textt">T-001</span>
            <span className="anchor_complete">
              <a title="Mark as complete">
               
                <span className="material-icons mr-2 mr-10 check-grey">
                  check_circle_outline
                </span>
              </a>
            </span>
            <span className="font-weight-bold mb-0 mr-10">
              This is task name here
            </span>
            <div className="d-flex">
              <div className="navi navi-hover navi-active navi-link-rounded navi-bold d-flex flex-row">
                <div className="navi-item">
                  <a href=" " className="navi-link active">
                    <span className="navi-text">
                      ( Starts Tomorrow ↦ Due Fri Aug 28th )
                    </span>
                  </a>
                </div>

                <div className="navi-item mr-2">
                  <a className="navi-link">
                    <span className="navi-text">
                     
                      <i
                        className="ms-Icon ms-Icon--Attach"
                        aria-hidden="true"
                      ></i>
                      2 files - 
                    </span>
                  </a>
                </div>

                <div className="navi-item">
                  <a href="" className="navi-link">
                    <span className="navi-text">
                    <img src={img6}  style={{verticalAlign:'middle'}}/>
                     &nbsp; 5 days -
                    </span>
                  </a>
                </div>
                <div className="navi-item">
                  <a href="" className="navi-link">
                    <span className="navi-text">&nbsp;Preliminary Studies - </span>
                  </a>
                </div>
                <div className="navi-item">
                  <a href="" className="navi-link">
                    <span className="navi-text">&nbsp;HVAC Work </span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="symbol-group symbol-hover py-2">
            <div className="symbol symbol-30">
              <img src={img} />
              <span className="mr-2">
                <Dropdown text="...">
                  <Dropdown.Menu>
                    <Dropdown.Item icon="eye" text="View detail" />
                    <Dropdown.Item icon="pencil" text="Edit" />
                    <Dropdown.Item icon="check circle outline" text="Re-open" />
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
      </div>

      <div className="card1 card-custom gutter-b">
        <div className="card-body d-flex align-items-center justify-content-between flex-wrap py-3">
          <div className="d-flex align-items-center   py-2">
            <span>
              {' '}
              <img src={img4} className="  mr-10 " />{' '}
            </span>
            <span className="textt">T-002</span>
            <span>
              <a href=" " title="Mark as complete">
                {' '}
                <span className="material-icons mr-2 mr-10 check-grey">
                  check_circle_outline
                </span>{' '}
              </a>{' '}
            </span>
            <span className="font-weight-bold mb-0 mr-10">
              This is task name here
            </span>
            <div className="d-flex">
              <div className="navi navi-hover navi-active navi-link-rounded navi-bold d-flex flex-row">
                <div className="navi-item">
                  <a href=" " className="navi-link active">
                    <span className="navi-text">
                      ( Starts Tomorrow ↦ Due Fri Aug 28th )
                    </span>
                  </a>
                </div>

                <div className="navi-item">
                  <a className="navi-link">
                    <span className="navi-text">&nbsp;Project Planning - </span>
                  </a>
                </div>

                <div className="navi-item">
                  <a href="" className="navi-link">
                    <span className="navi-text">&nbsp;HVAC Work </span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="symbol-group symbol-hover py-2">
            <div className="symbol symbol-30">
              <span className="btn btn-default btn-icon btn-sm mr-2 mr-top">
                <i className="ms-Icon ms-Icon--Pinned" aria-hidden="true"></i>
              </span>
              <img src={img2} />
              <span className="mr-2">
                <Dropdown text="...">
                  <Dropdown.Menu className="dropdowncomplete">
                    <Dropdown.Item icon="eye" text="View detail" />
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
      </div>

      <div className="card1 card-custom gutter-b cardboxarea">
        <div className="card-body d-flex align-items-center justify-content-between flex-wrap py-3">
          <div className="d-flex align-items-center   py-2">
            <span>
              
              <img src={img4} className="  mr-10 " /> 
            </span>
            <span className="textt">T-003</span>
            <span>
              
              <a href=" " title="Mark as complete">
               
                <span className="material-icons mr-2 mr-10 check-grey">
                  check_circle_outline
                </span>
              </a>
            </span>
            <span className="font-weight-bold mb-0 mr-10">
              This is task name here
            </span>
            <div className="d-flex">
              <div className="navi navi-hover navi-active navi-link-rounded navi-bold d-flex flex-row">
                <div className="navi-item">
                  <a href=" " className="navi-link active">
                    <span className="navi-text">
                      ( Starts Tomorrow ↦ Due Fri Aug 28th )
                    </span>
                  </a>
                </div>

                <div className="navi-item">
                  <a className="navi-link">
                    <span className="navi-text">&nbsp;Tender - </span>
                  </a>
                </div>

                <div className="navi-item">
                  <a href="" className="navi-link">
                    <span className="navi-text">&nbsp;Paint Work </span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="symbol-group symbol-hover py-2">
            <div className="symbol symbol-30">
              <span className="btn btn-default btn-icon btn-sm mr-2 mr-top">
                <img src={img5} />
              </span>
              <img src={img2} />
              <span className="mr-2">
                <Dropdown text="...">
                  <Dropdown.Menu>
                    <Dropdown.Item icon="eye" text="View detail" />
                    <Dropdown.Item icon="pencil" text="Edit" />
                    <Dropdown.Item icon="check circle outline" text="Re-open" />
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
      </div>

      <div className="card1 card-custom gutter-b card-complete">
        <div className="card-body d-flex align-items-center justify-content-between flex-wrap py-3">
          <div className="d-flex align-items-center  py-2">
            <span>
          
              <img src={img4} className="  mr-10 " />
            </span>
            <span className="textt">T-004</span>
            <span>
            
              <img src={img3} className=" mr-2 mr-10 " />
            </span>
            <span className="font-weight-bold mb-0 mr-10 line-through">
              This is task name here
            </span>
            <div className="d-flex">
              <div className="navi navi-hover navi-active navi-link-rounded navi-bold d-flex flex-row">
                <div className="navi-item">
                  <a className="navi-link">
                    <span className="navi-text">
                   
                      <i
                        className="ms-Icon ms-Icon--Attach"
                        aria-hidden="true"
                      ></i>
                      2 files - 
                    </span>
                  </a>
                </div>

                <div className="navi-item">
                  <a href="" className="navi-link">
                    <span className="navi-text">
                    <img src={img6}  style={{verticalAlign:'middle'}}/>
                     &nbsp; 5 days -
                    </span>
                  </a>
                </div>

                <div className="navi-item">
                  <a className="navi-link">
                    <span className="navi-text">&nbsp;Tender - </span>
                  </a>
                </div>

                <div className="navi-item">
                  <a href="" className="navi-link">
                    <span className="navi-text">&nbsp;Paint Work </span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="symbol-group symbol-hover py-2">
            <div className="symbol symbol-30">
              <img src={img2} />
              <span className="mr-2">
                <Dropdown text="...">
                  <Dropdown.Menu>
                    <Dropdown.Item icon="eye" text="View detail" />
                    <Dropdown.Item icon="pencil" text="Edit" />
                    <Dropdown.Item icon="check circle outline" text="Re-open" />
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
      </div>

      <div className="card1 card-custom gutter-b">
        <div className="card-body d-flex align-items-center justify-content-between flex-wrap py-3">
        <div className="  align-items-center" style={{marginLeft: '-17px'}}>
            <span className="anchor_complete">
              <a title="Mark as complete">
             
                <span className="material-icons mr-2 mr-10 check-grey">
                  check_circle_outline
                </span> 
              </a> 
            </span>
            <span className="font-weight-bold mb-0 mr-10">
              1. This is the checklist point text here
            </span>
            </div>
          </div>
          </div>
        
          <div className="card1 card-custom gutter-b">
        <div className="card-body d-flex align-items-center justify-content-between flex-wrap py-3">
        <div className="  align-items-center" style={{marginLeft: '-17px', marginBottom: '-23px'}}>
            <span className="anchor_complete">
              <a title="Mark as complete">
             
                <span className="material-icons mr-2 mr-10 check-grey">
                  check_circle_outline
                </span> 
              </a> 
            </span>
            <span className="font-weight-bold mb-0 mr-10">
            <Grid columns={2} className="classtop" style={{position: 'relative',
    top: '5px'}}>
              <Grid.Row>
                <Grid.Column>
                  <Form.Field className="fillarea">
                    <Input 
                      placeholder="Enter your text here...."
                      size="small"
                      className="full-width areawidth"
                      type="text"
                    />
                  </Form.Field>
                </Grid.Column>

                <Grid.Column>
                  <Form.Field className="m-400" >
                    <button className="greenbutton">
                      <i
                        className="ms-Icon ms-Icon--CheckMark"
                        aria-hidden="true"
                      ></i> 
                    </button>
                    &nbsp; 
                    <button className="redbutton">
                      <i
                        className="ms-Icon ms-Icon--ChromeClose"
                        aria-hidden="true"
                      ></i> 
                    </button>
                  </Form.Field>
                </Grid.Column>
              </Grid.Row>
            </Grid>
            </span>
            </div>
            <div>
            <span> <img src={img7}  style={{verticalAlign:'middle'}}/></span>  Add New
            </div>
          </div>
          </div>


      <button className="ui large button btn-dashed  btn-large">
        <i className="ms-Icon ms-Icon--AddTo" aria-hidden="true" style={{marginLeft: '-80px',
    verticalAlign: 'middle'}}></i> Add new
        task{' '}
      </button>
    </div>
  );
}

export default TaskArea;
