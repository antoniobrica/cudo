import React from 'react';
import {
  Button,
  Header,
  Modal,
  Tab,
  Table,
  Input,
  Form,
  Grid,
  Image,
  Select,
  TextArea,
} from 'semantic-ui-react';
// import SampleModal from './sample-modal';

export function ModalExamplePrinting() {
  const countryOptions = [
    { key: 'af', value: 'af', text: 'Afghanistan' },
    { key: 'ax', value: 'ax', text: 'Aland Islands' },
  ];

  const [open, setOpen] = React.useState(false);

  return (
    <div id="navbar">
      <Modal
        className="modal_media modal_center"
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        trigger={
          <Button size="mini" className="grey-btn">
            {' '}
            Printing Company
          </Button>
        }
      >
        <Modal.Header>
          <h3>Add Printing Company</h3>
        </Modal.Header>
        <Modal.Content body>
          <div>
            <div className="content">
              <div className="description">
                Upload Client logo <span className="danger">*</span>
              </div>
              <Button className="secondary_btn" size="mini" primary>
                Click to upload
              </Button>
              <p className="paragraph">
                Click the upload button to upload the client logo
              </p>
            </div>

            <Form>
              <Grid columns={1}>
                <Grid.Row>
                  <Grid.Column>
                    <Form.Field>
                      <label>
                        What's the Company name?{' '}
                        <span className="danger">*</span>
                      </label>
                      <Input
                        placeholder="Al Hamra Company"
                        size="small"
                        className="full-width"
                        type="text"
                      />
                    </Form.Field>
                  </Grid.Column>
                </Grid.Row>
              </Grid>

              <Grid columns={2}>
                <Grid.Row>
                  <Grid.Column>
                    <Form.Field>
                      <label>Email </label>
                      <Input
                        placeholder="Email"
                        size="small"
                        className="full-width"
                        type="text"
                      />
                    </Form.Field>
                  </Grid.Column>

                  <Grid.Column>
                    <Form.Field>
                      <label>Type </label>
                      <Select
                        placeholder="Select"
                        className="small"
                        options={countryOptions}
                      />
                    </Form.Field>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
              <Grid columns={1} className="grid-add-new">
                <Grid.Row>
                  <Grid.Column>
                    <Form.Field>
                      <a className="anchor-color">+ Add New</a>
                    </Form.Field>
                  </Grid.Column>
                </Grid.Row>
              </Grid>

              <Grid columns={2}>
                <Grid.Row>
                  <Grid.Column>
                    <Form.Field>
                      <label>Phone </label>
                      <Grid columns={2} className="form-field">
                        <Grid.Row>
                          <Grid.Column>
                            <Form.Field>
                              <Select
                                placeholder="Select"
                                className="small"
                                options={countryOptions}
                              />
                            </Form.Field>
                            <Form.Field>
                              <a href="" className="anchor-color">
                                + Add New
                              </a>
                            </Form.Field>
                          </Grid.Column>
                          <Grid.Column>
                            <Form.Field>
                              <Select
                                placeholder="Select"
                                className="small"
                                options={countryOptions}
                              />
                            </Form.Field>
                          </Grid.Column>
                        </Grid.Row>
                      </Grid>
                    </Form.Field>
                  </Grid.Column>

                  <Grid.Column>
                    <Form.Field>
                      <label>Type </label>
                      <Select
                        placeholder="Select"
                        className="small"
                        options={countryOptions}
                      />
                    </Form.Field>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
              <Grid columns={1}>
                <Grid.Row>
                  <Grid.Column>
                    <Form.Field>
                      <label>Address Line 1</label>
                      <Input
                        placeholder="Address Line 1"
                        size="small"
                        className="full-width"
                        type="text"
                      />
                    </Form.Field>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
              <Grid columns={1}>
                <Grid.Row>
                  <Grid.Column>
                    <Form.Field>
                      <label>Address Line 2</label>
                      <Input
                        placeholder="Address Line 2"
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
                      <label>City </label>
                      <Input
                        placeholder="City"
                        size="small"
                        className="full-width"
                        type="text"
                      />
                    </Form.Field>
                  </Grid.Column>
                  <Grid.Column>
                    <Form.Field>
                      <label>State Pin </label>
                      <Input
                        placeholder="State Pin"
                        size="small"
                        className="full-width"
                        type="text"
                      />
                    </Form.Field>
                  </Grid.Column>
                  <Grid.Column>
                    <Form.Field>
                      <label>Country </label>
                      <Select
                        placeholder="Select"
                        className="small"
                        options={countryOptions}
                      />
                    </Form.Field>
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row></Grid.Row>
              </Grid>
            </Form>
          </div>
        </Modal.Content>
        <Modal.Actions>
          <Button
            content="Add Company"
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

export default ModalExamplePrinting;
