import React from 'react';
import { storiesOf } from '@storybook/react';
import { Card, Icon, Segment } from 'semantic-ui-react';
 
  
storiesOf('components/cards', module)
    .add('cards ', () => <Segment className="ui-kit">
         
        <div className="ui card">
            <div className="content">
            <div className="description"><img src="" alt="Logo"></img>
                <span className="summary"><span className="dot">...</span>
                    
                    </span>
                </div>
                <div className="header">Burj Khalifa</div>
                <div className="description">John & co.</div>
                <div className="description">Type of building
                <span className="summary">Residential Buildings
                    
                    </span>
                </div>
                 
                <div className="description">Level of building
                <span className="summary">3rd
                    
                    </span>
                </div>
              
                </div>
                <div className="content">
                    <div className="description"> This is description will be show sunt in culpa qui officia deserunt mollit anim id est laborum...</div>
                    <div className="event">
                        <div className="label-green">
                           <span className="white-text">AB</span>
                            </div>
                            <div className="label-purple">
                           <span className="white-text">RJ</span>
                            </div>
                            <div className="label-blue">
                           <span className="white-text">JB</span>
                            </div>
                       </div>
                    </div>
                   
                    </div>


    </Segment>
    )