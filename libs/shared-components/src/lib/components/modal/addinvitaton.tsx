import { MS_SERVICE_URL } from '@cudo/mf-core';
import React from 'react';
import {
  Button,
  Select,
  Modal,
  Input,
  Form,
  Grid,
  Dropdown,
  TextArea,
} from 'semantic-ui-react';
// import SampleModal from './sample-modal';

export interface AddInvitationProps {
  sessionId?
}

export function ModalAddInvitation(props: AddInvitationProps) {
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
            Add Invitation
          </Button>
        }
      >
        <Modal.Header>
          <h3>Add Invitation </h3>
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
                      <label>Add Files</label>

                      <div className="dashed_area md_upload">
                        <div className="file-upload-message">
                          <img src={`${MS_SERVICE_URL['ASSETS_CDN_URL'].url}/assets/images/upload.png`} className="mr-10 " />
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
                      <label>Select protocols</label>
                      <Select options={countryOptions} placeholder='Select Company' className="full-width" />
                    </Form.Field>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Form>
          </div>
        </Modal.Content>
        <Modal.Actions>
          <Button
            content="Submit"
            onClick={() => setOpen(false)}
            positive
            size="mini"
            className="grey-btn"
          />
          <Button
            size="mini"
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

export default ModalAddInvitation;
