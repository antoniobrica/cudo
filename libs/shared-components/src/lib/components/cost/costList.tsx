import React from 'react';

import './../../../assets/style/index.scss'
import { Tab, Image, Input, Accordion, Form, Grid, Card, Dropdown, Icon, Table, Label } from 'semantic-ui-react';
import { NONAME } from 'dns';
import { MS_SERVICE_URL } from '@cudo/mf-core';


/* eslint-disable-next-line */
export interface CostListProps {
  addNew?,
  costs?,
  delete?
  updateBkpCost?
}


export function CostList(props: CostListProps) {
  const [editC, setEditC] = React.useState(false)
  const [expandBkpF, setExpandBkpF] = React.useState(false)
  const [expandFirstLayer, setExpandFirstLayer] = React.useState(false)

  const [isBkpEdited, setIsBkpEdited] = React.useState(false)
  const [estimateCost, setEstimateCost] = React.useState('5,000.00')
  const [showBkp, setexpandBkp] = React.useState(false)
  const [editBkpData, setEditBkpData] = React.useState(null);
  const [editBkpT, setEditBkpT] = React.useState(null);
  const [editBkpD, setEditBkpD] = React.useState(null);
  const [editBkpIq, setEditBkpIq] = React.useState(null);
  const [editBkpIp, setEditBkpIp] = React.useState(null);

  const addNew = () => {
    console.log('add new');
    props.addNew()

  }
  const onEstimateCost = (e) => {
    setEstimateCost(e.target.value)
  }
  const editCost = () => {
    setEditC(!editC);
  }
  const expandBkp = () => {
    setexpandBkp(!showBkp)
  }

  const deleteCost = (data) => {
    console.log('deleteCost', data)
    props.delete(data)
  }
  const editBkp = (data) => {
    console.log('edit', data);
    setEditBkpData(data);
    setEditBkpT(data.BKPTitle);
    setEditBkpD(data.description);
    setEditBkpIq(data.itemQuantity);
    setEditBkpIp(data.itemPrice);
    setIsBkpEdited(true)
  }
  const rootPanels = [
    { key: 'panel-1', title: 'Jack W. Elementary School', content: { content: <a href=''>+ Add item</a> }, },
    { key: 'panel-2', title: 'Freehold Two Solar LLC', content: { content: <a href=''>+ Add item</a> } },
  ]
  const editBkpTitle = (d) => {
    console.log('editted bkp', d)
    const data = {
      BKPID: d.BKPID,
      bkpCostID: d.bkpCostID,
      BKPTitle: editBkpT,
      description: editBkpD,
      itemPrice: Number(editBkpIp),
      itemQuantity: Number(editBkpIq)
    }

    setIsBkpEdited(false)

    props.updateBkpCost(data)
  }
  const cancelEdit = () => {
    setIsBkpEdited(false)
  }
  const handleBkpDescription = (e) => {
    setEditBkpD(e.target.value)
  }

  const handleBkpQuantity = (e) => {
    setEditBkpIq(e.target.value)
  }

  const handleBkpPrice = (e) => {
    setEditBkpIp(e.target.value)
  }
  const handleBkpTitle = (e) => {
    setEditBkpT(e.target.value)
  }

  return (
    <div>

      {/* 
      <div className="cost-management-con">
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
                  <img src={`${MS_SERVICE_URL['ASSETS_CDN_URL'].url}/assets/images/money.png`}></img>  <label style={{ marginLeft: '10px' }}>Estimated Cost</label>
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
 */}



      <div className="main-content-con cost-management-con">
        <div className="heading-con">
          <h3 className="alltask">Cost Management <span>Please manage the cost for Electrical Work</span></h3>
          <span className="action-dropdown">
            <Dropdown text='...' pointing="right">
              <Dropdown.Menu>
                <Dropdown.Item icon='print' text='Print' />
                <Dropdown.Item icon='download' text='Download' />
              </Dropdown.Menu>
            </Dropdown>
          </span>
        </div>

        <div className="eastimated-cost-con">
          <h3><Icon name="currency" /> Estimated Cost</h3>
          <div className="estimated-price-box">
            {editC == false ?
              <div className="estimated-price-total">
                ${estimateCost}

                <Icon onClick={editCost} className="edit" />
              </div>
              :
              <div className="edit-estimated-price" >
                <Form.Field className="fillarea">
                  <Input placeholder='Enter your text here....' size='small' className="full-width "
                    type="text"
                    value={estimateCost}
                    onChange={onEstimateCost}
                  />
                </Form.Field>
                <Form.Field className="d-flex">
                  <button className="greenbutton anchor_complete" onClick={editCost}>
                    <i className="ms-Icon ms-Icon--CheckMark" aria-hidden="true"></i>
                  </button> &nbsp;  <button className="redbutton anchor_complete" onClick={editCost}>
                    <i className="ms-Icon ms-Icon--ChromeClose" aria-hidden="true"></i>
                  </button>
                </Form.Field>
              </div>

            }




          </div>
        </div>

        <div className="treeview-main-con">
          <h4 className="d-flex justify-space-between">Items
            <div className="add-new-block">
              <div className="add-new-link" onClick={addNew}>
                <span><Icon name="plus"></Icon> Add new</span>
              </div>
            </div>
          </h4>
          <div className="treeview-inner-con">
            <ul>
              <li>
                <div className="treeview__level show" data-level="A">
                  <Icon name="add" className="show-view" onClick={() => setExpandFirstLayer(!expandFirstLayer)} />
                  {expandFirstLayer && <Icon name="minus" className="hide-view" onClick={() => setExpandFirstLayer(!expandFirstLayer)} />}
                  <span className="level-title cost-item-parent"><Icon name="list" /> Jack W. Elementary School <span className="item-total-price">Total price: $1500.00</span></span>
                </div>
                {expandFirstLayer && <ul>
                  <li>
                    <div className="treeview__level show" data-level="B">
                      <Icon name="add" className="show-view" onClick={() => setExpandBkpF(!expandBkpF)} />
                      {expandBkpF && <Icon name="minus" className="hide-view" onClick={() => setExpandBkpF(!expandBkpF)} />}
                      <span className="level-title"><Icon name="level up alternate" className="rotate-level-icon" /> 0 - Grundstück</span>
                    </div>
                    {expandBkpF && <ul>
                      <li>
                        <div className="treeview__level show" data-level="B">
                          {showBkp ?
                            <Icon name="minus" className="hide-view" onClick={expandBkp} />
                            :
                            <Icon name="add" className="show-view" onClick={expandBkp} />}
                          <span className="level-title"><Icon name="level up alternate" className="rotate-level-icon" /> 00 - VerzeichnisGrundstückVorstudien <span className="tv-bkp-total">( { } BKP )</span></span>
                          {showBkp ?
                            <div className="treeview-cost-table">
                              <Table>
                                <Table.Header>
                                  <Table.Row>
                                    <Table.HeaderCell >&nbsp;</Table.HeaderCell>
                                    <Table.HeaderCell >#</Table.HeaderCell>
                                    <Table.HeaderCell width='five'>BKP</Table.HeaderCell>
                                    <Table.HeaderCell width='six'>Description</Table.HeaderCell>
                                    <Table.HeaderCell >Files</Table.HeaderCell>
                                    <Table.HeaderCell>Item Quantity</Table.HeaderCell>
                                    <Table.HeaderCell>Item Price</Table.HeaderCell>
                                    <Table.HeaderCell>&nbsp;</Table.HeaderCell>
                                  </Table.Row>
                                </Table.Header>

                                <Table.Body>
                                  {props.costs.map((cost, id) => {
                                    return (
                                      isBkpEdited && (cost?.BKPCosts[0]?.bkpCostID === editBkpData?.bkpCostID) ?
                                        <Table.Row>
                                          <Table.Cell><img src={`${MS_SERVICE_URL['ASSETS_CDN_URL'].url}/assets/images/dots.png`} alt='' /></Table.Cell>
                                          <Table.Cell>{cost?.BKPCosts[0]?.BKPID}</Table.Cell>
                                          <Table.Cell>
                                            <div className="edit-estimated-price" >
                                              <Form.Field className="fillarea">
                                                <Input placeholder='Enter your text here....' size='small' className="full-width "
                                                  type="text"
                                                  value={editBkpT}
                                                  onChange={handleBkpTitle}
                                                />
                                              </Form.Field>
                                            </div>
                                          </Table.Cell>
                                          <Table.Cell>
                                            <div className="edit-estimated-price" >
                                              <Form.Field className="fillarea">
                                                <Input placeholder='Enter your text here....' size='small' className="full-width "
                                                  type="text"
                                                  value={editBkpD}
                                                  onChange={handleBkpDescription}
                                                />
                                              </Form.Field>
                                            </div>
                                          </Table.Cell>
                                          <Table.Cell className="file-attached"><i className="ms-Icon ms-Icon--Attach" aria-hidden="true"></i> <Label horizontal> 2</Label></Table.Cell>

                                          <Table.Cell>
                                            <div className="edit-estimated-price" >
                                              <Form.Field className="fillarea">
                                                <Input placeholder='Enter your text here....' size='small' className="full-width "
                                                  type="text"
                                                  value={editBkpIq}
                                                  onChange={handleBkpQuantity}
                                                />
                                              </Form.Field>
                                            </div>
                                          </Table.Cell>
                                          <Table.Cell>
                                            <div className="edit-estimated-price" >
                                              <Form.Field className="fillarea">
                                                <Input placeholder='Enter your text here....' size='small' className="full-width "
                                                  type="text"
                                                  value={editBkpIp}
                                                  onChange={handleBkpPrice}
                                                />
                                              </Form.Field>
                                            </div>

                                          </Table.Cell>
                                          <Table.Cell>
                                            <div className="edit-estimated-price" >
                                              <Form.Field className="d-flex">
                                                <button className="greenbutton anchor_complete" onClick={() => editBkpTitle(cost?.BKPCosts[0])}>
                                                  <i className="ms-Icon ms-Icon--CheckMark" aria-hidden="true"></i>
                                                </button> &nbsp;  <button className="redbutton anchor_complete" onClick={cancelEdit}>
                                                  <i className="ms-Icon ms-Icon--ChromeClose" aria-hidden="true"></i>
                                                </button>
                                              </Form.Field>
                                            </div>
                                          </Table.Cell>
                                        </Table.Row>
                                        :
                                        <Table.Row>
                                          <Table.Cell><img src={`${MS_SERVICE_URL['ASSETS_CDN_URL'].url}/assets/images/dots.png`} alt='' /></Table.Cell>
                                          <Table.Cell>{cost?.BKPCosts[0]?.BKPID}</Table.Cell>
                                          <Table.Cell>{cost?.BKPCosts[0]?.BKPTitle}</Table.Cell>
                                          <Table.Cell>{cost?.BKPCosts[0]?.description}</Table.Cell>
                                          <Table.Cell className="file-attached"><i className="ms-Icon ms-Icon--Attach" aria-hidden="true"></i> <Label horizontal>{cost?.BKPCosts[0]?.bkpCostFiles?.length}</Label></Table.Cell>
                                          <Table.Cell>{cost.BKPCosts[0].itemQuantity}</Table.Cell>
                                          <Table.Cell>${cost.BKPCosts[0].itemPrice}</Table.Cell>
                                          <Table.Cell>
                                            <Dropdown icon='ellipsis horizontal' pointing='right'>
                                              <Dropdown.Menu className="dropdowncomplete">
                                                <Dropdown.Item icon='pencil' text='Edit' onClick={() => editBkp(cost.BKPCosts[0])} />
                                                <Dropdown.Item icon='trash alternate outline' text='Delete' onClick={() => deleteCost(cost.costID)} />
                                              </Dropdown.Menu>
                                            </Dropdown>
                                          </Table.Cell>
                                        </Table.Row>

                                    )
                                  })}

                                </Table.Body>

                                <Table.Footer>
                                  <Table.Row>
                                    <Table.HeaderCell colspan="5">Total</Table.HeaderCell>
                                    <Table.HeaderCell>5</Table.HeaderCell>
                                    <Table.HeaderCell colspan="2">$5,000.00</Table.HeaderCell>
                                  </Table.Row>
                                </Table.Footer>
                              </Table>
                            </div>
                            :
                            null}
                        </div>

                        <div className="add-new-block">
                          <div className="add-new-link" onClick={addNew}>
                            <span><Icon name="plus"></Icon> Add new</span>
                          </div>
                        </div>


                      </li>

                      <li>
                        <div className="treeview__level show" data-level="B">
                          <Icon name="add" className="show-view" style={{ display: 'none' }} />
                          <Icon name="minus" className="hide-view" />
                          <span className="level-title"><Icon name="level up alternate" className="rotate-level-icon" /> 00 - test bkp2 <span className="tv-bkp-total">( 2 BKP )</span></span>
                        </div>
                      </li>
                    </ul>
                    }
                  </li>

                  <li>
                    <div className="treeview__level" data-level="B">
                      <Icon name="add" className="show-view" style={{ display: 'none' }} />
                      <Icon name="minus" className="hide-view" />
                      <span className="level-title"><Icon name="level up alternate" className="rotate-level-icon" /> 2 - Test data</span>
                    </div>
                    <ul>
                      <li>
                        <div className="treeview__level" data-level="B">
                          <Icon name="add" className="show-view" style={{ display: 'none' }} />
                          <Icon name="minus" className="hide-view" />
                          <span className="level-title"><Icon name="level up alternate" className="rotate-level-icon" /> 01 - Test bkp <span className="tv-bkp-total">( 2 BKP )</span></span>
                        </div>
                      </li>
                    </ul>
                  </li>

                </ul>
                }
                {/* </li>
            </ul> */}


                <div className="total-price-gst">
                  <div className="add-new-item-btn">
                    {/* <button className="ui small button"><i className="ms-Icon ms-Icon--AddTo" aria-hidden="true"></i> Add new</button> */}
                  </div>

                  <div className="sub-total-item">
                    <p>Sub Total <span>$00.00</span></p>
                    <p>GST 10% <span>$00.00</span></p>
                    <p>Total <span>$00.00</span></p>
                  </div>
                </div>

                <div className="add-files-area">
                  <h3>Add files for complete cost</h3>
                  <Form.Field>
                    <div className="dashed_area">
                      <div className="file-upload-message">
                        {/* <Image src={img} className="mr-10 " /> */}
                        <p className="file-upload-default-message">Drag & drop or click here to upload file</p>

                      </div>
                      <Input type="file" className="file-upload-input" />
                    </div>

                  </Form.Field>
                </div>
              </li>
            </ul>
          </div>

        </div>
      </div>
    </div>
  );
}

export default CostList;
