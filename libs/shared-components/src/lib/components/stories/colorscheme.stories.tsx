import React from 'react';
import { storiesOf } from '@storybook/react';
import { Grid, Header, Segment, Form, Input } from 'semantic-ui-react';
  


storiesOf('components/Color Scheme', module)
    .add('with Palette ', () => <Segment className="ui-kit">
        <Header as='h2' className="mt-1 black-text">Text&Background Palette</Header>
        <div className="color-palette">
            
            <div className="column ">
                <div className="box grey-60-cl white-text">
                    #2D62ED
                </div>
                 
            </div>

            <div className="column">
                <div className="box grey-mb white-text">
                    #1B1B40
                </div>
                
            </div>

            <div className="column">
                <div className="box blue-mb white-text">
                    #718898
                </div> 
            </div>

            <div className="column">
                <div className="box yellow-mb white-text">
                    #9FB5C5
                </div>
               
            </div>

            <div className="column">
                <div className="box yellow-mb-3">
                    #D0D8DF
                </div>
               
            </div>

            <div className="column">
                <div className="box green-mb white-text">
                    #E0E6EB
                </div>
               
            </div>

            <div className="column">
                <div className="box green-dark white-text">
                    #CEE8FF
                </div>
              
            </div>

            <div className="column">
                <div className="box red-mb white-text">
                    #DCEFFF
                </div>
               
            </div>

            <div className="column">
                <div className="box white-smoke-mb">
                    #F1F5F8
                </div>
               
            </div>

            <div className="column">
                <div className="box lavender-blue">
                    #F3F3F3
                </div>
               
            </div>
 
        </div>

        <Header as='h2' className="mt-1 black-text">Selection&Highlight Palette</Header>
        <div className="color-palette">
            
            <div className="column ">
                <div className="box green-highlight white-text">
                    #37BA77
                </div>
                 
            </div>

            <div className="column">
                <div className="box pink-highlight white-text">
                    #E99898
                </div>
                
            </div>

            <div className="column">
                <div className="box light-orange-highlight white-text">
                    #FFE6C7
                </div> 
            </div>

            <div className="column">
                <div className="box green-light-highlight white-text">
                    #C8F6DF
                </div>
               
            </div>
 
 
        </div>

    </Segment>

        

    )