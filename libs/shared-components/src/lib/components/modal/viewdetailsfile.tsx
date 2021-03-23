import React from 'react'
import { Button,Pagination, Modal,Input, Form, Grid, Image,Comment, Select, TextArea} from 'semantic-ui-react'

import img from 'libs/shared-components/src/check_grey.png';

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
        <Button className="grey-btn" onClick={() => dispatch({ type: 'open', size: 'fullscreen' })}>
           view Files
        </Button>
  
        <Modal
          size={size}
          open={open}
          onClose={() => dispatch({ type: 'close' })}
        >
          <Modal.Content>
          <Form>
<Grid columns={2}>
<Grid.Row>
  <Grid.Column>
    <div>
    <Image src='https://react.semantic-ui.com/images/wireframe/image.png' fluid />
    <div className="align_center">File versions
    <Pagination
    defaultActivePage={1}
    firstItem={null}
    lastItem={null}
    pointing
    secondary
    totalPages={3}
  /> </div>
    </div>
  </Grid.Column>
  <Grid.Column>
    <div>


    <Form>
        <Grid columns={1}>
            <Grid.Row>
                <Grid.Column>
                    <Form.Field>
                        
    <label className="file_label">File Details</label>
                    </Form.Field>
                </Grid.Column>
            </Grid.Row>
        </Grid>
        <Grid columns={2}>
            <Grid.Row>
                <Grid.Column>
                    <Form.Field>
                        
    <label>Uploaded on</label>
    <p className="form_desc">20 Oct, 2020</p>
                    </Form.Field>
                </Grid.Column>
                <Grid.Column>
                    <Form.Field>
                        
    <label>Uploaded by</label>
    <p className="form_desc">John Smith</p>
                    </Form.Field>
                </Grid.Column>
            </Grid.Row>
        </Grid>

        <Grid columns={1} className="border">
<Grid.Row>
  <Grid.Column>
    <Form.Field>
        
       <label>File versions(2)</label>
       <p className="form_desc_2">Version 2- <span className="git_area">2302101_version_03647.pptx </span></p>
       <p className="form_desc_2 git">By: John Smith - Uploaded on: 20 sep,2021
       <i className="ms-Icon ms-Icon--RedEye right_float" aria-hidden="true"></i> 
       </p> 
      
    </Form.Field>
  </Grid.Column>
 
</Grid.Row>
</Grid>
<Grid columns={1}>
<Grid.Row>
  <Grid.Column>
    <Form.Field>
        
       <label>File versions(2)</label>
       <p className="form_desc_2">Version 1- <span className="git_area">2302101_version_03647.pptx </span></p>
       <p className="form_desc_2 git">By: John Smith - Uploaded on: 20 sep,2021
       <i className="ms-Icon ms-Icon--RedEye right_float" aria-hidden="true"></i> 
       </p> 
      
    </Form.Field>
  </Grid.Column>
 
</Grid.Row>
</Grid>

<Grid columns={1}>
<Grid.Row>
  <Grid.Column>
    <Form.Field>
        
       <label>Task(1)</label>
      
       <p> <img src={img}  className="mr-10 " /><span className="form_desc_2_1"> Another task here </span> <span className="git_area">2302101_version_03647.pptx </span></p>
       <p className="form_desc_2 git">Starts Tomorrow ↦ Due Fri Aug 28th
       <span className="mr-2 float_right"  >...</span>
       </p> 
       <p className="form_desc_2 git">Strategic Planning  -  Paint Work </p>
      
    </Form.Field>
  </Grid.Column>
 
</Grid.Row>
</Grid>

<Grid columns={1}>
<Grid.Row>
  <Grid.Column>
    <Form.Field>
        <a href="">+ Add new task</a>
        
    </Form.Field>
  </Grid.Column>
 
</Grid.Row>
</Grid>

<Grid columns={1}>
<Grid.Row>
  <Grid.Column>
    <Form.Field>
      <label>Comments (2)  </label>
      <Input placeholder='click to add comment' size='small' className="full-width" type="text" />
    </Form.Field>
  </Grid.Column>
 
</Grid.Row>
</Grid> 

<Grid columns={1}>
<Grid.Row>
  <Grid.Column>
    <Form.Field>
   
    <Comment.Group>
    <Comment>
      <Comment.Avatar as='a' src='https://react.semantic-ui.com/images/avatar/small/stevie.jpg' />
      <Comment className="comment_margin">
        <Comment.Author>Stevie Feliciano</Comment.Author>
        <Comment.Metadata className="float_right">
          <div >2 days ago</div>
           
        </Comment.Metadata>
        <Comment.Text>
          Hey guys, I hope this example comment is helping you read this
          documentation.
        </Comment.Text>
      </Comment>
    </Comment>
  </Comment.Group>
    </Form.Field>
  </Grid.Column>
 
</Grid.Row>
</Grid> 
</Form>

    </div>
  </Grid.Column>
</Grid.Row>
</Grid> 
 
</Form>
         
         
          </Modal.Content>
         
        </Modal>
        </div>
      </>
    )
  }
  
  export default ModalExampleSize