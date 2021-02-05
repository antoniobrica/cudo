import React from 'react';
import { storiesOf } from '@storybook/react';
import { Button, Header, Segment, Icon } from 'semantic-ui-react';

storiesOf('components/Button', module)
    .add('Small', () => <div>
        <Segment className="ui-kit">
            <Header as='h2'>Extra Small buttons</Header>
            <Button size='mini' className="grey-btn">Primary Button</Button>
            <Button size='mini' primary>Secondary Button</Button>
            <Button size='mini' className="border-btn">Border Button</Button>
            <Button size='mini' className="button-cancel">Cancel</Button>
            <Button size='mini' disabled>Disabled</Button>
            <Button size='mini' className="icon-btn"><i aria-hidden="true" className="world icon"></i>Add New</Button>
            <Button size='mini' className="icon-border"> Button</Button>
            {/* <Button size='mini' color='red'>Red</Button> */}

            <Header as='h2'>Small buttons</Header>
            <Button size='small' className="grey-btn">Primary Button</Button>
            <Button size='small' primary>Secondary Button</Button>
            <Button size='small' className="border-btn">Border Button</Button>
            <Button size='small' className="button-cancel">Cancel</Button>
            <Button size='small' disabled>Disabled</Button>
            <Button size='small' className="icon-btn"><i aria-hidden="true" className="world icon"></i>Add New</Button>
            <Button size='small' className="icon-border"> Button</Button>
            {/* <Button size='small' color='red'>Red</Button> */}
        </Segment>
    </div>)
    
    .add('Medium', () =>
        <Segment className="ui-kit">
            <Header as='h2'>Medium flat buttons</Header>
            <Button size='medium' className="grey-btn">Primary Button</Button>
            <Button size='medium' primary>Secondary Button</Button>
            <Button size='medium' className="border-btn">Border Button</Button>
            <Button size='medium' className="button-cancel">Cancel</Button>
            <Button size='medium' disabled>Disabled</Button>
            <Button size='medium' className="icon-btn"><i aria-hidden="true" className="world icon"></i>Add New</Button>
            <Button size='medium' className="icon-border"> Button</Button>
            {/* <Button size='medium' color='red'>Red</Button> */}

        </Segment>
    )
    .add('Large', () =>
        <Segment className="ui-kit">
            <Header as='h2'>Large flat buttons</Header>
            <Button size='large' className="grey-btn">Primary Button</Button>
            <Button size='large' primary>Secondary Button</Button>
            <Button size='large' className="border-btn">Border Button</Button>
            <Button size='large' className="button-cancel">Cancel</Button>
            <Button size='large' disabled>Disabled</Button>
            <Button size='large' className="icon-btn"><i aria-hidden="true" className="world icon"></i>Add New</Button>
            <Button size='large' className="icon-border"> Button</Button>
            {/* <Button size='large' color='red'>Red</Button> */}
        </Segment>
    )
  
