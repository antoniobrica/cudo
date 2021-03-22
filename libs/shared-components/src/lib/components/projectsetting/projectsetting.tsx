import React from 'react';
 
import '../../../style/index.scss';
import { Tab,Grid,Card,Table,Form   } from 'semantic-ui-react'
import img4 from 'libs/shared-components/src/Burj-Khalifa.png';
import img5 from 'libs/shared-components/src/edit.png';
import img1 from 'libs/shared-components/src/green_people.png';

import img2 from 'libs/shared-components/src/online4.png';
import img3 from 'libs/shared-components/src/online3.png';
import img6 from 'libs/shared-components/src/online2.png';
import img7 from 'libs/shared-components/src/online1.png';

/* eslint-disable-next-line */
export interface TabsProps { }

export function ProjectSetting(props: TabsProps) {
 
    const panes = [
        {
          menuItem: { key: 'Overview', icon: 'file alternate outline', content: 'Project Information' },
          render: () => <Tab.Pane attached={false}>
              
              <div className="ui-tabs">
              <Grid columns={2}>
<Grid.Row>
  <Grid.Column >
 
    
      <div className="ui card" style={{width:'100%'}}>
            <div className="content">
               
            <div className="description"> 


                          
      <Form>
 
<Grid columns={3}>
<Grid.Row>
  <Grid.Column>
    <Form.Field>
    <img src={img4}  />
    </Form.Field>
  </Grid.Column>

  <Grid.Column>
    <Form.Field className="field_left">
    <span><strong>Burj Khalifa  </strong></span> <span><br/>John & Co.</span> <span style={{color:'#2D62ED'}}><br/> Estimate Cost: $5,000.00 - Total Cost: $5,000.00 </span>
            
    </Form.Field>
  </Grid.Column>
  <Grid.Column>
    <Form.Field>
    <span className="summary"><button className="ui mini button edit_btn">  <img src={img5}  /> Edit</button> 
                     </span> </Form.Field>
  </Grid.Column>
</Grid.Row>
</Grid>
</Form>
 
                </div>
 
                </div>
                <div>
                <Table celled className="default_table">
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell>Internal Project Number</Table.HeaderCell>
        <Table.HeaderCell>Type of Building</Table.HeaderCell>
        <Table.HeaderCell>Printing Company</Table.HeaderCell>
      </Table.Row>
    </Table.Header>

    <Table.Body>
      <Table.Row>
        <Table.Cell >Bern</Table.Cell>
        <Table.Cell>8090</Table.Cell>
        <Table.Cell>Switzerland</Table.Cell>
      </Table.Row>

   
    </Table.Body>
  </Table>
                </div>
                <div>

                <Table celled className="default_table">
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell>City</Table.HeaderCell>
        <Table.HeaderCell>State Pin</Table.HeaderCell>
        <Table.HeaderCell>Country</Table.HeaderCell>
        <Table.HeaderCell>Address</Table.HeaderCell>
      </Table.Row>
    </Table.Header>

    <Table.Body>
      <Table.Row>
        <Table.Cell >Bern</Table.Cell>
        <Table.Cell>8090</Table.Cell>
        <Table.Cell>Switzerland</Table.Cell>
        <Table.Cell> Müller Ltd, Mr R. Bürki Zollikerstrasse 788  
8008 Zurich</Table.Cell>
        
      </Table.Row>

   
    </Table.Body>
  </Table>

                </div>
                <div className="content" style={{borderTop:'none'}}>
                    <div className="data-built"> 
                   
                    <p> The building utilizes wrapped glass facades on the east, north, and west both for aesthetics and to reduce the amount of reflective surface area on the south facade, which also features brushed Jura limestone. </p>
                    </div>
                    <div>
                        <br/>
                        <p style={{color:'#000'}}>Work Type</p>
                        <button className="ui mini button btn_work_type  ">Electrical Work</button>
                        <button className="ui mini button  btn_work_type">HVAC Work</button>
                       
                    </div>
                    </div>
                   
                    </div>
 
     
                    
        
  </Grid.Column>
  <Grid.Column>
  
      <div className="ui card" style={{height:'426px', display: 'table-cell'}}>
            <div className="content">
           
            <div className="description"> <img src={img1}  /> People (4)
               
                </div>
                 
              
                </div>
                <div className="content">
                <img src={img2}  />
                <img src={img3}  />
                <img src={img6}  />
                <img src={img7}  />
                    
                    </div>
                   
                    </div>

                    
     
  </Grid.Column>
 
  </Grid.Row>
  </Grid>
              </div>
           
            
          </Tab.Pane>,
        },
        {
          menuItem: { key: 'Task', icon: 'shield alternate', content: 'Project Structure' },
          render: () => <Tab.Pane attached={false}>  Task</Tab.Pane>,
        },
        {
           
          menuItem: { key: 'Planning', icon: 'flag outline', content: 'File Naming Structure' },
          render: () => <Tab.Pane attached={false}>Planning</Tab.Pane>,
        },
       
      ]
      
  return (
    <div className="app-content-body-dash navbar-collapse box-shadow bg-white-only" style={{background:'#e6e6e6'}}>
        <div> 
          <span className="preliminary-font">Project Setting</span>
         </div>
            
         <Tab className="ui-tabs" menu={{ secondary: true, pointing: true }} panes={panes} />
 
    </div>
        
    
        


        
 
  );
}

export default ProjectSetting;
