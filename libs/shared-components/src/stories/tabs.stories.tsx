import React from 'react';
import { storiesOf } from '@storybook/react';
import { Grid, Header, Segment, Tab } from 'semantic-ui-react';

const panes = [
  { menuItem: 'Tab 1', render: () => <Tab.Pane>Overview</Tab.Pane> },
  { menuItem: 'Tab 2', render: () => <Tab.Pane>Task</Tab.Pane> },
  { menuItem: 'Tab 3', render: () => <Tab.Pane>Planning</Tab.Pane> },
  { menuItem: 'Tab 4', render: () => <Tab.Pane>Cost</Tab.Pane> },
  { menuItem: 'Tab 5', render: () => <Tab.Pane>Tender</Tab.Pane> },
  { menuItem: 'Tab 6', render: () => <Tab.Pane>Meetings</Tab.Pane> },
  { menuItem: 'Tab 7', render: () => <Tab.Pane>Files</Tab.Pane> },
  { menuItem: 'Tab 8', render: () => <Tab.Pane>Question</Tab.Pane> },
  { menuItem: 'Tab 9', render: () => <Tab.Pane>People</Tab.Pane> },
  { menuItem: 'Tab 10', render: () => <Tab.Pane>Settings</Tab.Pane> },
  { menuItem: 'Tab 11', render: () => <Tab.Pane>Messages</Tab.Pane> }
]


storiesOf('components/Tabs', module)
    .add('Default ', () => <Segment className="ui-kit">
        <Header as='h2' className="mt-1">Tabs</Header>
        <div><div className="ui pointing secondary menu">
        <a className="item"> <span className="material-icons">list_alt</span>Overview</a>
        <a className="item"><span className="material-icons">task_alt</span>Task</a>
        <a className="active item"><span className="material-icons">outlined_flag</span>Planning</a>
        <a className="item"><span className="material-icons">payments</span>Cost</a>
        <a className="item"><span className="material-icons">gavel</span>Tender</a>
        <a className="item"><span className="material-icons">event_available</span>Meetings</a>
        <a className="item"><span className="material-icons">folder_open</span>Files</a>
        <a className="item"><span className="material-icons">help_outline</span>Question</a>
        <a className="item"><span className="material-icons">person_outline</span>People</a>
        <a className="item"><span className="material-icons">settings</span>Settings</a>
        <a className="item"><span className="material-icons">message</span>Messages</a>
        
        </div>
        <div className="ui segment active tab">Tab 1 Content</div></div>

    </Segment>
    )