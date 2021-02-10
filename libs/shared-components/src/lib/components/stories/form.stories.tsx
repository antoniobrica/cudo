import React from 'react';
import { storiesOf } from '@storybook/react';
 
import { Header, Button, Segment, Divider, Input, Form, Grid, Checkbox, Dropdown, Select, TextArea } from 'semantic-ui-react';
 



const languageOptions = [
  { key: 'english', text: 'English', value: 'english' },
  { key: 'hindi', text: 'Hindi', value: 'hindi' },
  { key: 'punjabi', text: 'Punjabi', value: 'punjabi' },
]


const countryOptions = [
  { key: 'af', value: 'af', text: 'Afghanistan' },
  { key: 'ax', value: 'ax', text: 'Aland Islands' },
  { key: 'al', value: 'al', text: 'Albania' },
  { key: 'dz', value: 'dz', text: 'Algeria' },
  { key: 'as', value: 'as', text: 'American Samoa' },
  { key: 'ad', value: 'ad', text: 'Andorra' },
  { key: 'ao', value: 'ao', text: 'Angola' },
  { key: 'ai', value: 'ai', text: 'Anguilla' },
  { key: 'ag', value: 'ag', text: 'Antigua' },
  { key: 'ar', value: 'ar', text: 'Argentina' },
  { key: 'am', value: 'am', text: 'Armenia' },
  { key: 'aw', value: 'aw', text: 'Aruba' },
  { key: 'au', value: 'au', text: 'Australia' },
  { key: 'at', value: 'at', text: 'Austria' },
  { key: 'az', value: 'az', text: 'Azerbaijan' },
  { key: 'bs', value: 'bs', text: 'Bahamas' },
  { key: 'bh', value: 'bh', text: 'Bahrain' },
  { key: 'bd', value: 'bd', text: 'Bangladesh' },
  { key: 'bb', value: 'bb', text: 'Barbados' },
  { key: 'by', value: 'by', text: 'Belarus' },
  { key: 'be', value: 'be', text: 'Belgium' },
  { key: 'bz', value: 'bz', text: 'Belize' },
  { key: 'bj', value: 'bj', text: 'Benin' },
]

