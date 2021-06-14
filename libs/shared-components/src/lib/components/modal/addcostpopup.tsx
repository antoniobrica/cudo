import { radios } from '@storybook/addon-knobs';
import React, { useState } from 'react';
import { Button, Header, Modal, Tab, Table, Input, Form, Grid, Image, Select, TextArea, Dropdown, Segment } from 'semantic-ui-react';
import { useTranslation } from 'react-i18next';
import './../../../assets/style/index.scss'
import { options, types } from '@hapi/joi';
import { BkpIndex, HouseStructureIndex } from '@cudo/mf-account-app-lib';
export interface IHouse {
  option
  value
  onChange
}
export interface ModalCostProps {
  house?: IHouse
}
type Iitem = {
  index?: number
  bkp?: string;
  description?: string;
  files?: string[];
  itemQuantity?: number;
  itemPrice?: number;
}
export function ModalCost(props: ModalCostProps) {
  const { t } = useTranslation();
  const [open, setOpen] = React.useState(false)
  const [items, setItems] = React.useState<Iitem[]>([])
  const handleChange = (event, index) => {
    console.log(event.target, index);
    const values = [...items];
    const itemValue = values[index];
    itemValue[event.target.name] = event.target.value;
    values[index] = itemValue;
    setItems(values);
  }
  function CostItem() {
    return items.map((item, index) =>
      <Table.Row>
        <Table.Cell>
          <Form>
            <Grid columns={1}>
              <Grid.Row>
                <Grid.Column>
                  <Form.Field>
                    <span> <img src='/assets/images/dots.png' alt='' />  </span>
                  </Form.Field>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Form>
        </Table.Cell>
        <Table.Cell>
          <Form>
            <Grid columns={1}>
              <Grid.Row>
                <Grid.Column>
                  <Form.Field>
                    {index + 1 || 0}
                  </Form.Field>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Form>
        </Table.Cell>
        <Table.Cell>
          <Form>
            <Grid columns={1}>
              <Grid.Row>
                <Grid.Column>
                  <Form.Field>
                    <BkpIndex bkp={item.bkp || ''} parentBKPSelect={e => handleChange(e, index)} ></BkpIndex>
                    {/* <Input name="bkp" size='small' className="full-width" style={{ width: '130px' }} onChange={e => handleChange(e, index)} value={item.bkp || ''} /> */}
                  </Form.Field>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Form>
        </Table.Cell>
        <Table.Cell>
          <Form>
            <Grid columns={1}>
              <Grid.Row>
                <Grid.Column>
                  <Form.Field>
                    <Input name='description' size='small' className="full-width" style={{ width: '130px' }} onChange={e => handleChange(e, index)} value={item.description || ''} />
                  </Form.Field>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Form>
        </Table.Cell>
        <Table.Cell>
          <Form>
            <Grid columns={1}>
              <Grid.Row>
                <Grid.Column>
                  <Form.Field>
                    <span className="navi-text">  <i className="ms-Icon ms-Icon--Attach" aria-hidden="true"></i> <button className="ui mini button grey-btn" >2</button> </span>
                  </Form.Field>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Form>
        </Table.Cell>
        <Table.Cell>
          <Form>
            <Grid columns={1}>
              <Grid.Row>
                <Grid.Column>
                  <Form.Field>
                    <Input name='itemQuantity' type='number' size='small' className="full-width" style={{ width: '130px' }} onChange={e => handleChange(e, index)} value={item.itemQuantity || 0} />
                  </Form.Field>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Form>
        </Table.Cell>
        <Table.Cell>
          <Form>
            <Grid columns={1}>
              <Grid.Row>
                <Grid.Column>
                  <Form.Field>
                    <Input type='number' name='itemPrice' size='small' className="full-width" style={{ width: '130px' }} onChange={e => handleChange(e, index)} value={item.itemPrice || 0} />
                  </Form.Field>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Form>
        </Table.Cell>
        <Table.Cell>
          <Form>
            <Grid columns={1}>
              <Grid.Row>
                <Grid.Column>
                  <Form.Field>
                    <a href="#" onClick={() => removeItem(index)} >X</a>
                  </Form.Field>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Form>
        </Table.Cell>
      </Table.Row>
    )
  }
  function addItem() {
    setItems([...items, {
    } as Iitem])
  }
  function removeItem(index) {
    const values = [...items];
    values.splice(index, 1);
    setItems(values);
  }
  return (
    <div id="navbar">
      <Modal className="modal_media" style={{ height: '660px' }}
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        trigger={<Button size='mini' className="grey-btn">+ {t('add_cost.add_new')} </Button>}
      >
        <Modal.Header><h3>{t('add_cost.add_new_item')} </h3></Modal.Header>
        <Modal.Content body>
          <div>
            <Form>
              <Grid columns={2}>
                <Grid.Row className="content">
                  <Grid.Column >
                    <Form.Field>
                      <div>
                        <p className="paragraph">{t('add_cost.select_house')} <span className="sessiontext">(This house will contain all the BKP)</span></p>
                      </div>
                    </Form.Field>
                  </Grid.Column>
                  <Grid.Column>
                    <HouseStructureIndex></HouseStructureIndex>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Form>
            <div>
              <Header className="header" >Items</Header>
            </div>
            <Table>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell></Table.HeaderCell>
                  <Table.HeaderCell># </Table.HeaderCell>
                  <Table.HeaderCell>BKP</Table.HeaderCell>
                  <Table.HeaderCell>Description</Table.HeaderCell>
                  <Table.HeaderCell>Files</Table.HeaderCell>
                  <Table.HeaderCell>Item quality</Table.HeaderCell>
                  <Table.HeaderCell>Item price</Table.HeaderCell>
                  <Table.HeaderCell></Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {CostItem()}
                <Table.Row>
                  <Table.Cell>
                    <a href="#" onClick={() => addItem()}>+ Add more </a>
                  </Table.Cell>
                  <Table.Cell></Table.Cell>
                  <Table.Cell>

                  </Table.Cell>

                  <Table.Cell></Table.Cell>

                  <Table.Cell></Table.Cell>

                  <Table.Cell></Table.Cell>

                  <Table.Cell></Table.Cell>

                  <Table.Cell></Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
          </div>
        </Modal.Content>
        <Modal.Actions>
          <Button
            content="Submit"
            onClick={() => setOpen(false)}
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

export default ModalCost
