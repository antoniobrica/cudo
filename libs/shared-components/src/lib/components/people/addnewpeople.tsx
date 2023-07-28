
import { MS_SERVICE_URL } from '@cudo/mf-core';
import React from 'react';
import { Button, Accordion, Modal, Tab, Table, Input, Form, Grid, Image, Select, TextArea } from 'semantic-ui-react';
// import SampleModal from './sample-modal';


// import img from 'libs/shared-components/src/No2.png';


function AddNewPeople() {
  const [secondOpen, setSecondOpen] = React.useState(false)
  const countryOptions = [
    { key: 'af', value: 'af', text: 'Afghanistan' },
    { key: 'ax', value: 'ax', text: 'Aland Islands' },

  ]
  const level1Panels = [
    { key: 'panel-1a', title: 'Task', content: 'Create & edit tasks' },

  ]

  const Level1Content = (
    <div>

      <Accordion.Accordion panels={level1Panels} />
    </div>
  )

  const level2Panels = [
    { key: 'panel-2a', title: 'Level 2A', content: 'Level 2A Contents' },
    { key: 'panel-2b', title: 'Level 2B', content: 'Level 2B Contents' },
  ]

  const Level2Content = (
    <div>

      <Accordion.Accordion panels={level2Panels} />
    </div>
  )

  const rootPanels = [
    { key: 'panel-1', title: 'Electrical Work', content: { content: Level1Content }, },
    { key: 'panel-2', title: 'HVAC Work', content: { content: Level2Content } },
  ]

  const [open, setOpen] = React.useState(false)
  const panes = [
    {
      menuItem: { key: 'user plus', icon: 'user plus', content: 'Select people' },

      render: () => <Tab.Pane attached={false}>
        {/* <SampleModal/> */}
        <div>

        </div>
        <Form>
          <Grid columns={1}>
            <Grid.Row>
              <Grid.Column>
                <Form.Field>
                  <Input placeholder='Search existing people....' size='small' className="full-width" type="text" />
                </Form.Field>
              </Grid.Column>

            </Grid.Row>
          </Grid>

          <Grid columns={1}>
            <Grid.Row>
              <Grid.Column>
                <Form.Field>
                  <label>Select people to add</label><br />
                  <input type="checkbox" id="vehicle1"></input> <img src={`${MS_SERVICE_URL['ASSETS_CDN_URL'].url}/assets/images/No2.png`} className="  mr-10 " /><label className="modallablearea"> Gleb Kuznetsov</label>

                </Form.Field>
              </Grid.Column>

            </Grid.Row>
          </Grid>
          <Grid columns={1}>
            <Grid.Row>
              <Grid.Column>
                <Form.Field>
                  <input type="checkbox" id="vehicle1"></input> <img src={`${MS_SERVICE_URL['ASSETS_CDN_URL'].url}/assets/images/No2.png`} className="  mr-10 " /><label className="modallablearea"> Gleb Kuznetsov</label>

                </Form.Field>
              </Grid.Column>

            </Grid.Row>
          </Grid>
          <Grid.Row>
            <Grid.Column>
              <div className="content">

                <p className="paragraph center"> <i aria-hidden="true" className="envelope outline icon"></i> Can't find who you are looking for? <a href="" className="anchor">Click here to invite a new user </a> </p>
              </div>
            </Grid.Column>

          </Grid.Row>
        </Form>


      </Tab.Pane>,
    },
    {
      menuItem: { key: 'users', icon: 'users', content: 'Manage access' },

      render: () => <Tab.Pane attached={false}>



        <Form>

          <Grid columns={2}>
            <Grid.Row className="backcontent">
              <Grid.Column>
                <Form.Field>
                  <label>Add people to this project? </label>

                </Form.Field>
              </Grid.Column>
              <Grid.Column>
                <Form.Field>
                  <Select clearable placeholder='Select' className="small" options={countryOptions} />

                </Form.Field>
              </Grid.Column>

            </Grid.Row>
          </Grid>
          <Grid columns={1}>

            <Grid.Row>

              <Grid.Column >
                <Form.Field>
                  <Input placeholder='Search' size='small' className="full-width" type="text" />
                </Form.Field>
              </Grid.Column>
            </Grid.Row>



          </Grid>
          <Grid columns={1}>
            <Grid.Row>

              <Grid.Column >
                <Accordion defaultActiveIndex={0} panels={rootPanels} styled />
              </Grid.Column>

            </Grid.Row>
          </Grid>
        </Form>


      </Tab.Pane>
    }

  ]



  return (
    <div id="navbar">
      <Modal className="modal_media modal_center"
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        trigger={<Button size='mini' className="grey-btn">+ Add People</Button>}
        closeOnDimmerClick={false}
      >
        <Modal.Header><h3>Add People </h3></Modal.Header>
        <Modal.Content body>

          <div>
            <Tab menu={{ secondary: true, pointing: true }} panes={panes} />


            <Modal.Description>

            </Modal.Description>

          </div>


        </Modal.Content>
        <Modal.Actions>

          <div>
            <Button size='small' className="icon-border" onClick={() => setOpen(false)}>
              X  Cancel
            </Button>
            <Button
              content="Submit"
              onClick={() => setOpen(false)}
              positive
              size='small' className="primary"
            />

          </div>

        </Modal.Actions>






      </Modal>
    </div>

  )
}

export default AddNewPeople
