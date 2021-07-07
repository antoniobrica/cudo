import React from 'react';
import { Button, Header, Modal, Tab, Table, Input, Form, Grid, Select, TextArea } from 'semantic-ui-react';
import WorkTypeDropdown from './work-type-dropdown';

import './work-type.module.scss';

export interface WorkTypeProps {
  worktypes,
  workTypeData
}

export function WorkType(props: WorkTypeProps) {
  const [fields, setFields] = React.useState([{ workTypeName: null, estimatedCost: null ,workTypeID:null}])


  function handleChangeInput(i, event, field) {
    const values = [...fields];
    if(field === 'worktype'){
          values[i].workTypeName = event
    }
    else {
      values[i].estimatedCost = Number(event.target.value);
    }
    setFields(values);
    props.workTypeData(fields)
    //console.log("fields",fields);
  }

  function handleAddInput() {
    const values = [...fields];
    values.push({
      workTypeName: '',
      estimatedCost: '',
      workTypeID:''
    });
    setFields(values);
  }
  function handleRemoveInput(i) {
    const values = [...fields];
    values.splice(i, 1);
    setFields(values);
  }
  const getWorktype = (data, id)=>{
     console.log('selected-WorkType', data)
     handleChangeInput(id, data,'worktype' )
  }

  return (
    <Table className="manage-work-table">
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell width={12}>Work Type</Table.HeaderCell>
          <Table.HeaderCell width='four'>Estimate Cost</Table.HeaderCell>
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
                      <WorkTypeDropdown data={props.worktypes} id={idx} selectedWorkType={getWorktype}/>
                    </Form>
                  </Table.Cell>
                  <Table.Cell>
                    <Form>
                      <Form.Field>
                        <Input label='$' size='small' className="full-width"
                          type="text"
                          value={field.estimatedCost}
                          onChange={e =>handleChangeInput( idx, e, 'estCost')}
                        />
                      </Form.Field>
                    </Form>
                  </Table.Cell>
                </Table.Row>
              )
            }
            )
          }
          <Table.Row>
            <Table.Cell>
              <a onClick={() => handleAddInput()}>+ Add more </a>

            </Table.Cell>
            <Table.Cell></Table.Cell>
            <Table.Cell>

            </Table.Cell>
          </Table.Row>
        </Table.Body>
    </Table>

  );
}

export default WorkType;
