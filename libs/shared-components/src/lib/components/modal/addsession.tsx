import React from 'react';
import {
  Button,
  Checkbox,
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
import { Dropdown } from 'semantic-ui-react';

import img2 from 'libs/shared-components/src/avatar_1.png';
import img3 from 'libs/shared-components/src/avatar_2.png';
import img4 from 'libs/shared-components/src/avatar_3.png';

function ModalSession() {
  const countryOptions = [
    { key: 'af', value: 'af', text: 'Afghanistan' },
    { key: 'ax', value: 'ax', text: 'Aland Islands' },
    { key: 'az', value: 'az', flag: 'az', text: 'Azerbaijan' },
    { key: 'bs', value: 'bs', flag: 'bs', text: 'Bahamas' },
    { key: 'bh', value: 'bh', flag: 'bh', text: 'Bahrain' },
    { key: 'bd', value: 'bd', flag: 'bd', text: 'Bangladesh' },
    { key: 'bb', value: 'bb', flag: 'bb', text: 'Barbados' },
    { key: 'by', value: 'by', flag: 'by', text: 'Belarus' },
    { key: 'be', value: 'be', flag: 'be', text: 'Belgium' },
    { key: 'bz', value: 'bz', flag: 'bz', text: 'Belize' },
    { key: 'bj', value: 'bj', flag: 'bj', text: 'Benin' },
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
            + Add New Session{' '}
          </Button>
        }
      >
        <Modal.Header>
          <h3>Add sessions </h3>
        </Modal.Header>
        <Modal.Content body>
          <div>
            <Form>
              <Grid columns={1}>
                <Grid.Row>
                  <Grid.Column>
                    <Form.Field>
                      <label>
                        Name <span className="danger">*</span>
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
              <Grid columns={2}>
                <Grid.Row>
                  <Grid.Column>
                    <Form.Field>
                      <label>Work Type</label>
                      <Select
                        placeholder="Select"
                        className="small"
                        options={countryOptions}
                      />
                    </Form.Field>
                  </Grid.Column>

                  <Grid.Column>
                    <Form.Field>
                      <label>Category</label>
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
                      <label>Admin</label>

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
                        <img src={img2} className="avatar" />
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
                        <img src={img3} className="avatar" />
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
                        <img src={img4} className="avatar" />
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
                        <img src={img2} className="avatar" />
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
                        <img src={img3} className="avatar" />
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
                        <img src={img4} className="avatar" />
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
              <Grid columns={2}>
                <Grid.Row>
                  <Grid.Column>
                    <Form.Field>
                      <label>Template for invitation</label>
                      <Select
                        placeholder="Select"
                        className="small"
                        options={countryOptions}
                      />
                    </Form.Field>
                  </Grid.Column>

                  <Grid.Column>
                    <Form.Field>
                      <label>Template for protocol</label>
                      <Select
                        placeholder="Select"
                        className="small"
                        options={countryOptions}
                      />
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

export default ModalSession;
