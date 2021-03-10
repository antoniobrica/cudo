import React from 'react';
import { Button, Checkbox,   Modal,  Tab,Table,  Input, Form, Grid, Image, Select, TextArea} from 'semantic-ui-react';
// import SampleModal from './sample-modal';
 
import img from 'libs/shared-components/src/upload.png';
import img2 from 'libs/shared-components/src/avatar_1.png';
import img3 from 'libs/shared-components/src/avatar_2.png';
import img4 from 'libs/shared-components/src/avatar_3.png';
import img5 from 'libs/shared-components/src/file_1.png';
import img6 from 'libs/shared-components/src/file_2.png';
function ModalAddFile() {
    const countryOptions = [
        { key: 'af', value: 'af', text: 'Afghanistan' },
        { key: 'ax', value: 'ax', text: 'Aland Islands' },
         
      ]

 
  const [open, setOpen] = React.useState(false)
   
  return (
    <div id="navbar">
    <Modal className="modal_media modal_center modal_media_1"
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={<Button size='mini' className="grey-btn">Uploaded File</Button> }
    >
      <Modal.Header><h3>Add File </h3></Modal.Header>
      <Modal.Content body>
        
        <div>
 
      
      <Form>
<Grid columns={1}>
<Grid.Row>
  <Grid.Column>
    <Form.Field>
  <div className="dashed_area md_upload">
  <div className="file-upload-message">
  <img src={img}  className="mr-10 " />
      <p className="file-upload-default-message">Drag & drop or click here to upload file</p>
    
      </div>
  <Input  type="file" className="file-upload-input" />
  </div>
    
    </Form.Field>
  </Grid.Column>
 
</Grid.Row>
</Grid>
<Grid columns={2}>
<Grid.Row>
  <Grid.Column>
    <Form.Field>
    <label>Upload files</label>
      
    
    </Form.Field>
  </Grid.Column>
 
</Grid.Row>
</Grid>
<Grid columns={12}>
<Grid.Row>
  <Grid.Column>
    <Form.Field>
  
   <img src={img5}  /> 
   
    </Form.Field>
  </Grid.Column>
  <Grid.Column>
    <Form.Field>
    <label></label>
    <label>File_name.cad</label>
    
   
    </Form.Field>
  </Grid.Column>
  <Grid.Column>
    <Form.Field>
 </Form.Field>
  </Grid.Column>
  <Grid.Column>
    <Form.Field>
     </Form.Field>
  </Grid.Column>
  <Grid.Column>
    <Form.Field>
     </Form.Field>
  </Grid.Column>
  <Grid.Column>
    <Form.Field>
     </Form.Field>
  </Grid.Column>
  <Grid.Column>
    <Form.Field>
     </Form.Field>
  </Grid.Column>
  <Grid.Column>
    <Form.Field>
     </Form.Field>
  </Grid.Column>
  <Grid.Column>
    <Form.Field>
     </Form.Field>
  </Grid.Column>
  <Grid.Column>
    <Form.Field>
     </Form.Field>
  </Grid.Column>
  <Grid.Column>
    <Form.Field>
     </Form.Field>
  </Grid.Column>
  <Grid.Column>
    <Form.Field>
   
    <i className="ms-Icon ms-Icon--CalculatorMultiply right_float" aria-hidden="true"></i>     
      </Form.Field>
  </Grid.Column>
 
</Grid.Row>
</Grid>
 
<Grid columns={12}>
<Grid.Row>
  <Grid.Column>
    <Form.Field>
  
   <img src={img5}  /> 
   
    </Form.Field>
  </Grid.Column>
  <Grid.Column>
    <Form.Field>
    <label></label>
    <label>File_name.cad</label>
    
   
    </Form.Field>
  </Grid.Column>
  <Grid.Column>
    <Form.Field>
 </Form.Field>
  </Grid.Column>
  <Grid.Column>
    <Form.Field>
     </Form.Field>
  </Grid.Column>
  <Grid.Column>
    <Form.Field>
     </Form.Field>
  </Grid.Column>
  <Grid.Column>
    <Form.Field>
     </Form.Field>
  </Grid.Column>
  <Grid.Column>
    <Form.Field>
     </Form.Field>
  </Grid.Column>
  <Grid.Column>
    <Form.Field>
     </Form.Field>
  </Grid.Column>
  <Grid.Column>
    <Form.Field>
     </Form.Field>
  </Grid.Column>
  <Grid.Column>
    <Form.Field>
     </Form.Field>
  </Grid.Column>
  <Grid.Column>
    <Form.Field>
     </Form.Field>
  </Grid.Column>
  <Grid.Column>
    <Form.Field>
   
    <i className="ms-Icon ms-Icon--CalculatorMultiply right_float" aria-hidden="true"></i>     
      </Form.Field>
  </Grid.Column>
 
</Grid.Row>
</Grid>
<Grid columns={12}>
<Grid.Row>
  <Grid.Column>
    <Form.Field>
  
   <img src={img6}  /> 
   
    </Form.Field>
  </Grid.Column>
  <Grid.Column>
    <Form.Field>
    <label></label>
    <label>File_name.cad</label>
    
   
    </Form.Field>
  </Grid.Column>
  <Grid.Column>
    <Form.Field>
 </Form.Field>
  </Grid.Column>
  <Grid.Column>
    <Form.Field>
     </Form.Field>
  </Grid.Column>
  <Grid.Column>
    <Form.Field>
     </Form.Field>
  </Grid.Column>
  <Grid.Column>
    <Form.Field>
     </Form.Field>
  </Grid.Column>
  <Grid.Column>
    <Form.Field>
     </Form.Field>
  </Grid.Column>
  <Grid.Column>
    <Form.Field>
     </Form.Field>
  </Grid.Column>
  <Grid.Column>
    <Form.Field>
     </Form.Field>
  </Grid.Column>
  <Grid.Column>
    <Form.Field>
     </Form.Field>
  </Grid.Column>
  <Grid.Column>
    <Form.Field>
     </Form.Field>
  </Grid.Column>
  <Grid.Column>
    <Form.Field>
   
    <i className="ms-Icon ms-Icon--CalculatorMultiply right_float" aria-hidden="true"></i>     
      </Form.Field>
  </Grid.Column>
 
</Grid.Row>
</Grid>
<Grid columns={1}>
<Grid.Row>
  <Grid.Column>
    <Form.Field>
    <div className="content">
                <div className="description">Generate file number
                  <p className="enable">Enable this option to generate file numbering</p>
                  <Checkbox toggle className="toggle_area" />
                 
                </div> 
                
            </div>
    </Form.Field>
  </Grid.Column>

  
</Grid.Row>
</Grid>
<Grid columns={2 }>
<Grid.Row>
  <Grid.Column>
    <Form.Field>
      <label>Project</label>
      <Select placeholder='Select' className="small" options={countryOptions} />
         
    </Form.Field>
  </Grid.Column>
 
</Grid.Row>
</Grid>
<Grid columns={3}>
<Grid.Row>
  <Grid.Column>
    <Form.Field>
      <label>BKP/Folder</label>
      <Select placeholder='Select' className="small" options={countryOptions} />
         
    </Form.Field>
      
  </Grid.Column>
 
  <Grid.Column>
    <Form.Field>
    <label>File type</label>
      <Select placeholder='Select' className="small" options={countryOptions} />
             
    </Form.Field>
  </Grid.Column>
  <Grid.Column>
    <Form.Field>
    <label>File structure</label>
      <Select placeholder='Select' className="small" options={countryOptions} />
             
    </Form.Field>
  </Grid.Column>
</Grid.Row>
</Grid>
<Grid  >
<Grid.Row>
  <Grid.Column>
    <Form.Field>
      <label>Who can access</label>
          
    </Form.Field>
      
  </Grid.Column>
  
</Grid.Row>
</Grid>
<Grid columns={2} >
<Grid.Row>


  <Grid.Column>
    <Form.Field>
    <Checkbox label='Everyone in the Project/Work type' className="small" />      
    </Form.Field>
      
  </Grid.Column>
  
  <Grid.Column>
    <Form.Field>
    <Checkbox label='Specify People only' className="small" />    
          
    </Form.Field>
  </Grid.Column>
  
</Grid.Row>
</Grid>

<Grid columns={1} >
<Grid.Row>


  <Grid.Column>
    <Form.Field> 
        <label>Select people</label>
      <Select placeholder='Select' className="small" options={countryOptions} />
       
    </Form.Field>
      
  </Grid.Column>
   
  
</Grid.Row>
</Grid>
<Grid columns={5} >
<Grid.Row>


  <Grid.Column>
    <Form.Field> 
       
      <div className="below_area">
      <img src={img2}  className="avatar"/> 
    <span className="span_name">Barthelemy Chalvet</span>
    <i className="ms-Icon ms-Icon--CalculatorMultiply right_float" aria-hidden="true"></i>     
    
  </div>
    </Form.Field>
      
  </Grid.Column>
   
  <Grid.Column>
    <Form.Field> 
       
      <div className="below_area">
      <img src={img3}  className="avatar"/> 
    <span className="span_name">Barthelemy Chalvet</span>
    <i className="ms-Icon ms-Icon--CalculatorMultiply right_float" aria-hidden="true"></i>     
    
  </div>
    </Form.Field>
      
  </Grid.Column>
  <Grid.Column>
    <Form.Field> 
       
      <div className="below_area">
      <img src={img4}  className="avatar"/> 
    <span className="span_name">Barthelemy Chalvet</span> 
    <i className="ms-Icon ms-Icon--CalculatorMultiply right_float" aria-hidden="true"></i>     
                                                                       
  </div>
    </Form.Field>
      
  </Grid.Column>
</Grid.Row>
</Grid>
</Form>
<br/>
<Button
          content="Submit" 
          onClick={() => setOpen(false)}
          positive
          size='mini' className="grey-btn"
        />
        <Button size='mini' className="icon-border" onClick={() => setOpen(false)}>
        X  Cancel
        </Button>
  
             
 
           
            </div>
        
       
      </Modal.Content>
      <Modal.Actions>
    
        
      </Modal.Actions>
    </Modal>
  </div>
  
  )
}

export default ModalAddFile
 