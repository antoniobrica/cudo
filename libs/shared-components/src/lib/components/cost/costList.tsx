import React from 'react';

import './../../../assets/style/index.scss'
import { Tab, Image, Input, Accordion, Form, Grid, Card, Dropdown } from 'semantic-ui-react';


/* eslint-disable-next-line */
export interface CostListProps { }


export function CostList(props: CostListProps) {
  const rootPanels = [
    { key: 'panel-1', title: 'Jack W. Elementary School', content: { content: <a href=''>+ Add item</a> }, },
    { key: 'panel-2', title: 'Freehold Two Solar LLC', content: { content: <a href=''>+ Add item</a> } },
  ]
  return (
    <div className="app-content-body-dash navbar-collapse box-shadow" style={{
      marginLeft: '-14px',
      marginTop: '-30px'
    }}>

      <div className="ui-tabs">
        <h6 style={{ fontWeight: 'normal' }} className="h5heading">
          Cost managment
        </h6>
        <span className="sessiontext" style={{ display: 'flex' }}>Please manage the cost for Electrical Work

          <div className="symbol-group symbol-hover py-2 marginestimate">
            <div className="symbol symbol-30">
              <span className="mr-2" style={{ background: '#fff', padding: '3px', paddingBottom: '6px;' }} >
                <Dropdown text='...'>
                  <Dropdown.Menu>
                    <Dropdown.Item icon='print' text='Print' />
                    <Dropdown.Item icon='down' text='Download' />
                  </Dropdown.Menu>
                </Dropdown>
              </span>
            </div>

          </div>
        </span>

        <Form>
          <Grid columns={3} className="pinkbackground">
            <Grid.Row>
              <Grid.Column>
                <Form.Field className="fillarea" style={{ display: 'flex' }}>
                  <img src='/assets/images/money.png'></img>  <label style={{ marginLeft: '10px' }}>Estimated Cost</label>
                </Form.Field>
              </Grid.Column>
              <Grid.Column>
                <Form.Field className="fillarea">

                  <Input placeholder='Enter your text here....' size='small' className="full-width " type="text" />
                </Form.Field>
              </Grid.Column>

              <Grid.Column style={{ marginTop: '5px' }}>
                <Form.Field style={{ marginleft: '145px' }}>
                  <button className="greenbutton"><i className="ms-Icon ms-Icon--CheckMark" aria-hidden="true"></i> </button>
                  &nbsp;  <button className="redbutton"><i className="ms-Icon ms-Icon--ChromeClose" aria-hidden="true"></i> </button>
                </Form.Field>
              </Grid.Column>
            </Grid.Row>
          </Grid>

        </Form>


      </div>
      <div>
        <br />
        <h6 style={{ fontWeight: 'normal' }} className="h5heading">
          Items
        </h6>
        <div className="ui card " style={{ width: '80%' }}>
          <Accordion className="widtharea" defaultActiveIndex={0} panels={rootPanels} styled  >
          </Accordion>
        </div>
      </div>

    </div>
  );
}

export default CostList;
