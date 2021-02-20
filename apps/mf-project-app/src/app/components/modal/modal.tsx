import { radios } from '@storybook/addon-knobs';
import React from 'react';
import { Button, Header, Modal, Tab, Table, Input, Form, Grid, Select, TextArea } from 'semantic-ui-react';
// import SampleModal from './sample-modal';
import { IProject, IProjects, ProjectMutation, IWorkTypes } from "../../interfaces/project";
import { useProjectMutation, useProjectQuery, useWorkTypesQuery, useCompanyQuery } from '../../services/useRequest';
import { ApolloCache, FetchResult } from '@apollo/client';
import { ADD_PROJECT, GET_CLIENT_COMPANY, GET_PRINTING_COMPANY, GET_PROJECTS, GET_WORKTYPES } from "../../graphql/graphql";
import ModalExamplePrinting from 'libs/shared-components/src/lib/components/modal/addprintingpopup';



function ModalExampleModal() {
  // const { loading, error, data } = useProjectQuery(GET_PROJECTS);


  const clientOption = [
    { key: 'c1', value: 'c1', text: 'Client 1' },
    { key: 'c2', value: 'c2', text: 'Client 2' },
    { key: 'c3', value: 'c3', text: 'Client 3' },
    { key: 'c4', value: 'c4', text: 'Client 4' },


  ]
  const buildingOption = [
    { key: 'b1', value: 'b1', text: 'Building type 1' },
    { key: 'b2', value: 'b2', text: 'Building type 2' },
    { key: 'b3', value: 'b3', text: 'Building type 3' },

  ]
  const printingCompanyOption = [
    
    { key: 'add', value: 'add', text: '+ add new' },
    { key: 'b1', value: 'b1', text: 'Vista Print' },
    { key: 'b2', value: 'b2', text: 'Flawless Copies' },
    { key: 'b3', value: 'b3', text: 'Rappid Copies' },

  ]
  const workTypeOptions = [
    { key: 'w1', value: 'w1', text: 'Electrical work' },
    { key: 'w2', value: 'w2', text: 'HAVC work' },
  ]

  const countryOptions = [
    { key: 'af', value: 'af', text: 'Afghanistan' },
    { key: 'ax', value: 'ax', text: 'Aland Islands' },

  ]

  const [open, setOpen] = React.useState(false)
  const [projectName, setProjectName] = React.useState("")
  const [projectNum, setProjectNum] = React.useState(0)
  const [client, setClient] = React.useState("")
  const [buildingType, setBuildingType] = React.useState("")
  const [printingCom, setPrintingCom] = React.useState("")
  const [workType, setWorkType] = React.useState("")
  const [estCost, setEstCost] = React.useState(null)
  const [adressLine1, setAdressLine1] = React.useState("")
  const [adressLine2, setAdressLine2] = React.useState("")
  const [city, setCity] = React.useState("")
  const [state, setState] = React.useState("")
  const [zip, setZip] = React.useState("")
  const [country, setCountry] = React.useState("")
  const [description, setDescription] = React.useState("")
  const [items, setItems] = React.useState([{ key: 'add_new', value: 'add_new', text: '+ add new' }]);
  const [printingCompany, setPrintingCompany] = React.useState([]);
  const [clientCompanies, setClientCompany] = React.useState([])
  const [addProject] = useProjectMutation(ADD_PROJECT);
  // const { loading, error, data } = useProjectQuery(GET_PROJECTS);
  const { loading: worktypeLoading, error, data:worktypeData  } = useWorkTypesQuery(GET_WORKTYPES);
  const { loading:companyLoading, data:printingCompanyData } = useCompanyQuery(GET_PRINTING_COMPANY);
  const { loading:clientLoading, data:clientCompany } = useCompanyQuery(GET_CLIENT_COMPANY);


  React.useEffect(() => {
    if(worktypeData){
      console.log('data==>', worktypeData.workTypes);
     setItems(worktypeData.workTypes.map(({name }) => ({ key: name, value: name, text: name })));

    }
  }, [worktypeData]);

  React.useEffect(() => {
    if(printingCompanyData){
      console.log('setPrintingCompany==>', printingCompanyData.company);
     setPrintingCompany(printingCompanyData.company.map(({companyName }) => ({ key: companyName, value: companyName, text: companyName })));

    }
  }, [printingCompanyData]);

  React.useEffect(() => {
    if(clientCompany){
      console.log('setPrintingCompany==>', clientCompany.company);
      setClientCompany(clientCompany.company.map(({companyName }) => ({ key: companyName, value: companyName, text: companyName })));

    }
  }, [clientCompany]);

  const onprojectNameChange = e => {
    setProjectName(e.target.value)
    console.log('projectName', projectName)
  }
  const onprojectNumChange = e => {
    const pn = Number(e.target.value)
    setProjectNum(pn)
    console.log('project', projectNum)
  }
  const onprojectClient = (event, data) => {
    setClient(data.value)
    console.log('client', client)
  }
  const onBuildingType = (event, data) => {
    setBuildingType(data.value)
    console.log('building type', buildingType)
  }

  const onPrintingCom = (event, data) => {
    if(data.value == 'add'){
      console.log('add new==>')
      return(
        <ModalExamplePrinting />
      )
    }
    else{
      setPrintingCom(data.value)
    }
   
  }

  const onWorkType = (event, data) => {
    setWorkType(data.value)
  }

  const onEstCost = (event, data) => {
    const es = Number(data.value)
    setEstCost(es)
    console.log('estimated cost',estCost)
  }

  const onAdressLine1 = (e) => {
    setAdressLine1(e.target.value);
  }
  const onAdressLine2 = e => {
    setProjectName(e.target.value)
  }
  const onCity = e => {
    setCity(e.target.value)
  }
  const onState = e => {
    setState(e.target.value)
  }

  const onZip = e => {
    setZip(e.target.vale)
  }
  const onCountry = (event, data) => {
    setCountry(data.value)
  }
 const onDescription =e =>{
     setDescription(e.target.value)
     console.log('desicription', description)
   }
  const handleSaveProject = () => {
    setOpen(false);
    // props.close();
    console.log('projectCreated==>', projectName,typeof(projectNum), client)
    // let projectNumber: number = + projectNum;
    //  debugger
    addProject({
      variables: {
        projectName, projectNum, client, buildingType,
        printingCom, workType, estCost,description
      },
      update: (
        cache: ApolloCache<ProjectMutation>,
        { data: { addProject } }: FetchResult<ProjectMutation>
      ) => {
        const cacheData = cache.readQuery({ query: GET_PROJECTS }) as IProjects;
        cache.writeQuery({
          query: GET_PROJECTS,
          data: {
            getProjects: [...cacheData.projects, addProject]
          }
        });
      }
    });

  };

  const panes = [
    {
      menuItem: 'Information',
      render: () => <Tab.Pane attached={false}>
        {/* <SampleModal/> */}
        <div className="content">
          <div className="description">Upload Client logo</div>
          <Button className="secondary_btn" size='mini' primary>Click to upload</Button>
          <p className="paragraph">Click the upload button to upload the client logo</p>
        </div>
        <div>

          <Header className="header" >Project Information</Header>
        </div>
        <Form >
          <Grid columns={2}>
            <Grid.Row>
              <Grid.Column>
                <Form.Field>
                  <label>What's the Project Name? <span className="danger">*</span></label>
                  <Input
                    placeholder='Default'
                    size='small' className="full-width"
                    type="text" id="projectName"
                    value={projectName}
                    onChange={onprojectNameChange}
                  />
                </Form.Field>
              </Grid.Column>

              <Grid.Column>
                <Form.Field>
                  <label>Internal Project Number  <span className="danger">*</span></label>
                  <Input
                    placeholder='Default' size='small'
                    className="full-width" type="number"
                    value={projectNum}
                    onChange={onprojectNumChange}
                  />
                </Form.Field>
              </Grid.Column>
            </Grid.Row>
          </Grid>

          <Grid columns={2}>
            <Grid.Row>
              <Grid.Column>
                <Form.Field>
                  <label>Client <span className="danger">*</span></label>
                  <Select placeholder='Select' className="small"
                    options={clientCompanies}
                    value={client}
                    onChange={onprojectClient}
                  />
                </Form.Field>
              </Grid.Column>

              <Grid.Column>
                <Form.Field>
                  <label>Type of building <span className="danger">*</span></label>
                  <Select placeholder='Select' className="small" options={buildingOption}
                    value={buildingType}
                    onChange={onBuildingType}
                  />
                </Form.Field>
              </Grid.Column>
            </Grid.Row>
          </Grid>
          <Grid columns={2}>
            <Grid.Row>
              <Grid.Column>
                <Form.Field>
                  <label>Printing Company </label>
                  <Select placeholder='Select' className="small" options={printingCompany}
                    value={printingCom}
                    onChange={onPrintingCom}
                  />
                </Form.Field>
              </Grid.Column>


            </Grid.Row>
          </Grid>

        </Form>
        <div>
          <Header className="header" >Manage work type and estimated cost</Header>
        </div>

        <Table>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Work Type</Table.HeaderCell>
              <Table.HeaderCell> </Table.HeaderCell>
              <Table.HeaderCell>Estimate Cost</Table.HeaderCell>

            </Table.Row>
          </Table.Header>

          <Table.Body>
            <Table.Row>
              <Table.Cell>
                <Form>
                  <Grid columns={1}>
                    <Grid.Row>
                      <Grid.Column>
                        <Form.Field>
                          <Select placeholder='Select' className="small" options={items}
                            value={workType}
                            onChange={onWorkType}
                          />
                        </Form.Field>
                      </Grid.Column>

                    </Grid.Row>
                  </Grid>
                </Form>

              </Table.Cell>
              <Table.Cell></Table.Cell>
              <Table.Cell>
                <Form>
                  <Grid columns={1}>
                    <Grid.Row>
                      <Grid.Column>
                        <Form.Field>

                          <Input label='$' size='small' className="full-width"
                            type="number"
                            value={estCost}
                            onChange={onEstCost}
                          />
                        </Form.Field>
                      </Grid.Column>

                    </Grid.Row>
                  </Grid>
                </Form>

              </Table.Cell>

            </Table.Row>
            {/* <Table.Row>
              <Table.Cell>
                <Form>
                  <Grid columns={1}>
                    <Grid.Row>
                      <Grid.Column>
                        <Form.Field>
                          <Select placeholder='Select' className="small" options={countryOptions} />
                        </Form.Field>
                      </Grid.Column>

                    </Grid.Row>
                  </Grid>
                </Form>

              </Table.Cell>
              <Table.Cell></Table.Cell>
              <Table.Cell>
                <Form>
                  <Grid columns={1}>
                    <Grid.Row>
                      <Grid.Column>
                        <Form.Field>

                          <Input label='$' size='small' className="full-width" />
                        </Form.Field>
                      </Grid.Column>

                    </Grid.Row>
                  </Grid>
                </Form>

              </Table.Cell>

            </Table.Row> */}
            {/* <Table.Row>
              <Table.Cell>
                <a href="">+ Add more </a>

              </Table.Cell>
              <Table.Cell></Table.Cell>
              <Table.Cell>

              </Table.Cell>
            </Table.Row> */}
          </Table.Body>
        </Table>

        <div>

          <Header className="header" >Address Information</Header>

        </div>
        <Form>
          <Grid columns={2}>
            <Grid.Row>
              <Grid.Column>
                <Form.Field>
                  <label>Address Line 1  </label>
                  <Input
                    placeholder='Default' size='small' className="full-width" type="text"
                    value={adressLine1}
                    onChange={onAdressLine1}
                  />
                </Form.Field>
              </Grid.Column>

              <Grid.Column>
                <Form.Field>
                  <label>Address Line 2   </label>
                  <Input
                    placeholder='Default' size='small' className="full-width" type="text"
                    value={adressLine2}
                    onChange={onAdressLine2}
                  />
                </Form.Field>
              </Grid.Column>
            </Grid.Row>
          </Grid>

          <Grid columns={4}>
            <Grid.Row>
              <Grid.Column>
                <Form.Field>
                  <label>City</label>
                  <Input
                    placeholder='Default' size='small' className="full-width" type="text"
                    value={city}
                    onChange={onCity}
                  />
                </Form.Field>
              </Grid.Column>

              <Grid.Column>
                <Form.Field>
                  <label>State</label>
                  <Input
                    placeholder='Default' size='small' className="full-width" type="text"
                    value={state}
                    onChange={onState}
                  />
                </Form.Field>
              </Grid.Column>
              <Grid.Column>
                <Form.Field>
                  <label>Zip</label>
                  <Input
                    placeholder='Default' size='small' className="full-width" type="text"
                    value={zip}
                    onChange={onZip}
                  />
                </Form.Field>
              </Grid.Column>
              <Grid.Column>
                <Form.Field>
                  <label>Country</label>
                  <Select
                    placeholder='Select' className="small" options={countryOptions}
                    value={country}
                    onChange={onCountry}
                  />
                </Form.Field>
              </Grid.Column>
            </Grid.Row>
          </Grid>
          <Grid columns={1}>
            <Grid.Row>
              <Grid.Column>
                <Form.Field>
                  <label>Description </label>
                  <TextArea placeholder='Tell us more' 
                   value={description}
                   onChange={onDescription}
                    />
                </Form.Field>
              </Grid.Column>


            </Grid.Row>
          </Grid>

        </Form>





      </Tab.Pane>,
    },
    {
      menuItem: 'People',
      render: () => <Tab.Pane attached={false}>Tab 2 Content</Tab.Pane>
    }

  ]



  return (
    <div id="navbar">
      <Modal className="modal_media"
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        trigger={<Button size='mini' className="grey-btn">+ Add New</Button>}
      >
        <Modal.Header><h3>Add New Project </h3></Modal.Header>
        <Modal.Content body>

          <div>
            <Tab menu={{ secondary: true, pointing: true }} panes={panes} />


            <Modal.Description>

            </Modal.Description>

          </div>


        </Modal.Content>
        <Modal.Actions>
          <Button
            content="Click to continue"
            onClick={handleSaveProject}
            positive
            size='mini' className="grey-btn"
          />
          <Button size='mini' className="icon-border" onClick={() => setOpen(false)}>
            X  Cancel
        </Button>

        </Modal.Actions>
      </Modal>
    </div>

  )
}

export default ModalExampleModal
