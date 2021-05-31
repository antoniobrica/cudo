import React from 'react';

import '../../../style/index.scss';
import { Segment, Dropdown, Input, Grid, Form } from 'semantic-ui-react';
import img from 'libs/shared-components/src/upload.png'; 
 

/* eslint-disable-next-line */
export interface UploadComponent {}

export function UploadComponent(props: UploadComponent) {
  const description = [
    <Segment>Pellentesque habitant morbi tristique senectus.</Segment>,
  ];
  return (
    <div className="app-content-body ">
      <div style={{ background: '#fff', padding: '10px' }}>
      
        <div>
 
      
 <Form>

 <Grid columns={1}>
<Grid.Row>
<Grid.Column>
<Form.Field>
<label>Add files for complete cost</label>
</Form.Field>
</Grid.Column>

</Grid.Row>
</Grid>


<Grid columns={1}>
<Grid.Row>
<Grid.Column>
<Form.Field>
 
<div className="dashed_area">
  <div className="file-upload-message">
 
      <p className="file-upload-default-message">
      <img src={img}  className="mr-10 " />Drag & drop or click here to upload file</p>
    
      </div>
  <Input  type="file" className="file-upload-input" />
  </div>
 </Form.Field>
</Grid.Column> 
</Grid.Row>
</Grid>
 
 
</Form>

       </div>

   
      </div>
	
    </div>
  );
}

export default UploadComponent;
