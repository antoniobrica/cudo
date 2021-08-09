import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  Button,
  Header,
  Modal,
  Input,
  Form,
  Grid,
  Dropdown,
  Select,
  TextArea,
  FormButton,
} from 'semantic-ui-react';
import LoaderPage from '../loader/loader';
// import SampleModal from './sample-modal';
export interface PlanningProps {
  openPlanningDetail?,
  cancel?,
  milestoneDataById?,
  loading?
  edit?
  delete?
}
export function ModalViewPlanning(props: PlanningProps) {

  const countryOptions = [
    { key: 'af', value: 'af', text: 'Afghanistan' },
    { key: 'ax', value: 'ax', text: 'Aland Islands' },
  ];

  const [open, setOpen] = React.useState(false);
  const {t} = useTranslation()
  React.useEffect(() => {
    // console.log('loading', props.loading);
    if (props.openPlanningDetail) {
      setOpen(props.openPlanningDetail);
    }
  }, [props.openPlanningDetail]);
  const openf = () => {
    setOpen(true)
  }
  const cancel = () => {
    setOpen(false)
    props.cancel()
  }
  if (props.loading) return <LoaderPage />;
  return (
    <div id="navbar">
      <Modal className="modal_media right-side--fixed-modal view-milestone-modal"
        closeIcon
        onClose={cancel}
        onOpen={openf}
        open={open}
        // trigger={
        //   <Button size="mini" className="grey-btn">
        //     {t("project_tab_menu.planning.view_milestone")}
        //   </Button>
        // }
        closeOnDimmerClick={false}>
        <Modal.Header>
          <h3 className="header-w-icon d-flex align-item-center"><i className="ms-Icon ms-Icon--Completed" aria-hidden="true"></i> {t("project_tab_menu.planning.view_milestone_details")}
            <div className="symbol symbol-30 d-flex">
              <span className="dropdown-action">
                <Dropdown icon='ellipsis horizontal' floating labeled>
                  <Dropdown.Menu className="dropdowncomplete">
                    <Dropdown.Item
                      onClick={() => props.edit(props.milestoneDataById)}
                      icon="pencil" text="Edit" />
                    <Dropdown.Item
                      onClick={() => props.delete(props.milestoneDataById)}
                      icon="trash alternate outline"
                      text="Delete" />
                  </Dropdown.Menu>
                </Dropdown>
              </span>
            </div>
          </h3>
        </Modal.Header>
        <Modal.Content body>
          <div>
            <Form>
              <Grid columns={2}>
                <Grid.Row>
                  <Grid.Column>
                    <Form.Field className="filled-fields">
                      <label>{t("project_tab_menu.planning.milestone_title")}</label>
                      <span>{props?.milestoneDataById?.milestoneTitle}</span>
                    </Form.Field>
                  </Grid.Column>
                  <Grid.Column>
                    <Form.Field className="filled-fields">
                      <label>{t("common.due_date")}</label>
                      <span>{props?.milestoneDataById?.dueDate}</span>
                    </Form.Field>
                  </Grid.Column>
                </Grid.Row>
              </Grid>

              <Grid columns={1}>
                <Grid.Row>
                  <Grid.Column>
                    <Form.Field className="filled-fields">
                      <label>{t("common.desc")} </label>
                      <span>{props?.milestoneDataById?.description}
                      </span>
                    </Form.Field>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
              <Grid columns={1}>
                <Grid.Row>
                  <Grid.Column>
                    <Form.Field className="filled-fields">
                      <label>{t("project_tab_menu.task.work_type")}</label>
                      <span>{props?.milestoneDataById?.worktypeName} </span>
                    </Form.Field>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
              <Grid columns={1}>
                <Grid.Row>
                  <Grid.Column>
                    <Form.Field className="filled-fields">
                      <label>{t("project_tab_menu.planning.phase_type")}</label>
                      <span>{props?.milestoneDataById?.phaseName} </span>
                    </Form.Field>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Form>
          </div>
        </Modal.Content>
        {/* <Modal.Actions>
          <Button
            content={t("common.ok")}
            onClick={cancel}
            positive
            size="small"
            className="primary"
          />
          <Button
            size="small"
            className="icon-border"
            onClick={cancel}
          >
            <i className="ms-Icon ms-font-xl ms-Icon--CalculatorMultiply"></i> {t("common.cancel")}
          </Button>
        </Modal.Actions> */}
      </Modal>
    </div>
  );
}

export default ModalViewPlanning;
