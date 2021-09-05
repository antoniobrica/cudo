import { radios } from '@storybook/addon-knobs';
import React from 'react';
import { Button, Header, Modal, Tab, Table, Input, Form, Grid, Select, TextArea } from 'semantic-ui-react';
// import SampleModal from './sample-modal';
import { IProject, IProjects, ProjectMutation, IWorkTypes, IProjectWorktypes, ProjectWorkTypeModel } from "../../interfaces/project";
import { useProjectMutation, useProjectQuery, useWorkTypesQuery, useCompanyQuery, useBuildingTypesQuery } from '../../services/useRequest';
import { ApolloCache, FetchResult, useMutation } from '@apollo/client';
import { ADD_PROJECT, GET_BUILDINGTYPES, GET_CLIENT_COMPANY, GET_PRINTING_COMPANY, GET_PROJECTS, GET_WORKTYPES } from "../../graphql/graphql";
import { ModalExamplePrinting, ModalExampleCompany } from '@cudo/shared-components'
import WorkType from '../../work-type/work-type';
import { MfAccountAppLib } from '@cudo/mf-account-app-lib';
import ReactQuill, { Quill } from 'react-quill';
import { TEXT_MAXLENGTHS } from '@cudo/mf-core'
import { useTranslation } from 'react-i18next';

export interface ProjectInfoProps {
  onSuccess
  getProjectToasterMessage
  getProjectErrorMessage
}

export interface AddProjectErrors {
  titleError?: string,
  numberError?: string,
  companyError?: string,
  buildingError?: string,
}

