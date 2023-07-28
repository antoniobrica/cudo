import { radios } from '@storybook/addon-knobs';
import React, { useState } from 'react';
import { Button, Header, Modal, Tab, Table, Input, Form, Grid, Image, Select, TextArea, Dropdown, Segment, Label, Icon } from 'semantic-ui-react';
import { useTranslation } from 'react-i18next';
import './../../../assets/style/index.scss'
import { options, types } from '@hapi/joi';
import { BkpsIndex, HouseStructureIndex } from '@cudo/mf-account-app-lib';
import { FileUpload } from '@cudo/mf-document-lib';
import { MS_SERVICE_URL } from '@cudo/mf-core';
export interface IHouse {
  option
  value
  onChange
}
export interface ModalCostProps {
  house?: IHouse,
  createCost?
  openCost?
  cancel?
}
type Iitem = {
  index?: number
  BKPTitle?: string,
  BKPID: string,
  description?: string;
  files?: string[];
  itemQuantity?: number;
  itemPrice?: number;
  uploadedFileID?: string;
  uploadedFileTitle?: string;
}
export function ModalCost(props: ModalCostProps) {
  const { t } = useTranslation();
  const [open, setOpen] = React.useState(false)
  const [idx, setIdx] = React.useState(0)

  const [openFile, setOpenFile] = React.useState(false)
  const [files, setFileList] = React.useState<any>([]);
  const [items, setItems] = React.useState<Iitem[]>([])
  React.useEffect(() => {
    if (props.openCost) {
      setOpen(true);
    }
  }, [props.openCost])

  React.useEffect(() => {
    setItems([...items, {
    } as Iitem])
  }, [])

  const cancel = () => {
    setOpen(false)
    props.cancel(false)
  }
  const handleChange = (event, index) => {
    if (event.target == undefined) {
      console.log('e', event)
      const values = [...items];
      const itemValue = values[index];
      console.log('itemValue', itemValue)
      itemValue['BKPTitle'] = event.BKPIDTitle;
      itemValue['BKPID'] = event.BKPID;
      values[index] = itemValue;
      setItems(values);
    }
    else {
      const values = [...items];
      const itemValue = values[index];
      itemValue[event.target.name] = event.target.value;
      values[index] = itemValue;
      setItems(values);
    }

  }
  const uploadFile = (index) => {
    setIdx(index)
    setOpenFile(true)
  }
  const close = () => {
    setOpenFile(false)
  }
  const confirm = (data) => {
    console.log('files-cost', data);
    const values = [...items];
    const itemValue = values[idx];
    itemValue['uploadedFileID'] = data.fileTitle;
    itemValue['uploadedFileTitle'] = data.fileURL;
    values[idx] = itemValue;
    setItems(values);
    setFileList(data)
    setOpenFile(false)

  }
  const createCost = () => {
    console.log('cost-items==>', items);
    props.createCost(items)
    // setOpen(false);
    cancel();
  }
  function CostItem() {
    return items.map((item, index) =>
      <Table.Row>
        <Table.Cell className="row-icon">
          <span> <img src={`${MS_SERVICE_URL['ASSETS_CDN_URL'].url}/assets/images/dots.png`} alt='' />  </span>
        </Table.Cell>
        <Table.Cell collapsing className="row-number">
          {index + 1 || 0}
        </Table.Cell>
        <Table.Cell className="cost-bkp-field">
          <BkpsIndex bkp={''} parentBKPSelect={e => handleChange(e, index)} ></BkpsIndex>
        </Table.Cell>
        <Table.Cell>
          <Input name='description' size='small' className="full-width" onChange={e => handleChange(e, index)} value={item.description || ''} />
        </Table.Cell>
        <Table.Cell collapsing className="cost-files">
          <span onClick={() => uploadFile(index)} className="navi-text">  <i className="ms-Icon ms-Icon--Attach" aria-hidden="true"></i> <Label horizontal>{files.length}</Label>  </span>
        </Table.Cell>
        <Table.Cell className="width100">
          <Input name='itemQuantity' type='number' size='small' className="full-width" onChange={e => handleChange(e, index)} value={item.itemQuantity || 0} />
        </Table.Cell>
        <Table.Cell className="width100">
          <Input type='number' name='itemPrice' size='small' className="full-width" onChange={e => handleChange(e, index)} value={item.itemPrice || 0} />
        </Table.Cell>
        <Table.Cell collapsing>
          <a onClick={() => removeItem(index)} >X</a>
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
    <div style={{ marginLeft: 920 }}>
      {openFile ?
        <FileUpload openSettingF={openFile} close={close} confirm={confirm} /> : null
      }
      <Modal className="modal_media add-new-work  right-side--fixed-modal add-new-cost-modal"
        closeIcon
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
      // trigger={<Button size='mini' className="grey-btn">+ {t('add_cost.add_new')} </Button>}
      closeOnDimmerClick={false}
      >
        <Modal.Header><h3>{t('project_tab_menu.cost.add_new_item')} </h3></Modal.Header>
        <Modal.Content body>
          <div>
            <Modal.Header className="cost-modal-header">
              <h3 className="">{t('project_tab_menu.cost.select_house')} <span>({t('project_tab_menu.cost.this_house_contain')})</span></h3>
              <HouseStructureIndex></HouseStructureIndex>
            </Modal.Header>
            {/* <Form>
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
            </Form> */}
            <div className="cost-modal-content">
              <Header className="header" >{t('project_tab_menu.cost.items')}</Header>

              <Table>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell></Table.HeaderCell>
                    <Table.HeaderCell># </Table.HeaderCell>
                    <Table.HeaderCell width={4}>{t('common.bkp')}</Table.HeaderCell>
                    <Table.HeaderCell width={6}>{t('common.desc')}</Table.HeaderCell>
                    <Table.HeaderCell>Files</Table.HeaderCell>
                    <Table.HeaderCell width={1}>{t('project_tab_menu.cost.item_quality')}</Table.HeaderCell>
                    <Table.HeaderCell width={1}>{t('project_tab_menu.cost.item_price')}</Table.HeaderCell>
                    <Table.HeaderCell></Table.HeaderCell>
                  </Table.Row>
                </Table.Header>

                <Table.Body>
                  {CostItem()}
                </Table.Body>
              </Table>

              <div className="add-more-cost"><a onClick={() => addItem()}><Icon name='add' /> {t("common.add_more")} </a></div>
            </div>
          </div>
        </Modal.Content>
        <Modal.Actions>
          <Button
            content={t("common.submit")}
            onClick={createCost}
            positive
            size='small' className="primary"
          />
          <Button size='small' className="icon-border" onClick={cancel}>
            X  {t("common.cancel")}
          </Button>
        </Modal.Actions>
      </Modal>
    </div>

  )
}

export default ModalCost
