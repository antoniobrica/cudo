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
 

import { useTranslation } from 'react-i18next';

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
const PinMaskTask = () => {
  const [state, dispatch] = React.useReducer(exampleReducer, {
    open: false,
    size: undefined,
  });
  const { open, size } = state;
  const { t } = useTranslation();
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
          <Modal.Header>File_name.cad
       <div style={{textAlign:'center',marginBottom:'-30px'}}> 
       <img src="assets/images/icons_top.png"  style={{position: 'relative',top: '-17px'}}/>
         </div>   

          </Modal.Header>
          <Modal.Content style={{    marginTop: '-1px'}}>
            <Form>
              <Grid stackable columns={2}>
                <Grid.Column className="colorback" style={{ width: '70%' }}>
                  <Segment>
                    <img src="assets/images/Image 3.png" className=" fluid " />
                  </Segment>
                </Grid.Column>
                <Grid.Column style={{ width: '30%',  marginLeft: '-9px', marginTop: '-10px'}}>
                  <div style={{ background: '#F1F5F8', padding: '10px',    marginBottom: '-18px' }}>
                    <Form.Field classname="buttonbluedown">
                      <label> </label>
                      <button  className="ui mini button pinbutton"> {t('pin_mask.pin_mark_task')} </button>
                      <img src="assets/images/grey_pin.png" className="pinadd"/>
                    </Form.Field>
                  </div>
                  <Form.Field>
                    <div className="card1 card-custom gutter-b" style={{paddingTop: '12px'}}>
                      <div className="card-body d-flex align-items-center justify-content-between flex-wrap py-3">
                        <div className="d-flex align-items-center  py-2">
                          <span>
                         
                            <img src="assets/images/dots.png" className="  mr-10 " />
                          </span>

                          <span>
                      
                            <img src="assets/images/check_grey.png" className="  mr-10 " />
                          </span>
                          <span className="font-weight-bold mb-0 mr-10  ">
                          {t('pin_mask.this_task')} 
                          </span>
                        </div>

                        <div className="symbol-group symbol-hover py-2 text-right">
                          <div className="symbol symbol-30">
                            <img src="assets/images/people_1.png" />
                          </div>
                        </div>
                      </div>
                      <div className="card-body d-flex align-items-center justify-content-between flex-wrap py-3">
                        <div className="d-flex align-items-center  py-2">
                          <span className="  mr-10 "> </span>

                          <span className=" mr-2 mr-10 "> </span>
                          <span
                            style={{ color: '#718898', fontSize: '11px;', fontWeight:'normal',marginTop: '-12px' }}
                            className="font-weight-bold mb-0 mr-10  fontcad"
                          >
                            Starts Tomorrow ↦ Due Fri Aug 28th
                          </span>
                        </div>
                      </div>

                      <div className="card-body d-flex align-items-center justify-content-between flex-wrap py-3">
                        <div className="d-flex align-items-center  py-2" style={{marginTop: '-9px'}}>
                          <span className=" mr-2 mr-10 li_area"></span>
                          <span className=" mr-2 mr-10 li_area">
                            
                            <i
                              className="ms-Icon ms-Icon--LocationDot "
                              aria-hidden="true"
                              style={{ color: '#D0D8DF' }}
                            ></i>
                             {t('pin_mask.tender')} 
                          </span>
                          <span className=" mr-2 mr-10 li_area">
                         
                            <i
                              className="ms-Icon ms-Icon--LocationDot "
                              aria-hidden="true"
                              style={{ color: '#D0D8DF' }}
                            ></i>
                            {t('pin_mask.paint_work')} 
                          </span>
                        </div>

                        <div className="symbol-group symbol-hover py-2 text-right" style={{marginTop: '-9px'}}>
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

                      <div style={{ borderTop: '1px solid #ddd', paddingTop: '12px' }}>
                      <div className="card-body d-flex align-items-center justify-content-between flex-wrap py-3">
                        <div className="d-flex align-items-center  py-2">
                          <span>
                         
                          <img src="assets/images/dots.png" className="  mr-10 " />
                          </span>

                          <span>
                      
                            <img src="assets/images/check_grey.png" className="  mr-10 " />
                          </span>
                          <span className="font-weight-bold mb-0 mr-10  ">
                            
                            {t('pin_mask.this_task')} 
                          </span>
                        </div>

                        <div className="symbol-group symbol-hover py-2 text-right">
                          <div className="symbol symbol-30">
                            <img src="assets/images/people_1.png" />
                          </div>
                        </div>
                      </div>
                      <div className="card-body d-flex align-items-center justify-content-between flex-wrap py-3">
                        <div className="d-flex align-items-center  py-2">
                          <span className="  mr-10 "> </span>

                          <span className=" mr-2 mr-10 "> </span>
                          <span
                            style={{ color: '#718898', fontSize: '11px;', fontWeight:'normal',marginTop: '-12px' }}
                            className="font-weight-bold mb-0 mr-10  fontcad"
                          >
                            Starts Tomorrow ↦ Due Fri Aug 28th
                          </span>
                        </div>
                      </div>

                      <div className="card-body d-flex align-items-center justify-content-between flex-wrap py-3">
                        <div className="d-flex align-items-center  py-2" style={{marginTop: '-9px'}}>
                          <span className=" mr-2 mr-10 li_area"></span>
                          <span className=" mr-2 mr-10 li_area">
                            
                            <i
                              className="ms-Icon ms-Icon--LocationDot "
                              aria-hidden="true"
                              style={{ color: '#D0D8DF' }}
                            ></i>
                       {t('pin_mask.tender')} 
                          </span>
                          <span className=" mr-2 mr-10 li_area">
                         
                            <i
                              className="ms-Icon ms-Icon--LocationDot "
                              aria-hidden="true"
                              style={{ color: '#D0D8DF' }}
                            ></i>
                            {t('pin_mask.paint_work')} 
                          </span>
                        </div>

                        <div className="symbol-group symbol-hover py-2 text-right" style={{marginTop: '-9px'}}>
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
