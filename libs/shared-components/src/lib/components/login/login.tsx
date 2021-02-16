import React from 'react';
 
import '../../../style/index.scss';
import { Input, Segment,Form, Grid ,Image,Checkbox,Button,Icon } from 'semantic-ui-react'
 
/* eslint-disable-next-line */
export interface LoginProps { }

export function Loginbar(props: LoginProps) {

    const description = [
         
      ] 
  return (
    <div className="app-content-body ">
        
        <div className="main-outer-area">
 
            <Grid>
                    
            <Grid.Row columns={2}  >
      <Grid.Column>
             <Segment>
             <div className="ln-form-outer">
             <img src="" alt="logo"></img>
                    <div className="form-header">
                    
                        <span className="welcome">Welcome Back</span>
                    <h2 className="login">Login to your account</h2>
                    
                    </div>

                    <div className="form-inner">

                    <Form>
                        <Form.Field>
                            
                            <Input placeholder='example@domain.com' className="full-width" icon='at' />
                        </Form.Field>

                        <Form.Field className="input-with-icon">
                            
                            <Input placeholder='Password...' className="full-width" type="password" icon='lock' />
                            
                        </Form.Field>
                    
                        <Form.Field>
                        <Checkbox label='Remember Me'   />
                        <a href="" className="forgot">Forgot password?</a>
                        </Form.Field>
                        <Form.Field>
                        <Button size='large' className="grey-btn btn-large">Log In <Icon name='arrow right' />   </Button>
                            </Form.Field>

                        </Form>
                    </div>

              </div>
            </Segment>
            </Grid.Column>
            <Grid.Column>
        <Image src='~/../Project Management/apps/ui-design/src/app/slider.png' size='massive' />
      </Grid.Column>
            </Grid.Row>
             
            </Grid>
 
          
        </div>

        

    </div>
        
    
 
  );
}

export default Loginbar;
