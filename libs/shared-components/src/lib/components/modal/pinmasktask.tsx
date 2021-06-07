import React from 'react';
import {
  Button,
  Modal,
  Grid,
  Image,
  Segment,
  Form,
  Input,
  Dropdown
} from 'semantic-ui-react';
// import SampleModal from './sample-modal';
import img2 from 'libs/shared-components/src/people_1.png';
import img from 'libs/shared-components/src/assets/images/grey_pin.png'
import img3 from 'libs/shared-components/src/check_grey.png';
import img4 from 'libs/shared-components/src/dots.png';
import img7 from 'libs/shared-components/src/Image 3.png';

function exampleReducer(state, action) {
  switch (action.type) {
    case 'close':
      return { open: false };
    case 'open':
      return { open: true, size: action.size };
    default:
      throw new Error('Unsupported action...');
  }
}

const countryOptions = [
  { key: 'af', value: 'af', text: 'Afghanistan' },
  { key: 'ax', value: 'ax', text: 'Aland Islands' },
];
export const PinMaskTask = () => {
  const [state, dispatch] = React.useReducer(exampleReducer, {
    open: false,
    size: undefined,
  });
  const { open, size } = state;

  return (
    <>
      <div id="navbar">
        <Button
          size="mini"
          className="grey-btn"
          onClick={() => dispatch({ type: 'open', size: 'fullscreen' })}
        >
          Pin Task
        </Button>

        <Modal
          size={size}
          open={open}
          onClose={() => dispatch({ type: 'close' })}
          style={{ marginLeft: '35px' }}
        >
          <Modal.Header>File_name.cad</Modal.Header>
          <Modal.Content style={{ marginTop: '-1px' }}>
            <Form>
              <Grid stackable columns={2}>
                <Grid.Column className="colorback" style={{ width: '70%' }}>
                  <Segment>
                    <img src={img7} className=" fluid " />
                  </Segment>
                </Grid.Column>
                <Grid.Column style={{ width: '30%', marginLeft: '-9px', marginTop: '-10px' }}>
                  <div style={{ background: '#F1F5F8', padding: '10px', marginBottom: '-18px' }}>
                    <Form.Field classname="buttonbluedown">
                      <label> </label>
                      <button className="ui mini button pinbutton">Click to add pin-mark task</button>
                      <img src={img} className="pinadd" />
                    </Form.Field>
                  </div>
                  <Form.Field>
                    <div className="card1 card-custom gutter-b">
                      <div className="card-body d-flex align-items-center justify-content-between flex-wrap py-3">
                        <div className="d-flex align-items-center  py-2">
                          <span>

                            <img src={img4} className="  mr-10 " />{' '}
                          </span>

                          <span>

                            <img src={img3} className=" mr-2 mr-10 " />{' '}
                          </span>
                          <span className="font-weight-bold mb-0 mr-10  ">
                            This is task name here
                          </span>
                        </div>

                        <div className="symbol-group symbol-hover py-2 text-right">
                          <div className="symbol symbol-30">
                            <img src={img2} />
                          </div>
                        </div>
                      </div>
                      <div className="card-body d-flex align-items-center justify-content-between flex-wrap py-3">
                        <div className="d-flex align-items-center  py-2">
                          <span className="  mr-10 "> </span>

                          <span className=" mr-2 mr-10 "> </span>
                          <span
                            style={{ color: '#718898' }}
                            className="font-weight-bold mb-0 mr-10  "
                          >
                            Starts Tomorrow ↦ Due Fri Aug 28th
                          </span>
                        </div>
                      </div>

                      <div className="card-body d-flex align-items-center justify-content-between flex-wrap py-3">
                        <div className="d-flex align-items-center  py-2">
                          <span className=" mr-2 mr-10 li_area"></span>
                          <span className=" mr-2 mr-10 li_area">

                            <i
                              className="ms-Icon ms-Icon--LocationDot "
                              aria-hidden="true"
                              style={{ color: '#D0D8DF' }}
                            ></i>
                            Tender
                          </span>
                          <span className=" mr-2 mr-10 li_area">

                            <i
                              className="ms-Icon ms-Icon--LocationDot "
                              aria-hidden="true"
                              style={{ color: '#D0D8DF' }}
                            ></i>
                            Paint Work
                          </span>
                        </div>

                        <div className="symbol-group symbol-hover py-2 text-right">
                          <div className="symbol symbol-30">
                            <span className="mr-2">
                              <Dropdown text="..." className="dotlinearea">
                                <Dropdown.Menu>
                                  <Dropdown.Item
                                    icon="eye"
                                    text="View detail"
                                  />
                                  <Dropdown.Item icon="pencil" text="Edit" />
                                  <Dropdown.Item
                                    icon="check circle outline"
                                    text="Mark as complete"
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

                      <div style={{ borderTop: '1px solid #ddd' }}>
                        <div className="card-body d-flex align-items-center justify-content-between flex-wrap py-3">
                          <div className="d-flex align-items-center  py-2">
                            <span>

                              <img src={img4} className="  mr-10 " />{' '}
                            </span>

                            <span>

                              <img src={img3} className=" mr-2 mr-10 " />{' '}
                            </span>
                            <span className="font-weight-bold mb-0 mr-10  ">
                              This is task name here
                            </span>
                          </div>

                          <div className="symbol-group symbol-hover py-2 text-right">
                            <div className="symbol symbol-30">
                              <img src={img2} />
                            </div>
                          </div>
                        </div>
                        <div className="card-body d-flex align-items-center justify-content-between flex-wrap py-3">
                          <div className="d-flex align-items-center  py-2">
                            <span className="  mr-10 "> </span>

                            <span className=" mr-2 mr-10 "> </span>
                            <span
                              style={{ color: '#718898' }}
                              className="font-weight-bold mb-0 mr-10  "
                            >
                              Starts Tomorrow ↦ Due Fri Aug 28th
                            </span>
                          </div>
                        </div>

                        <div className="card-body d-flex align-items-center justify-content-between flex-wrap py-3">
                          <div className="d-flex align-items-center  py-2">
                            <span className=" mr-2 mr-10 li_area"></span>
                            <span className=" mr-2 mr-10 li_area">

                              <i
                                className="ms-Icon ms-Icon--LocationDot "
                                aria-hidden="true"
                                style={{ color: '#D0D8DF' }}
                              ></i>
                              Tender
                            </span>
                            <span className=" mr-2 mr-10 li_area">

                              <i
                                className="ms-Icon ms-Icon--LocationDot "
                                aria-hidden="true"
                                style={{ color: '#D0D8DF' }}
                              ></i>
                              Paint Work
                            </span>
                          </div>

                          <div className="symbol-group symbol-hover py-2 text-right">
                            <div className="symbol symbol-30">

                              <span className="mr-2">
                                <Dropdown text="..." className="dotlinearea">
                                  <Dropdown.Menu>
                                    <Dropdown.Item
                                      icon="eye"
                                      text="View detail"
                                    />
                                    <Dropdown.Item icon="pencil" text="Edit" />
                                    <Dropdown.Item
                                      icon="check circle outline"
                                      text="Mark as complete"
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
                    </div>
                  </Form.Field>
                  <Form.Field>
                    <div className="card1 card-custom gutter-b"></div>
                  </Form.Field>
                </Grid.Column>
              </Grid>
            </Form>
          </Modal.Content>
        </Modal>
      </div>
    </>
  );
};

export default PinMaskTask;
