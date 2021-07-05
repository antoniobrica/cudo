import React from 'react';

import './../../../assets/style/index.scss'
import { Tab, Image, Input, Accordion, Form, Grid, Card, Dropdown, Icon, Table, Label } from 'semantic-ui-react';
import { NONAME } from 'dns';
// import img from '../../../assets/images/upload.png';


/* eslint-disable-next-line */
export interface CostListProps { }


export function CostList(props: CostListProps) {
  const rootPanels = [
    { key: 'panel-1', title: 'Jack W. Elementary School', content: { content: <a href=''>+ Add item</a> }, },
    { key: 'panel-2', title: 'Freehold Two Solar LLC', content: { content: <a href=''>+ Add item</a> } },
  ]
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
                  <img src='/assets/images/money.png'></img>  <label style={{ marginLeft: '10px' }}>Estimated Cost</label>
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
          <div className="estimated-price-total">
            $5,0000.00
            <Icon className="edit" />
          </div>

          <div className="edit-estimated-price" style={{ display: 'none' }}>
            <Form.Field className="fillarea">
              <Input placeholder='Enter your text here....' size='small' className="full-width "
                type="text"
                // value={subtaskTitle}
                // onChange={onSubtaskTitle}
              />
            </Form.Field>
            <Form.Field className="d-flex">
              <button className="greenbutton anchor_complete">
                <i className="ms-Icon ms-Icon--CheckMark" aria-hidden="true"></i>
              </button> &nbsp;  <button className="redbutton anchor_complete">
                <i className="ms-Icon ms-Icon--ChromeClose" aria-hidden="true"></i> 
              </button>
            </Form.Field>
          </div>
          
        </div>
      </div>

      <div className="treeview-main-con">
        <h4 className="d-flex justify-space-between">Items
          <div className="add-new-block">
            <div className="add-new-link"> 
              <span><Icon name="plus"></Icon> Add new</span>
            </div>
          </div>
        </h4>
        <div className="treeview-inner-con">
          <ul>
            <li>
              <div className="treeview__level show" data-level="A">
                <Icon name="add" className="show-view" style={{display: 'none'}} />
                <Icon name="minus" className="hide-view" />
                <span className="level-title cost-item-parent"><Icon name="list" /> Jack W. Elementary School <span className="item-total-price">Total price: $1500.00</span></span>
              </div>
              <ul>
                <li>
                  <div className="treeview__level show" data-level="B">
                    <Icon name="add" className="show-view" style={{display: 'none'}} />
                    <Icon name="minus" className="hide-view" />
                    <span className="level-title"><Icon name="level up alternate" className="rotate-level-icon" /> 0 - Grundstück</span>
                  </div>
                  <ul>
                    <li>
                      <div className="treeview__level show" data-level="B">
                        <Icon name="add" className="show-view" style={{display: 'none'}} />
                        <Icon name="minus" className="hide-view" />
                        <span className="level-title"><Icon name="level up alternate" className="rotate-level-icon" /> 00 - VerzeichnisGrundstückVorstudien <span className="tv-bkp-total">( 2 BKP )</span></span>
                        <div className="treeview-cost-table">
                          <Table>
                            <Table.Header>
                              <Table.Row>
                                <Table.HeaderCell >&nbsp;</Table.HeaderCell>
                                <Table.HeaderCell >#</Table.HeaderCell>
                                <Table.HeaderCell  width='five'>BKP</Table.HeaderCell>
                                <Table.HeaderCell  width='seven'>Description</Table.HeaderCell>
                                <Table.HeaderCell >Files</Table.HeaderCell>
                                <Table.HeaderCell>Item Quantity</Table.HeaderCell>
                                <Table.HeaderCell>Item Price</Table.HeaderCell>
                                <Table.HeaderCell>&nbsp;</Table.HeaderCell>
                              </Table.Row>
                            </Table.Header>

                            <Table.Body>
                              <Table.Row>
                                <Table.Cell><img src='/assets/images/dots.png' alt='' /></Table.Cell>
                                <Table.Cell>1</Table.Cell>
                                <Table.Cell>001 - VerzeichnisGrundstückVorstudien</Table.Cell>
                                <Table.Cell>This is the description here</Table.Cell>
                                <Table.Cell className="file-attached"><i className="ms-Icon ms-Icon--Attach" aria-hidden="true"></i> <Label horizontal>2</Label></Table.Cell>
                                <Table.Cell>5</Table.Cell>
                                <Table.Cell>$5000.00</Table.Cell>
                                <Table.Cell>
                                <Dropdown icon='ellipsis horizontal' pointing='right'>
                                  <Dropdown.Menu className="dropdowncomplete">
                                    <Dropdown.Item icon='pencil' text='Edit' />
                                    <Dropdown.Item icon='trash alternate outline' text='Delete' />
                                  </Dropdown.Menu>
                                </Dropdown>
                                </Table.Cell>
                              </Table.Row>
                              <Table.Row>
                                <Table.Cell><img src='/assets/images/dots.png' alt='' /></Table.Cell>
                                <Table.Cell>1</Table.Cell>
                                <Table.Cell>001 - VerzeichnisGrundstückVorstudien</Table.Cell>
                                <Table.Cell>This is the description here</Table.Cell>
                                <Table.Cell className="file-attached"><i className="ms-Icon ms-Icon--Attach" aria-hidden="true"></i> <Label horizontal>2</Label></Table.Cell>
                                <Table.Cell>5</Table.Cell>
                                <Table.Cell>$5000.00</Table.Cell>
                                <Table.Cell>
                                <Dropdown icon='ellipsis horizontal' pointing='right'>
                                  <Dropdown.Menu className="dropdowncomplete">
                                    <Dropdown.Item icon='pencil' text='Edit' />
                                    <Dropdown.Item icon='trash alternate outline' text='Delete' />
                                  </Dropdown.Menu>
                                </Dropdown>
                                </Table.Cell>
                              </Table.Row>
                            </Table.Body>

                            <Table.Footer>
                              <Table.Row>
                                <Table.HeaderCell colspan="5">Total</Table.HeaderCell>
                                <Table.HeaderCell>5</Table.HeaderCell>
                                <Table.HeaderCell colspan="2">$5000.00</Table.HeaderCell>
                              </Table.Row>
                            </Table.Footer>
                          </Table>
                        </div>
                      </div>
                      <div className="add-new-block">
                        <div className="add-new-link"> 
                          <span><Icon name="plus"></Icon> Add new</span>
                        </div>
                      </div>
                    </li>

                    <li>
                      <div className="treeview__level show" data-level="B">
                        <Icon name="add" className="show-view" style={{display: 'none'}} />
                        <Icon name="minus" className="hide-view" />
                        <span className="level-title"><Icon name="level up alternate" className="rotate-level-icon" /> 00 - VerzeichnisGrundstückVorstudien <span className="tv-bkp-total">( 2 BKP )</span></span>
                      </div>
                    </li>
                  </ul>
                </li>

                <li>
                  <div className="treeview__level" data-level="B">
                      <Icon name="add" className="show-view" style={{display: 'none'}} />
                      <Icon name="minus" className="hide-view" />
                    <span className="level-title"><Icon name="level up alternate" className="rotate-level-icon" /> 1 - Grundstück</span>
                  </div>
                  <ul>
                    <li>
                      <div className="treeview__level" data-level="B">
                        <Icon name="add" className="show-view" style={{display: 'none'}} />
                        <Icon name="minus" className="hide-view" />
                        <span className="level-title"><Icon name="level up alternate" className="rotate-level-icon" /> 01 - VerzeichnisGrundstückVorstudien <span className="tv-bkp-total">( 2 BKP )</span></span>
                      </div>
                    </li>
                  </ul>
                </li>

              </ul>
            </li>
          </ul>
        </div>
      </div>

      <div className="total-price-gst">
        <div className="add-new-item-btn">
          <button className="ui small button"><i className="ms-Icon ms-Icon--AddTo" aria-hidden="true"></i> Add new</button>
        </div>

        <div className="sub-total-item">
          <p>Sub Total <span>$3500.00</span></p>
          <p>GST 10% <span>$300.00</span></p>
          <p>Total <span>$3800.00</span></p>
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
            <Input type="file" className="file-upload-input"   />
          </div>

        </Form.Field>
      </div>
    </div>


    </div>
  );
}

export default CostList;
