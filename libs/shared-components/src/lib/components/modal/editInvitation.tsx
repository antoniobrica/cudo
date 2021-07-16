import { MS_SERVICE_URL } from '@cudo/mf-core';
import React from 'react';
import {
  Button,
  Checkbox,
  Modal,
  Input,
  Form,
  Grid,
  Dropdown,
  TextArea,
} from 'semantic-ui-react';
// import SampleModal from './sample-modal';
function ModalEditInvitation() {
  const countryOptions = [
    { key: 'af', value: 'af', text: 'Afghanistan' },
    { key: 'ax', value: 'ax', text: 'Aland Islands' },
  ];

  const [open, setOpen] = React.useState(false);

  return (
    <div id="navbar">
      <Modal
        className="modal_media"
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        trigger={
          <Button size="mini" className="grey-btn">
            Edit Invitation
          </Button>
        }
      >
        <Modal.Header>
          <h3>Edit Invitation </h3>
        </Modal.Header>
        <Modal.Content body>
          <div>
            <Form>
              <Grid columns={1}>
                <Grid.Row>
                  <Grid.Column>
                    <Form.Field>
                      <label>
                        Title <span className="danger">*</span>
                      </label>
                      <Input
                        placeholder="Team onboarding"
                        size="small"
                        className="full-width"
                        type="text"
                      />
                    </Form.Field>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
              <Grid columns={3}>
                <Grid.Row>
                  <Grid.Column>
                    <Form.Field>
                      <label>Date </label>
                      <Input
                        placeholder="Default"
                        size="small"
                        className="full-width"
                        type="date"
                      />
                    </Form.Field>
                  </Grid.Column>
                  <Grid.Column>
                    <Form.Field>
                      <label>Start time </label>
                      <Input
                        placeholder="Default"
                        size="small"
                        className="full-width"
                        type="time"
                      />
                    </Form.Field>
                  </Grid.Column>
                  <Grid.Column>
                    <Form.Field>
                      <label>End time </label>
                      <Input
                        placeholder="Default"
                        size="small"
                        className="full-width"
                        type="time"
                      />
                    </Form.Field>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
              <Grid columns={1}>
                <Grid.Row>
                  <Grid.Column>
                    <Form.Field>
                      <label>Members</label>

                      <Dropdown
                        className="small_drop"
                        clearable
                        fluid
                        multiple
                        search
                        selection
                        options={countryOptions}
                        placeholder="Select Country"
                      />
                    </Form.Field>
                  </Grid.Column>
                </Grid.Row>
              </Grid>

              <Grid columns={5}>
                <Grid.Row>
                  <Grid.Column>
                    <Form.Field>
                      <div className="below_area">
                        <img src={`${MS_SERVICE_URL['ASSETS_CDN_URL'].url}/assets/images/avatar_1.png`} className="avatar" />
                        <span className="span_name">Barthelemy Chalvet</span>
                        <i
                          className="ms-Icon ms-Icon--CalculatorMultiply right_float"
                          aria-hidden="true"
                        ></i>
                      </div>
                    </Form.Field>
                  </Grid.Column>

                  <Grid.Column>
                    <Form.Field>
                      <div className="below_area">
                        <img src={`${MS_SERVICE_URL['ASSETS_CDN_URL'].url}/assets/images/avatar_2.png`} className="avatar" />
                        <span className="span_name">Barthelemy Chalvet</span>
                        <i
                          className="ms-Icon ms-Icon--CalculatorMultiply right_float"
                          aria-hidden="true"
                        ></i>
                      </div>
                    </Form.Field>
                  </Grid.Column>
                  <Grid.Column>
                    <Form.Field>
                      <div className="below_area">
                        <img src={`${MS_SERVICE_URL['ASSETS_CDN_URL'].url}/assets/images/avatar_3.png`} className="avatar" />
                        <span className="span_name">Barthelemy Chalvet</span>
                        <i
                          className="ms-Icon ms-Icon--CalculatorMultiply right_float"
                          aria-hidden="true"
                        ></i>
                      </div>
                    </Form.Field>
                  </Grid.Column>
                </Grid.Row>
              </Grid>

              <Grid columns={1}>
                <Grid.Row>
                  <Grid.Column>
                    <Form.Field>
                      <label>Invite Guests</label>

                      <Dropdown
                        className="small_drop"
                        clearable
                        fluid
                        multiple
                        search
                        selection
                        options={countryOptions}
                        placeholder="Select Country"
                      />
                    </Form.Field>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
              <Grid columns={1}>
                <Grid.Row>
                  <Grid.Column>
                    <Form.Field>
                      <label>Description</label>

                      <TextArea placeholder="Tell us more" />
                    </Form.Field>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
              <Grid columns={1}>
                <Grid.Row>
                  <Grid.Column>
                    <Form.Field>
                      <label> Files</label>
                      <Grid columns={5}>
                        <Grid.Row>
                          <Grid.Column>
                            <Form.Field>
                              <div className="below_area">
                                <img src={`${MS_SERVICE_URL['ASSETS_CDN_URL'].url}/assets/images/avatar_1.png`} className="avatar" />
                                <span className="span_name">
                                  Barthelemy Chalvet
                                </span>
                                <i
                                  className="ms-Icon ms-Icon--CalculatorMultiply right_float"
                                  aria-hidden="true"
                                ></i>
                              </div>
                            </Form.Field>
                          </Grid.Column>

                          <Grid.Column>
                            <Form.Field>
                              <div className="below_area">
                                <img src={`${MS_SERVICE_URL['ASSETS_CDN_URL'].url}/assets/images/avatar_2.png`} className="avatar" />
                                <span className="span_name">
                                  Barthelemy Chalvet
                                </span>
                                <i
                                  className="ms-Icon ms-Icon--CalculatorMultiply right_float"
                                  aria-hidden="true"
                                ></i>
                              </div>
                            </Form.Field>
                          </Grid.Column>
                          <Grid.Column>
                            <Form.Field>
                              <div className="below_area">
                                <img src={`${MS_SERVICE_URL['ASSETS_CDN_URL'].url}/assets/images/avatar_3.png`} className="avatar" />
                                <span className="span_name">
                                  Barthelemy Chalvet
                                </span>
                                <i
                                  className="ms-Icon ms-Icon--CalculatorMultiply right_float"
                                  aria-hidden="true"
                                ></i>
                              </div>
                            </Form.Field>
                          </Grid.Column>
                        </Grid.Row>
                      </Grid>

                      <div className="dashed_area md_upload">
                        <div className="file-upload-message">
                          <img
                            src={`${MS_SERVICE_URL['ASSETS_CDN_URL'].url}/assets/images/upload.png`}
                            className="mr-10 "
                            style={{ marginTop: '65px' }}
                          />
                          <p className="file-upload-default-message">
                            Drag & drop or click here to upload file
                          </p>
                        </div>
                        <Input type="file" className="file-upload-input" />
                      </div>
                    </Form.Field>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
              <Grid columns={1}>
                <Grid.Row>
                  <Grid.Column>
                    <Form.Field>
                      <label>Associate protocols</label>

                      <div className="card1 card-custom gutter-b">
                        <div
                          className="card-body d-flex align-items-center justify-content-between flex-wrap py-3"
                          style={{ width: '80%' }}
                        >
                          <div className="d-flex align-items-center  py-2">
                            <img src={`${MS_SERVICE_URL['ASSETS_CDN_URL'].url}/assets/images/calendar.png`} style={{ width: '30px' }} />
                            <span className="font-weight-bold mb-0 mr-10">
                              &nbsp; 10 Aug, 2020
                              <br />
                              &nbsp; This is invitation title
                            </span>

                            <span
                              className="font-weight-bold mb-0 mr-10"
                              style={{ marginTop: '-21px' }}
                            >
                              <i
                                className="ms-Icon ms-Icon--Clock"
                                aria-hidden="true"
                              ></i>
                              11:00 AM - 11:45 AM
                            </span>
                            <span
                              className="textt2"
                              style={{ marginTop: '-21px' }}
                            >
                              45 min
                            </span>
                            <div
                              className="d-flex mr-3"
                              style={{ marginTop: '-21px' }}
                            >
                              <div className="navi navi-hover navi-active navi-link-rounded navi-bold d-flex flex-row">
                                <div className="navi-item mr-2">
                                  <a className="navi-link">
                                    <span className="navi-text">
                                      {' '}
                                      <i
                                        className="ms-Icon ms-Icon--Link"
                                        aria-hidden="true"
                                      ></i>
                                      Protocol here{' '}
                                    </span>
                                  </a>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="symbol-group symbol-hover py-2">
                            <div className="symbol symbol-30">
                              <img src={`${MS_SERVICE_URL['ASSETS_CDN_URL'].url}/assets/images/user.png`} />
                              <span className="mr-2">
                                <Dropdown text="...">
                                  <Dropdown.Menu className="dropdowncomplete">
                                    <Dropdown.Item
                                      icon="eye"
                                      text="View detail"
                                    />
                                    <Dropdown.Item
                                      icon="pencil alternate"
                                      text="Edit"
                                    />

                                    <Dropdown.Item
                                      icon="trash alternate outline"
                                      text="Delete"
                                    />
                                  </Dropdown.Menu>
                                </Dropdown>
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Form.Field>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Form>
          </div>
        </Modal.Content>
        <Modal.Actions>
          <Button
            content="Save and Continue"
            onClick={() => setOpen(false)}
            positive
            size="small"
            className="primary"
          />
          <Button
            size="small"
            className="icon-border"
            onClick={() => setOpen(false)}
          >
            X Cancel
          </Button>
        </Modal.Actions>
      </Modal>
    </div>
  );
}

export default ModalEditInvitation;
