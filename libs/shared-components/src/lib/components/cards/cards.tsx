import React from 'react';
 
import '../../../style/index.scss';
import { Card, Icon,Form, Grid } from 'semantic-ui-react'

/* eslint-disable-next-line */
export interface CardProps { }

export function Cardbar(props: CardProps) {

    const description = [
         
      ] 
  return (
    <div className="app-content-body ">
        <div>
            <h2 className="project">All Projects</h2>
            <span className="total">Total 3 project added</span>
         </div>
         <Form>
         <Grid columns={4}>
<Grid.Row>
  <Grid.Column>
  <Card>
      <div className="ui card">
            <div className="content">
            <div className="description"><img src="" alt="Logo"></img>
                <span className="summary"><span className="dot">...</span>
                     </span>
                </div>
                <div className="header font-header">Burj Khalifa</div>
                <div className="description">John & co.</div>
                <div className="data-built">Type of building
                <span className="summary">Residential Buildings
                    
                    </span>
                </div>
                 
                <div className="data-built">Level of building
                <span className="summary">3rd
                    
                    </span>
                </div>
              
                </div>
                <div className="content">
                    <div className="data-built"> 
                   
                    <p> This is description will be show sunt in culpa qui officia deserunt mollit anim id est laborum...</p>
                    </div>
                    <div className="event">
                        <div className="label-green label-spacer">
                           <span className="white-text">AB</span>
                            </div>
                            <div className="label-purple label-spacer">
                           <span className="white-text ">RJ</span>
                            </div>
                            <div className="label-blue label-spacer">
                           <span className="white-text">JB</span>
                            </div>
                       </div>
                    </div>
                   
                    </div>

                    
        </Card>
  </Grid.Column>
  <Grid.Column>
  <Card>
      <div className="ui card">
            <div className="content">
            <div className="description"><img src="" alt="Logo"></img>
                <span className="summary"><span className="dot">...</span>
                     </span>
                </div>
                <div className="header font-header">Shanghai Tower</div>
                <div className="description">John & co.</div>
                <div className="data-built">Type of building
                <span className="summary">Residential Buildings
                    
                    </span>
                </div>
                 
                <div className="data-built">Level of building
                <span className="summary">3rd
                    
                    </span>
                </div>
              
                </div>
                <div className="content">
                    <div className="data-built">  
                    
                    <p> This is description will be show sunt in culpa qui officia deserunt mollit anim id est laborum...</p>
                    </div>
                    <div className="event">
                        <div className="label-light-blue label-spacer">
                           <span className="white-text">NP</span>
                            </div>
                            <div className="label-orange label-spacer">
                           <span className="white-text ">BP</span>
                            </div>
                            
                       </div>
                    </div>
                   
                    </div>

                    
        </Card>
  </Grid.Column>

  <Grid.Column>
  <Card>
      <div className="ui card">
            <div className="content">
            <div className="description"><img src="" alt="Logo"></img>
                <span className="summary"><span className="dot">...</span>
                     </span>
                </div>
                <div className="header font-header">Ping An Finance Center</div>
                <div className="description">John & co.</div>
                <div className="data-built">Type of building
                <span className="summary">Residential Buildings
                    
                    </span>
                </div>
                 
                <div className="data-built">Level of building
                <span className="summary">3rd
                    
                    </span>
                </div>
              
                </div>
                <div className="content">
                    <div className="data-built"> 
                    
                    <p> This is description will be show sunt in culpa qui officia deserunt mollit anim id est laborum...This is description will be show sunt in culpa qui officia deserunt mollit anim id est laborum
                    qui officia deserunt mollit anim id est laborum...This is description will be show sunt in culpa qui officia deserunt mollit anim id est laborum
                    </p>
                    </div>
                    <div className="event">
                        <div className="label-light-purple label-spacer">
                           <span className="white-text ">ZP</span>
                            </div>
                            
                            
                       </div>
                    </div>
                   
                    </div>

                    
        </Card>
  </Grid.Column>
  </Grid.Row>
  </Grid>

         </Form>
 

        

    </div>
        
    
 
  );
}

export default Cardbar;
