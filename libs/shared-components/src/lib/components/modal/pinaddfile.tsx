 
import React from 'react';
import { Button,  Modal,  Grid, Image, Segment,Form,Input,TextArea,Select,Checkbox} from 'semantic-ui-react';
// import SampleModal from './sample-modal';
import img2 from 'libs/shared-components/src/people_1.png';

import img3 from 'libs/shared-components/src/check_grey.png'; 
import img4 from 'libs/shared-components/src/dots.png';
import img6 from 'libs/shared-components/src/dotss.png';
import img7 from 'libs/shared-components/src/Image 3.png';


function exampleReducer(state, action) {
    switch (action.type) {
      case 'close':
        return { open: false }
      case 'open':
        return { open: true, size: action.size }
      default:
        throw new Error('Unsupported action...')
    }
    
  }
  
  const countryOptions = [
    { key: 'af', value: 'af', text: 'Afghanistan' },
    { key: 'ax', value: 'ax', text: 'Aland Islands' },
     
  ]
  const ModalExampleSize = () => {
    const [state, dispatch] = React.useReducer(exampleReducer, {
      open: false,
      size: undefined,
    })
    const { open, size } = state
  
    return (
         <>
       <div id="navbar">
         
        <Button  size='mini' className="grey-btn" onClick={() => dispatch({ type: 'open', size: 'fullscreen' })}>
           Pin File
        </Button>
  
        <Modal
          size={size}
          open={open}
          onClose={() => dispatch({ type: 'close' })} style={{marginLeft:'30px'}}
        >
          <Modal.Header>File_name.cad</Modal.Header>
          <Modal.Content>
          <Form>
          <Grid stackable columns={2}>
    <Grid.Column>
      <Segment> 
      <img src={img7}  className=" fluid " /> 

      </Segment>
    </Grid.Column>
    <Grid.Column>
        <div style={{background: '#F1F5F8', padding: '10px'}}>
         <Form.Field>
      <label>Task Title <span className="danger">*</span></label>
      <Input placeholder='Swtichboard Fitting' size='small' className="full-width" type="text" />
    </Form.Field>
    <Form.Field>
      <label>Description </label>
      <TextArea placeholder='type here...' />
    </Form.Field>
    <Form.Field>
      <label>Assoicate with work type  </label>
      <Select placeholder='Select' className="small" options={countryOptions} />
      </Form.Field>
      <Form.Field>
      <label>Select phase  </label>
      <Select placeholder='Select' className="small" options={countryOptions} />
      </Form.Field>
      <Form.Field>
      <label>Select BKP  </label>
      <Select placeholder='Select' className="small" options={countryOptions} />
      </Form.Field>
      <Form.Field>
      <label>Assignee <span className="danger">*</span></label>
      <Select placeholder='Select' className="small" options={countryOptions} />
      </Form.Field>
      <Grid columns={2}>
<Grid.Row>
  <Grid.Column>
    <Form.Field>
      <label>Followers </label>
      <Select placeholder='Select' className="small" options={countryOptions} />
            
    </Form.Field>
  </Grid.Column>

  <Grid.Column>
    <Form.Field>
    <div className="event">
                        <div className="label-green label-spacer" style={{width: '30px',height: '30px',padding: '6px 0px 0px 8px'}}>
                           <span className="white-text">AB</span>
                            </div>
                            <div className="label-purple label-spacer" style={{width: '30px',height: '30px',padding: '6px 0px 0px 8px'}}>
                           <span className="white-text ">RJ</span>
                            </div>
                            
                       </div>      
    </Form.Field>
  </Grid.Column>
</Grid.Row>
</Grid>
<Form.Field>
<Checkbox label='send notification to assignee/followers for the task' />
      </Form.Field>
<Form.Field>
<Grid columns={2}>
<Grid.Row>
  <Grid.Column>
    <Form.Field>
      <label>Start Date </label>
      <Input   size='small' className="full-width" type="date" />     
    </Form.Field>
  </Grid.Column>

  <Grid.Column>
    <Form.Field>
    <label>End Date </label>
    <Input   size='small' className="full-width" type="date" /> 
    </Form.Field>
  </Grid.Column>
</Grid.Row>
</Grid>
</Form.Field>
<Form.Field>  
    <label>Estimated Dates </label>
      <Select placeholder='Select' className="small" options={countryOptions} />
     
      </Form.Field>
      <Form.Field>
       
              <Button
          content="Submit" 
          onClick={() => dispatch({ type: 'close' })}
          positive
          size='mini' className="grey-btn"
        />
        <Button size='mini' className="icon-border" onClick={() => dispatch({ type: 'close' })}>
        X  Cancel
        </Button>
          
      </Form.Field>
      </div>
      <Form.Field>
       
        <div className="card1 card-custom gutter-b" style={{border: '1px solid #ddd'}}>

<div className="card-body d-flex align-items-center justify-content-between flex-wrap py-3">
												 
													<div className="d-flex align-items-center  py-2">
													  <span> <img src={img4}  className="  mr-10 " />  </span>
													 
                                                     <span>  <img src={img3}  className=" mr-2 mr-10 " />   </span>
                                                     <span className="font-weight-bold mb-0 mr-10  ">This is task name here</span>
														 
													</div>
													 
													<div className="symbol-group symbol-hover py-2 text-right">
													   <div className="symbol symbol-30">
                                                       
                                                        <img src={img2}  />
                                                    
														</div>
                                                       
													</div> 
                                                    
												</div>
                                                <div className="card-body d-flex align-items-center justify-content-between flex-wrap py-3">
                                                <div className="d-flex align-items-center  py-2">
													  <span className="  mr-10 " >    </span>
													 
                                                     <span  className=" mr-2 mr-10 " >   </span>
                                                     <span style={{color:'#718898'}}  className="font-weight-bold mb-0 mr-10  ">Starts Tomorrow ↦ Due Fri Aug 28th</span>
														 
													</div>

                                                </div>
                                                 
<div className="card-body d-flex align-items-center justify-content-between flex-wrap py-3">
												 
<div className="d-flex align-items-center  py-2">
                                                <span className=" mr-2 mr-10 li_area"></span>
                                                   <span className=" mr-2 mr-10 li_area">  <i className="ms-Icon ms-Icon--LocationDot " aria-hidden="true" style={{color:'#D0D8DF'}}></i>Tender</span>
                                                    <span className=" mr-2 mr-10 li_area">  <i className="ms-Icon ms-Icon--LocationDot " aria-hidden="true" style={{color:'#D0D8DF'}}></i>Paint Work</span>
                                                 </div>
                                                  
                                                 <div className="symbol-group symbol-hover py-2 text-right">
                                                    <div className="symbol symbol-30">
                                                    
                                                     <img src={img6}  />
                                                 
                                                     </div>
                                                    
                                                 </div> 
                                                 
                                             </div>
                                              
                                               
        </div> 
 

      </Form.Field>
      <Form.Field>
       
       <div className="card1 card-custom gutter-b" style={{border: '1px solid #ddd'}}>

<div className="card-body d-flex align-items-center justify-content-between flex-wrap py-3">
                                                
                                                   <div className="d-flex align-items-center  py-2">
                                                     <span> <img src={img4}  className="  mr-10 " />  </span>
                                                    
                                                    <span>  <img src={img3}  className=" mr-2 mr-10 " />   </span>
                                                    <span className="font-weight-bold mb-0 mr-10  ">This is task name here</span>
                                                        
                                                   </div>
                                                    
                                                   <div className="symbol-group symbol-hover py-2 text-right">
                                                      <div className="symbol symbol-30">
                                                      
                                                       <img src={img2}  />
                                                   
                                                       </div>
                                                      
                                                   </div> 
                                                   
                                               </div>
                                               <div className="card-body d-flex align-items-center justify-content-between flex-wrap py-3">
                                               <div className="d-flex align-items-center  py-2">
                                                     <span className="  mr-10 " >    </span>
                                                    
                                                    <span  className=" mr-2 mr-10 " >   </span>
                                                    <span style={{color:'#718898'}}  className="font-weight-bold mb-0 mr-10  ">Starts Tomorrow ↦ Due Fri Aug 28th</span>
                                                        
                                                   </div>

                                               </div>
                                                
<div className="card-body d-flex align-items-center justify-content-between flex-wrap py-3">
                                                
                                                <div className="d-flex align-items-center  py-2">
                                                <span className=" mr-2 mr-10 li_area"></span>
                                                   <span className=" mr-2 mr-10 li_area">  <i className="ms-Icon ms-Icon--LocationDot " aria-hidden="true" style={{color:'#D0D8DF'}}></i>Tender</span>
                                                    <span className=" mr-2 mr-10 li_area">  <i className="ms-Icon ms-Icon--LocationDot " aria-hidden="true" style={{color:'#D0D8DF'}}></i>Paint Work</span>
                                                 </div>
                                                 
                                                <div className="symbol-group symbol-hover py-2 text-right">
                                                   <div className="symbol symbol-30">
                                                      <img src={img6}  />
                                                
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
    )
  }
  
  export default ModalExampleSize