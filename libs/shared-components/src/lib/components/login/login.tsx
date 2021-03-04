import React from 'react';
 
import '../../../style/index.scss';
import {Select, Input, Segment,Form, Grid ,Image,Checkbox,Button,Icon } from 'semantic-ui-react'
import logo from 'libs/shared-components/src/slider.png';
import img from 'libs/shared-components/src/Shape 2.png';
/* eslint-disable-next-line */
export interface LoginProps { 
    login
}

export function Loginbar(props: LoginProps) {
 
    const description = [
         
      ] 
      const handleLogin =()=>{
        props.login();
      }
  return (
    <div className="app-content-body ">
        
        <div className="main-outer-area">
 
            <Grid className="ui-login">
                    
            <Grid.Row columns={2}  >
      <Grid.Column>
             <Segment>
             <div className="ln-form-outer">
             
             <img src={img}   />
                    <div className="form-header">
                    
                        <span className="welcome">Welcome Back</span>
                    <h2 className="login">Login to your account</h2>
                    
                    </div>

                    <div className="form-inner">

                    <Form>
                        <Form.Field>
                            
                            <Input placeholder='example@domain.com' className="full-width" icon='at' />
                        </Form.Field>
                        <Button size='large' className="grey-btn btn-large" onClick={handleLogin}>Next <Icon name='arrow right' />   </Button>
                         
 
                        </Form>
                    </div>  

              </div>
            </Segment>
            </Grid.Column>
            <Grid.Column>
       
        <img src={logo} className="massive" />
       
      </Grid.Column>
            </Grid.Row>
             
            </Grid>
 
          
        </div>

        

    </div>
        
    
 
  );
}

export default Loginbar;