export function ModalExampleModal(props: ProjectInfoProps) {
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

  const companyTypeOptions = [
    { key: 'clientCompany', value: 'client', text: 'Client' },
    { key: 'printingCompany', value: 'printing', text: 'Printing' },
  ]

  const emailTypeOptions = [
    { key: 'officeEmail', value: 'office', text: 'Office' },
    { key: 'homeEmail', value: 'home', text: 'Home' },
    { key: 'otherEmail', value: 'other', text: 'Other' },
  ]

  const phoneTypeOptions = [
    { key: 'officePhone', value: 'office', text: 'Office' },
    { key: 'homePhone', value: 'home', text: 'Home' },
    { key: 'otherPhone', value: 'other', text: 'Other' },
  ]


  const [open, setOpen] = React.useState(false)
  const [projectName, setProjectName] = React.useState("")
  const [projectNum, setProjectNum] = React.useState(0)
  const [client, setClient] = React.useState("")
  const [buildingType, setBuildingType] = React.useState("")
  const [printing, setPrinting] = React.useState("")
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
  const [printingCompanies, setPrintingCompany] = React.useState([]);
  const [clientCompanies, setClientCompany] = React.useState([])
  const [buildingTypes, setBuildingTypes] = React.useState([])
  const [addWorkTypes, setAddWorkTypes] = React.useState(1)
  const [secondOpen, setSecondOpen] = React.useState(false)
  const [projectWorkEstimates, setProjectWorkEstimates] = React.useState(null)
  const [dataList, setDataList] = React.useState(null)
  const [errors, setErrors] = React.useState<AddProjectErrors>({})


  const [companyCountry, setCompanyCountry] = React.useState(null)
  const { t } = useTranslation()

  // const [addProject] = useProjectMutation(ADD_PROJECT);

  const [validationErrors, setValidationErrors] = React.useState(null)

  const [addProject, { loading: addProjectLoading, error: addProjectError, data: addProjectData }] = useMutation(ADD_PROJECT,
    // {
    //   refetchQueries: [
    //     { query: GET_PROJECTS }
    //   ]
    // }
  )
  // const { loading, error, data } = useProjectQuery(GET_PROJECTS);
  const { loading: worktypeLoading, error, data: worktypeData } = useWorkTypesQuery(GET_WORKTYPES);
  const { loading: companyLoading, data: printingCompany } = useCompanyQuery(GET_PRINTING_COMPANY);
  const { loading: clientLoading, data: clientCompany } = useCompanyQuery(GET_CLIENT_COMPANY);
  const { loading: buildingTypesloading, data: buildingTypesData } = useBuildingTypesQuery(GET_BUILDINGTYPES);

  React.useEffect(() => {
    if (worktypeData) {
      setItems(worktypeData.workTypes.map(({ name, workTypeID }) => ({ key: name, value: name, text: name, id: workTypeID })));
    }
  }, [worktypeData]);

  // set toaster message for add project
  React.useEffect(() => {
    if (!addProjectLoading && dataList) {
      props.getProjectToasterMessage(t("toaster.success.project.project_created"))
    }
    if (!addProjectLoading && !dataList && addProjectError) {
      props.getProjectErrorMessage(addProjectError.graphQLErrors[0]?.extensions.exception.status)
    }
  }, [addProjectLoading])


  React.useEffect(() => {
    if (buildingTypesData) {
      setBuildingTypes(buildingTypesData.buildingTypes.map(({ name }) => ({ key: name, value: name, text: name })));
    }
  }, [buildingTypesData]);

  React.useEffect(() => {
    if (printingCompany) {
      setPrintingCompany(printingCompany.company.map(({ companyName }) => ({ key: companyName, value: companyName, text: companyName })));
    }
  }, [printingCompany]);

  React.useEffect(() => {
    if (clientCompany) {
      setClientCompany(clientCompany.company.map(({ companyName }) => ({ key: companyName, value: companyName, text: companyName })));
    }
  }, [clientCompany]);


  const onprojectNameChange = e => {
    setProjectName(e.target.value)
  }
  const onprojectNumChange = e => {
    const pn = Number(e.target.value)
    setProjectNum(pn)
  }
  const onprojectClient = (event, data) => {
    setClient(data.value)
    // if (data.value == 'click') {
    //   return (
    //     <div>
    //       <ModalExampleCompany></ModalExampleCompany><br />
    //     </div>)
    // }
  }
  const onBuildingType = (event, data) => {
    setBuildingType(data.value)
  }

  const onProjectPrinting = (event, data) => {
    setPrinting(data.value)
    // if (data.value == 'add') {
    //   return (
    //     <ModalExamplePrinting />
    //   )
    // }
    // else {
    //   setPrintingCom(data.value)
    // }

  }

  const onWorkType = (event, data) => {
    setWorkType(data.value)
  }

  const onEstCost = (event, data) => {
    const es = Number(data.value)
    setEstCost(es)
  }

  const onAdressLine1 = (e) => {
    setAdressLine1(e.target.value);
  }
  const onAdressLine2 = e => {
    setAdressLine2(e.target.value)
  }
  const onCity = e => {
    setCity(e.target.value)
  }
  const onState = e => {
    setState(e.target.value)
  }
  const onZip = e => {
    setZip(e.target.value)
  }
  const onCountry = (data) => {
    setCountry(data)
  }
  const onDescription = (e) => {
    setDescription(e.target.value)

  }

  const addWorkType = () => {
    setAddWorkTypes(prevCount => prevCount + 1);
  }
  const moreWorkTypes = (data) => {

    const worktypesArr = [];
    for (let i = 0; i < data.length; i++) {
      worktypeData.workTypes.map(d => {
        if (d.name == data[i].workTypeName) {
          data[i].workTypeID = d.workTypeID;
        }
      })
    }

    setProjectWorkEstimates(data);

  }

  const validation = () => {
    const errorMessages: AddProjectErrors = {}
    if (!projectName) {
      errorMessages.titleError = (t("common.errors.no_project_name"))
    }
    if (!projectNum) {
      errorMessages.numberError = (t("common.errors.no_project_number"))
    }
    if (!client) {
      errorMessages.companyError = (t("common.errors.no_client_company"))
    }
    if (!buildingType) {
      errorMessages.buildingError = (t("common.errors.no_building_type"))
    }

    return errorMessages
  }
  const handleSaveProject = () => {
    const validationResponse = validation()
    if (Object.keys(validationResponse).length > 0) {
      setErrors(validationResponse)
      return false
    }

    setOpen(false);
    addProject({
      variables: {
        projectName,
        projectNum,
        client,
        buildingType,
        printingCompany: printing,
        description,
        projectWorkEstimates,
        addressLineOne: adressLine1,
        addressLineTwo: adressLine2,
        city,
        state,
        zip,
        country,
        createdBy: 'dev'
      },
      update: (
        cache,
        data
      ) => {
        const cacheData = cache.readQuery({ query: GET_PROJECTS }) as IProjects;
         
        setDataList(data)
        cache.writeQuery({
          query: GET_PROJECTS,
          data: {
            getProjects: [...cacheData?.projects, data['createProject']]
          }
        });
         
        props.onSuccess(data);
      }
    });

  };

  const panes = [
    {
      menuItem: t("project_list.add_new_project.info"),
      render: () => <Tab.Pane attached={false}>
        {/* <SampleModal/> */}
        <div className="content upload-client-logo">
          <div className="description">{t("project_list.add_new_project.upload_logo_title")} <span>{t("project_list.add_new_project.upload_logo_line")}</span></div>
          <Button className="secondary_btn" size='small' primary>{t("project_list.add_new_project.upload_logo_button")}</Button>
        </div>

        <Header className="header">{t("project_list.add_new_project.projet_info")}</Header>
        <Form >
          <Grid columns={2}>
            <Grid.Row>
              <Grid.Column>
                {/* <Form.Field error> */}
                <Form.Field>
                  <label>{t("project_list.add_new_project.project_name_label")}? <span className="danger">*</span></label>
                  <Input
                    placeholder={t("project_list.add_new_project.default")}
                    size='small' className="full-width"
                    type="text" id="projectName"
                    value={projectName}
                    onChange={onprojectNameChange}
                    maxLength={TEXT_MAXLENGTHS["project_name"]?.maxLength}
                    error={errors.titleError && !projectName}
                  />
                  {errors?.titleError && !projectName ? <span className="error-message">{errors.titleError}</span> : null}
                  {/* <span className="error-message">There is some error</span> */}
                </Form.Field>
              </Grid.Column>

              <Grid.Column>
                <Form.Field>
                  <label>{t("project_list.add_new_project.project_number_label")}  <span className="danger">*</span></label>
                  <Input
                    placeholder='Default' size='small'
                    className="full-width" type="number"
                    value={projectNum}
                    onChange={onprojectNumChange}
                    error={errors?.numberError && !projectNum}
                  />
                  {errors?.numberError && !projectNum ? <span className="error-message">{errors.numberError}</span> : null}
                </Form.Field>
              </Grid.Column>
            </Grid.Row>
          </Grid>

          <Grid columns={2}>
            <Grid.Row>
              <Grid.Column>
                <Form.Field>
                  <label>{t("project_list.add_new_project.client_label")} <span className="danger">*</span></label>
                  <Select placeholder={t("common.select")} className="small"
                    options={clientCompanies}
                    value={client}
                    onChange={onprojectClient}
                    clearable
                    error={errors?.companyError && !client}
                  />
                  {errors?.companyError && !client ? <span className="error-message">{errors.companyError}</span> : null}
                </Form.Field>
                <Form.Field>
                  <a className="anchor-color" onClick={() => setSecondOpen(true)}>+ {t("common.add_new_button")}</a>
                </Form.Field>
              </Grid.Column>

              <Grid.Column>
                <Form.Field>
                  <label>{t("project_list.add_new_project.building_type_lable")} <span className="danger">*</span></label>
                  <Select placeholder={t("common.select")} className="small" options={buildingTypes}
                    value={buildingType}
                    onChange={onBuildingType}
                    clearable
                    error={errors?.buildingError && !buildingType}
                  />
                  {errors?.buildingError && !buildingType ? <span className="error-message">{errors.buildingError}</span> : null}
                </Form.Field>
              </Grid.Column>
            </Grid.Row>
          </Grid>
          <Grid columns={2}>
            <Grid.Row>
              <Grid.Column>
                <Form.Field>
                  <label>{t("project_list.add_new_project.printing_company")} </label>
                  <Select placeholder={t("common.select")} className="small" options={printingCompanies}
                    value={printing}
                    onChange={onProjectPrinting}
                    clearable
                  />
                </Form.Field>
                <Form.Field>
                  <a className="anchor-color" onClick={() => setSecondOpen(true)}>+ {t("common.add_new_button")}</a>
                </Form.Field>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Form>

        <Header className="header" >{t("project_list.add_new_project.worktype_header")}</Header>
        <WorkType worktypes={items} workTypeData={moreWorkTypes} />
        {/*  <Table>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Work Type</Table.HeaderCell>
              <Table.HeaderCell> </Table.HeaderCell>
              <Table.HeaderCell>Estimate Cost</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {
          [...Array(addWorkTypes)].map((k,i)=>  
<Table.Row key={i}>
              <Table.Cell>
                <Form>
                  <Grid columns={1}>
                    <Grid.Row>
                      <Grid.Column>
                        <Form.Field>
                          <Select placeholder={t("common.select")} className="small" options={items}
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
           
        
        )
        }          */}
        {/* <Table.Row>
              <Table.Cell>
                <a onClick={addWorkType}>+ Add more </a>

              </Table.Cell>
              <Table.Cell></Table.Cell>
              <Table.Cell>

              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table> */}

        <div>
          <Header className="header" >{t("project_list.add_new_project.address_info")}</Header>
        </div>
        <Form>
          <Grid columns={2}>
            <Grid.Row>
              <Grid.Column>
                <Form.Field>
                  <label>{t("register.address1")}  </label>
                  <Input
                    placeholder={t("project_list.add_new_project.default")} size='small' className="full-width" type="text"
                    value={adressLine1}
                    onChange={onAdressLine1}
                    maxLength={TEXT_MAXLENGTHS["address_line_1"]?.maxLength}
                  />
                </Form.Field>
              </Grid.Column>
              <Grid.Column>
                <Form.Field>
                  <label>{t("register.address2")}   </label>
                  <Input
                    placeholder={t("project_list.add_new_project.default")} size='small' className="full-width" type="text"
                    value={adressLine2}
                    onChange={onAdressLine2}
                    maxLength={TEXT_MAXLENGTHS["address_line_2"]?.maxLength}
                  />
                </Form.Field>
              </Grid.Column>
            </Grid.Row>
          </Grid>
          <Grid columns={4}>
            <Grid.Row>
              <Grid.Column>
                <Form.Field>
                  <label>{t("register.city")}</label>
                  <Input
                    placeholder={t("project_list.add_new_project.default")} size='small' className="full-width" type="text"
                    value={city}
                    onChange={onCity}
                    maxLength={TEXT_MAXLENGTHS["city"]?.maxLength}
                  />
                </Form.Field>
              </Grid.Column>

              <Grid.Column>
                <Form.Field>
                  <label>{t("project_list.add_new_project.state")}</label>
                  <Input
                    placeholder={t("project_list.add_new_project.default")} size='small' className="full-width" type="text"
                    value={state}
                    onChange={onState}
                    maxLength={TEXT_MAXLENGTHS["state"]?.maxLength}
                  />
                </Form.Field>
              </Grid.Column>
              <Grid.Column>
                <Form.Field>
                  <label>{t("register.zip")}</label>
                  <Input
                    placeholder={t("project_list.add_new_project.default")} size='small' className="full-width" type="text"
                    value={zip}
                    onChange={onZip}
                    maxLength={TEXT_MAXLENGTHS["zip"]?.maxLength}
                  />
                </Form.Field>
              </Grid.Column>
              <Grid.Column>
                {/* <Form.Field>
                  <label>Country</label>
                  <Select
                    placeholder={t("common.select")} className="small" options={countryOptions}
                    value={country}
                    onChange={onCountry}
                  />
                </Form.Field> */}
                <MfAccountAppLib parentCallback={onCountry} />
              </Grid.Column>
            </Grid.Row>
          </Grid>
          <Grid columns={1}>
            <Grid.Row>
              <Grid.Column>
                <Form.Field>
                  <label>{t("common.desc")} </label>
                  <TextArea placeholder={t("common.tell_us_more")}
                    value={description}
                    onChange={onDescription}
                  />
                  {/* <ReactQuill
                    value={description}
                    modules={{
                      toolbar: false
                      // {
                      //   container: [
                      //     [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
                      //     ['bold', 'italic', 'underline'],
                      //     [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                      //     [{ 'align': [] }],
                      //     ['link', 'image'],
                      //     ['clean'],
                      //     [{ 'color': [] }]
                      //   ]
                      // }
                    }}
                    placeholder={t("common.tell_us_more")}
                    onChange={(content, delta, source, editor) => onDescription(content)}
                    // onKeyDown={onKeyPresDescription}
                    id="txtDescription"
                  /> */}
                </Form.Field>
              </Grid.Column>


            </Grid.Row>
          </Grid>
        </Form>





      </Tab.Pane>,
    },
    {
      menuItem: t("project_list.add_new_project.people"),
      render: () => <Tab.Pane attached={false}>Tab 2 Content</Tab.Pane>
    }

  ]

  const onChangeCompanyCountry = (data) => {
    setCompanyCountry(data.value)
  }


  return (
    <div className="add-project-area">
      {/* <div id="navbar"> */}
      <Modal className="modal_media right-side--fixed-modal add-new-project-modal"
        closeIcon
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        trigger={<Button size='small' className="primary"><i className="ms-Icon ms-font-xl ms-Icon--Add ms-fontColor-themePrimary"></i> {t("common.add_new_button")}</Button>}
        closeOnDimmerClick={false}
      >
        <Modal.Header><h3>{t("project_list.add_new_project.title")} </h3></Modal.Header>
        <Modal.Content body>

          <div>
            <Tab menu={{ secondary: true, pointing: true }} panes={panes} />


            <Modal.Description>

            </Modal.Description>

          </div>


        </Modal.Content>
        {/* <Modal.Actions>
          <Button
            content="Click to continue"
            onClick={handleSaveProject}
            positive
            size='mini' className="grey-btn"
          />
          <Button size='mini' className="icon-border" onClick={() => setOpen(false)}>
            X  Cancel
        </Button>

        </Modal.Actions> */}
        <Modal className="right-side--fixed-modal add-new-project-modal"
          closeIcon
          onClose={() => setSecondOpen(false)}
          open={secondOpen}
          size='small'
          closeOnDimmerClick={false}
        >

          <Modal.Header><h3>{t("project_list.add_new_project.add_company_title")}</h3></Modal.Header>
          <Modal.Content body>

            <div>
              <div className="content">
                <div className="description">{t("project_list.add_new_project.upload_logo_title")}  <span className="danger">*</span></div>
                <Button className="secondary_btn" size='mini' primary>{t("project_list.add_new_project.upload_logo_button")} </Button>
                <p className="paragraph">{t("project_list.add_new_project.upload_logo_line")}</p>
              </div>

              <Form>
                <Grid columns={1}>
                  <Grid.Row>
                    <Grid.Column>
                      <Form.Field>
                        <label>{t("project_list.add_new_project.company_name_label")}? <span className="danger">*</span></label>
                        <Input placeholder='Al Hamra Company' size='small' className="full-width" type="text" />
                      </Form.Field>
                    </Grid.Column>

                  </Grid.Row>
                </Grid>

                <Grid columns={1}>
                  <Grid.Row>
                    <Grid.Column>
                      <Form.Field>
                        <label>{t("project_list.add_new_project.company_type_label")} </label>
                        <Select placeholder={t("common.select")} className="small" options={companyTypeOptions} clearable />

                      </Form.Field>
                    </Grid.Column>

                  </Grid.Row>
                </Grid>

                <Grid columns={2}>
                  <Grid.Row>
                    <Grid.Column>
                      <Form.Field>
                        <label>{t("project_list.add_new_project.email")} </label>
                        <Input placeholder={t("project_list.add_new_project.email")} size='small' className="full-width" type="text" />
                      </Form.Field>
                    </Grid.Column>

                    <Grid.Column>
                      <Form.Field>
                        <label>{t("common.type")}  </label>
                        <Select placeholder={t("common.select")} className="small" options={emailTypeOptions} clearable />

                      </Form.Field>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
                <Grid columns={1} className="grid-add-new">
                  <Grid.Row>
                    <Grid.Column>
                      <Form.Field>
                        <a href="" className="anchor-color">+ {t("common.add_new_button")}</a>
                      </Form.Field>
                    </Grid.Column>


                  </Grid.Row>
                </Grid>


                <Grid columns={2} >
                  <Grid.Row>
                    <Grid.Column >
                      <Form.Field >
                        <label>{t("project_list.add_new_project.phone")} </label>
                        <Grid columns={2} className="form-field">
                          <Grid.Row>
                            <Grid.Column>
                              <Form.Field>
                                <Select placeholder={t("common.select")} className="small" options={countryOptions} clearable />
                              </Form.Field>
                              <Form.Field>
                                <a href="" className="anchor-color">+ {t("common.add_new_button")}</a>
                              </Form.Field>
                            </Grid.Column>
                            <Grid.Column>
                              <Form.Field>
                                <Select placeholder={t("common.select")} className="small" options={countryOptions} clearable />
                              </Form.Field>

                            </Grid.Column>
                          </Grid.Row>
                        </Grid>

                      </Form.Field>
                    </Grid.Column>

                    <Grid.Column  >
                      <Form.Field>
                        <label>{t("common.type")}  </label>
                        <Select placeholder={t("common.select")} className="small" options={phoneTypeOptions} clearable />
                      </Form.Field>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
                <Grid columns={1}>
                  <Grid.Row>
                    <Grid.Column>
                      <Form.Field>
                        <label>{t("register.address1")}</label>
                        <Input placeholder={t("register.address1")} size='small' className="full-width" type="text" />
                      </Form.Field>
                    </Grid.Column>

                  </Grid.Row>

                </Grid>
                <Grid columns={1}>
                  <Grid.Row>
                    <Grid.Column>
                      <Form.Field>
                        <label>{t("register.address2")} </label>
                        <Input placeholder={t("register.address2")} size='small' className="full-width" type="text" />
                      </Form.Field>
                    </Grid.Column>

                  </Grid.Row>

                </Grid>

                <Grid columns={3}>
                  <Grid.Row>
                    <Grid.Column>
                      <Form.Field>
                        <label>{t("register.city")}  </label>
                        <Input placeholder={t("register.city")} size='small' className="full-width" type="text" />

                      </Form.Field>
                    </Grid.Column>
                    <Grid.Column>
                      <Form.Field>
                        <label>{t("project_list.add_new_project.state_pin")} </label>
                        <Input placeholder={t("project_list.add_new_project.state_pin")} size='small' className="full-width" type="text" />

                      </Form.Field>
                    </Grid.Column>
                    <Grid.Column>
                      <Form.Field>
                        {/*<label>Country  </label>
                         <Select placeholder={t("common.select")} className="small" 
                            options={countryOptions}  
                            value={client}
                            onChange={onprojectClient}/> */}
                        <MfAccountAppLib parentCallback={onChangeCompanyCountry} />

                      </Form.Field>
                    </Grid.Column>
                  </Grid.Row>
                  <Grid.Row>
                  </Grid.Row>

                </Grid>
              </Form>
              <Button
                content={t("project_list.add_new_project.add_comapany_button")}
                onClick={() => setOpen(false)}
                positive
                size='small' className="primary"
              />
              <Button size='small' className="icon-border" onClick={() => setSecondOpen(false)}>
                <i className="ms-Icon ms-font-xl ms-Icon--CalculatorMultiply ms-fontColor-themePrimary"></i> {t("common.cancel")}
              </Button>




            </div>


          </Modal.Content>






        </Modal>
        <Modal.Actions>
          <Button
            content={t("project_list.add_new_project.submit")}
            onClick={handleSaveProject}
            positive
            size='small' className="primary"
          />
          <Button size='small' className="icon-border" onClick={() => setOpen(false)}>
            <i className="ms-Icon ms-font-xl ms-Icon--CalculatorMultiply ms-fontColor-themePrimary"></i>  {t("common.cancel")}
          </Button>

        </Modal.Actions>
      </Modal>
    </div>

  )
}

export default ModalExampleModal
