import React from 'react';
import { Button, Header, Modal, Tab, Table, Input, Form, Grid, Select, TextArea } from 'semantic-ui-react';

import './work-type.module.scss';


/* eslint-disable-next-line */
export interface WorkTypeProps { 
  worktypes
}

export function WorkType(props: WorkTypeProps) {
  const [fields, setFields] = React.useState([{ worktype: null, estCost: null }])

  console.log('worktypes====>', props.worktypes)
  const clientOption = [
    { key: 'c1', value: 'c1', text: 'Client 1' },
    { key: 'c2', value: 'c2', text: 'Client 2' },
    { key: 'c3', value: 'c3', text: 'Client 3' },
    { key: 'c4', value: 'c4', text: 'Client 4' },


  ]

  function handleChangeInput(i, event, field) {
    console.log('field==>',field, i, event.target.value) 
    const values = [...fields];
    if(field === 'worktype'){
      values[i].worktype = event.target.value;
    }
    else  {
      values[i].estCost = event.target.value;
    }
    setFields(values);
    console.log("fields",fields);
  }

  function handleAddInput() {
    const values = [...fields];
    values.push({
      worktype: '',
      estCost: '',
    });
    setFields(values);
  }
  function handleRemoveInput(i) {
    const values = [...fields];
    console.log(values);
    values.splice(i, 1);
    setFields(values);
  }
  return (
    <Table>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell>Work Type</Table.HeaderCell>
        <Table.HeaderCell> </Table.HeaderCell>
        <Table.HeaderCell>Estimate Cost</Table.HeaderCell>

      </Table.Row>
    </Table.Header>

    <Table.Body>
      <Table.Body>
        {
          fields.map((field, idx) => {
            return (
              <Table.Row  key={`${field}-${idx}`}>
                <Table.Cell>
                  <Form>
                    <Grid columns={1}>
                      <Grid.Row>
                        <Grid.Column>
                          <Form.Field>
                            <Select placeholder='Select' className="small"  options={props.worktypes}
                              value={field.worktype}
                              onChange={e =>handleChangeInput( idx, e, 'worktype' )}
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
                              type="text"
                              value={field.estCost}
                              onChange={e =>handleChangeInput( idx, e, 'estCost')}
                            />
                          </Form.Field>
                        </Grid.Column>

                      </Grid.Row>
                    </Grid>
                  </Form>

                </Table.Cell>

              </Table.Row>


            )
          }
          )
        }
            <Table.Row>
          <Table.Cell>
            <a onClick={()=> handleAddInput()}>+ Add more </a>

          </Table.Cell>
          <Table.Cell></Table.Cell>
          <Table.Cell>

          </Table.Cell>
        </Table.Row>
      </Table.Body>
      </Table.Body>
        </Table>

  );
}

export default WorkType;