storiesOf('components/Form', module)
    .add('Input ', () => <div>
      <Segment className="ui-kit">
         
        <Form>
        <Grid columns={2}>
            <Grid.Row>
              <Grid.Column>
                <Form.Field>
                  <label>Default</label>
                  <Input placeholder='Default' size='small' className="full-width" type="text" />
                </Form.Field>
              </Grid.Column>

              <Grid.Column>
                <Form.Field>
                  <label>Disabled Input</label>
                  <Input placeholder='Disabled' size='small' className="full-width" disabled />
                </Form.Field>
              </Grid.Column>
            </Grid.Row>
          </Grid>


          <Grid columns={2}>
            <Grid.Row>
              <Grid.Column>
                <Form.Field>
                  <label>Default</label>
                  <Input placeholder='Default' className="full-width" type="text" />
                </Form.Field>
              </Grid.Column>

              <Grid.Column>
                <Form.Field>
                  <label>Disabled Input</label>
                  <Input placeholder='Disabled' className="full-width" disabled />
                </Form.Field>
              </Grid.Column>
            </Grid.Row>

            <Grid.Row>
              <Grid.Column>
                <Form.Field error>
                  <label>error Input</label>
                  <Input placeholder='Active' className="full-width" size='small' />
                   
                </Form.Field>
              </Grid.Column>

              <Grid.Column>
                <Form.Field>
                  <label>Loader Input</label>
                   <Input loading icon='user' placeholder='Search...' size='small' />
                </Form.Field>
              </Grid.Column>

            </Grid.Row>
            
                


            <Grid.Row>
              <Grid.Column>
                <Form.Field error>
                  <label>error Input</label>
                  <Input placeholder='Active' className="full-width" />
                  
                </Form.Field>
              </Grid.Column>

              <Grid.Column>
                <Form.Field>
                  <label>Loader Input</label>
                   <Input loading icon='user' placeholder='Search...' />
                </Form.Field>
              </Grid.Column>

            </Grid.Row>

             
            <Grid.Row>

              <Grid.Column>
                <Form.Field className="input-with-icon left-icon">
                  <label>Icon Input</label>
                  <Input placeholder='with user image' className="full-width" type="text" />
                   
                  <img className="material-icons icon" src="../stories/assets/user_image.svg"></img>
  
                </Form.Field>
              </Grid.Column>

              <Grid.Column>
                <Form.Field className="input-with-icon">
                  <label>Password Input</label>
                  <Input placeholder='******' className="full-width" type="password" />
                  <span className="material-icons icon">visibility</span>
                </Form.Field>
              </Grid.Column>

            </Grid.Row>

            {/* <Grid.Row>
              <Grid.Column>
                <Form.Field className="search-input">
                  <label>Search Input</label>
                  <div className="input-inner">
                    <Input placeholder='Search Company here' className="full-width" />
                    <Button icon className="search-button">
                      <span className="material-icons">search</span>
                    </Button>
                  </div>
                </Form.Field>
              </Grid.Column>

              <Grid.Column>

              </Grid.Column>

            </Grid.Row> */}

          </Grid>
  
        </Form>
      </Segment>
    </div>
    )

    .add('Select Input', () =>
        <Segment className="ui-kit">
            <Header as='h2' className="mt-1">Default Select Box</Header>
 
            <Grid columns={2}>
              <Grid.Row>
                <Grid.Column>
                  <Form.Field className="w-100">
                    <label>Default Select</label>
                    <Select placeholder='Select' options={countryOptions} />
                  </Form.Field>
                </Grid.Column>

                <Grid.Column>
                  <Form.Field className="w-100">
                    <label>Disabled Input</label>
                    <Select placeholder='Select' disabled options={countryOptions} />
                  </Form.Field>
                </Grid.Column>
              </Grid.Row>

              <Grid.Row>
                <Grid.Column>
                  <Form.Field className="w-100">
                    <label>Default Select</label>
                    <Select placeholder='Select' className="small" options={countryOptions} />
                  </Form.Field>
                </Grid.Column>

                <Grid.Column>
                  <Form.Field className="w-100">
                    <label>Disabled Input</label>
                    <Select placeholder='Select' className="small" disabled options={countryOptions} />
                  </Form.Field>
                </Grid.Column>
              </Grid.Row>


              <Grid.Row>
                <Grid.Column>
                  <Form.Field className="w-100">
                    <label>Default Active</label>
                    <Select placeholder='Select' className="small" options={countryOptions} />
                  </Form.Field>
                </Grid.Column>
 
              </Grid.Row>
              {/* <Grid.Row>
                <Grid.Column>
                  <Form.Field>
                    <label>Multiple select</label>
                    <Dropdown placeholder='Select Language' fluid multiple selection options={languageOptions} />
                  </Form.Field>
                </Grid.Column>

                <Grid.Column>
                  <Form.Field>
                    <label>Disabled Multiple select</label>
                    <Dropdown placeholder='Select Language' disabled fluid multiple selection options={languageOptions} />
                  </Form.Field>
                </Grid.Column>
              </Grid.Row> */}
              
            </Grid>
 
        </Segment>
    )
    .add('Checkbox / Radio', () =>
        <Segment className="ui-kit">
            <Header as='h2' className="mt-1">Checkbox</Header>
            <Grid>
              <Grid.Row>
                <Grid.Column>
                  <Form.Field className="agree-checkbox">
                    <Checkbox label='Primary Checkbox' />
                  </Form.Field>

                  <Form.Field>
                    <Checkbox label='Disabled' disabled />
                  </Form.Field>

                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column>
                  <Form.Field className="agree-checkbox">
                    <Checkbox toggle />
                  </Form.Field>

                  <Form.Field>
                    <Checkbox toggle label='Disabled' disabled />
                  </Form.Field>

                </Grid.Column>
              </Grid.Row>
            </Grid>

            <Header as='h2'>Radio Checkbox</Header>
            <Grid>
              <Grid.Row>
                <Grid.Column>
                  <Form.Field>
                    <Checkbox
                      radio
                      label='Choose this'
                      name='checkboxRadioGroup'
                      value='this'
                    />
                  </Form.Field>
                  <Form.Field>
                    <Checkbox
                      radio
                      label='Or that'
                      name='checkboxRadioGroup'
                      value='that'
                    />
                  </Form.Field>
                  <Form.Field>
                    <Checkbox
                      radio
                      label='Disabled'
                      name='checkboxRadioGroup'
                      value='that'
                      disabled
                    />
                  </Form.Field>
                </Grid.Column>
              </Grid.Row>
            </Grid>
        </Segment>
    )
    .add('Textarea', () =>
        <Segment className="ui-kit">
            <Header as='h2' className="mt-1">Textarea</Header>
            <Grid>
              <Grid.Row>
                <Grid.Column>
                  <Form>
                    <Form.Field>
                      <label>Default Textarea</label>
                      <TextArea placeholder='Tell us more' />
                    </Form.Field>
                  </Form>
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column>
                  <Form>
                    <Form.Field>
                      <label>Large Textarea</label>
                      <TextArea placeholder='Tell us more' className="large" />
                    </Form.Field>
                  </Form>
                </Grid.Column>
              </Grid.Row>
            </Grid>

        </Segment>
    )


    