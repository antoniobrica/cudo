import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Header, Modal, Tab, Table, Input, Form, Grid, Select, TextArea } from 'semantic-ui-react';
import WorkTypeDropdown from './work-type-dropdown';

import './work-type.module.scss';

export interface WorkTypeProps {
  worktypes,
  workTypeData
}

export function WorkType(props: WorkTypeProps) {
  const [fields, setFields] = React.useState([{ workTypeName: null, estimatedCost: null, workTypeID: null }])
  const { t } = useTranslation()

  function handleChangeInput(i, event, field) {
    const values = [...fields];
    if (field === 'worktype') {
      values[i].workTypeName = event
    }
    else {
      values[i].estimatedCost = Number(event.target.value);
    }
    setFields(values);
    props.workTypeData(fields)
  }

  function handleAddInput() {
    const values = [...fields];
    values.push({
      workTypeName: '',
      estimatedCost: '',
      workTypeID: ''
    });
    setFields(values);
  }
  function handleRemoveInput(i) {
    const values = [...fields];
    values.splice(i, 1);
    setFields(values);
  }
  const getWorktype = (data, id) => {
    handleChangeInput(id, data, 'worktype')
  }

  return (
    <Table className="manage-work-table" celled>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell width={12}>{t("project_list.add_new_project.worktype")}</Table.HeaderCell>
          <Table.HeaderCell width={4}>{t("project_list.add_new_project.estimate_cost")}</Table.HeaderCell>
        </Table.Row>
      </Table.Header>


      <Table.Body>
        {
          fields.map((field, idx) => {
            return (
              <Table.Row key={`${field}-${idx}`}>
                <Table.Cell>
                  <Form>
                    {/* <Form.Field>
                        <Select placeholder='Select' className="small"  options={props.worktypes}
                          value={field.workTypeName}
                          onChange={e =>handleChangeInput( idx, e, 'worktype')}
                        />
                      </Form.Field> */}
                    <WorkTypeDropdown data={props.worktypes} id={idx} selectedWorkType={getWorktype} />
                  </Form>
                </Table.Cell>
                <Table.Cell>
                  <Form>
                    <Form.Field className="estimated-cost-field">
                      <Input label='$' size='small' className="full-width"
                        type="text"
                        value={field.estimatedCost}
                        onChange={e => handleChangeInput(idx, e, 'estCost')}
                      />
                    </Form.Field>
                    <i className="ms-Icon ms-Icon--Delete delete-row" aria-hidden="true"></i>
                  </Form>
                </Table.Cell>
              </Table.Row>
            )
          }
          )
        }
        <Table.Row>
          <Table.Cell colspan="2" className="add-more-work">
            <a onClick={() => handleAddInput()}><i className="ms-Icon ms-font-xl ms-Icon--Add ms-fontColor-themePrimary"></i> {t("project_list.add_new_project.add_more_button")} </a>
          </Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>

  );
}

export default WorkType;
