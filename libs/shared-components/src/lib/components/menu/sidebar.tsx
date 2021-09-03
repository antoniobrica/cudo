import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import './../../../assets/style/index.scss'
import { Icon, Sidebar, Accordion, Form, Dropdown } from 'semantic-ui-react'

const ColorForm = (
  <Form>
    <Form.Group grouped>
      <Form.Checkbox label='Red' name='color' value='red' />
    </Form.Group>
  </Form>
)

const SizeForm = (
  <Form>
    <Form.Group grouped>
      <Form.Radio label='Small' name='size' type='radio' value='small' />
    </Form.Group>
  </Form>
)
/* eslint-disable-next-line */
interface MyProps {
  workTypeData?,
  changeWorktypeName?
  t?
}
export class AccordionExampleMenu extends Component<MyProps> {
  state = {
    activeIndex: 0,
    worktypes: [],
    worktypeValue: '',
  }
  componentDidMount() {
    this.setState({ worktypes: this.props.workTypeData?.projectById[0].projectWorkTypes })
    this.setState({ worktypeValue: this.props.workTypeData?.projectById[0].projectWorkTypes[0].workTypeName })
  }
  handleClick = (titleProps, worktype) => {
    const { index } = titleProps
    const { activeIndex } = this.state
    const newIndex = activeIndex === index ? -1 : index

    this.setState({ activeIndex: titleProps });
    const value = this.state.worktypes[activeIndex + 1].workTypeName;
    this.setState({ worktypeValue: value });
    this.props.changeWorktypeName(value);
  }

  render() {
    const { t } = this.props
    const { activeIndex } = this.state
    return (
      <div className="sidebar-wrapper sidebar-theme">
        <div className="sidebar-header-project-name">
          <span className="project-name">Burj Khalifa</span>
          <span className="summary"><span className="dot">...</span></span>
        </div>
        <div className="project-sub-heading">John &amp; co.</div>
        <Accordion className="ui-accordion accordion-top">
          {(this.state.worktypes || []).map((worktype, i) => {
            return (
              <div key={i} className="sidebar-menu-item">
                <Accordion.Title
                  active={activeIndex === i}
                  index={i}
                  onClick={() => this.handleClick(i, worktype)}
                  className="active-title sidebar-menu-heading"
                >
                  {worktype.workTypeName} <span className="workspan">({i + 1}/{this.state.worktypes.length}) </span>  <Icon name='angle down' />
                </Accordion.Title>
                <Accordion.Content className="active-title menu-sub-option" active={activeIndex === i}>
                  <ul>
                    <li className="done">
                      <span className="strategic_plan">{t("project_tab_menu.strategic_planning")}</span>
                      <span className="dots_area">
                        <div className="symbol-group symbol-hover py-2" >
                          <div className="symbol symbol-30 d-flex">
                            <span className="dropdown-action">
                              <Dropdown icon='ellipsis horizontal' pointing='left'>
                                <Dropdown.Menu>
                                  <Dropdown.Item icon="check circle outline" text={t("project_tab_menu.mark_complete")} />
                                  <Dropdown.Item icon="pencil" text={t("project_tab_menu.add_task")} />
                                  <Dropdown.Item
                                    icon="trash alternate outline"
                                    text={t("project_tab_menu.add_file")}
                                  />
                                </Dropdown.Menu>
                              </Dropdown>
                            </span>
                          </div>
                        </div>
                      </span>
                    </li>
                    <li className="active">
                      <span className="strategic_plan">{t("project_tab_menu.preiminary_studies")}</span>
                      <span className="dots_area">
                        <div className="symbol-group symbol-hover py-2" >
                          <div className="symbol symbol-30 d-flex">
                            <span className="dropdown-action">
                              <Dropdown icon='ellipsis horizontal' pointing='left'>
                                <Dropdown.Menu>
                                  <Dropdown.Item icon="check circle outline" text={t("project_tab_menu.mark_complete")} />
                                  <Dropdown.Item icon="pencil" text={t("project_tab_menu.add_task")} />
                                  <Dropdown.Item
                                    icon="trash alternate outline"
                                    text={t("project_tab_menu.add_file")}
                                  />
                                </Dropdown.Menu>
                              </Dropdown>
                            </span>
                          </div>
                        </div>
                      </span>
                    </li>
                    <li>
                      <span className="strategic_plan">{t("project_tab_menu.project_plannings")} </span>
                      <span className="dots_area">
                        <div className="symbol-group symbol-hover py-2" >
                          <div className="symbol symbol-30 d-flex">
                            <span className="dropdown-action">
                              <Dropdown icon='ellipsis horizontal' pointing='left'>
                                <Dropdown.Menu>
                                  <Dropdown.Item icon="check circle outline" text={t("project_tab_menu.mark_complete")} />
                                  <Dropdown.Item icon="pencil" text={t("project_tab_menu.add_task")} />
                                  <Dropdown.Item
                                    icon="trash alternate outline"
                                    text={t("project_tab_menu.add_file")}
                                  />
                                </Dropdown.Menu>
                              </Dropdown>
                            </span>
                          </div>
                        </div>
                      </span>
                    </li>
                    <li>
                      <span className="strategic_plan">{t("project_tab_menu.tender.title")}</span>
                      <span className="dots_area">
                        <div className="symbol-group symbol-hover py-2" >
                          <div className="symbol symbol-30 d-flex">
                            <span className="dropdown-action">
                              <Dropdown icon='ellipsis horizontal' pointing='left' floating>
                                <Dropdown.Menu>
                                  <Dropdown.Item icon="check circle outline" text={t("project_tab_menu.mark_complete")} />
                                  <Dropdown.Item icon="pencil" text={t("project_tab_menu.add_task")} />
                                  <Dropdown.Item
                                    icon="trash alternate outline"
                                    text={t("project_tab_menu.add_file")}
                                  />
                                </Dropdown.Menu>
                              </Dropdown>
                            </span>
                          </div>
                        </div>
                      </span>
                    </li>
                    <li>
                      <span className="strategic_plan">{t("project_tab_menu.realization")}</span>
                      <span className="dots_area">
                        <div className="symbol-group symbol-hover py-2" >
                          <div className="symbol symbol-30 d-flex">
                            <span className="dropdown-action">
                              <Dropdown icon='ellipsis horizontal' pointing='left'>
                                <Dropdown.Menu>
                                  <Dropdown.Item icon="check circle outline" text={t("project_tab_menu.mark_complete")} />
                                  <Dropdown.Item icon="pencil" text={t("project_tab_menu.add_task")} />
                                  <Dropdown.Item
                                    icon="trash alternate outline"
                                    text={t("project_tab_menu.add_file")}
                                  />
                                </Dropdown.Menu>
                              </Dropdown>
                            </span>
                          </div>
                        </div>
                      </span>
                    </li>
                  </ul>
                </Accordion.Content>

                {/* <Accordion.Title
          active={activeIndex === 2}
          index={2}
          onClick={this.handleClick}
          className="active-title"
        >
          
         HVAC Work <Icon name='angle down' />
        </Accordion.Title>
        <Accordion.Content className="active-title" active={activeIndex === 2}>
        <ul>
          <li className="active-li">
            <span className="strategic_plan">Strategic Planning</span> <span className="dots_area">...</span> </li>
          <li>
          <span className="strategic_plan">Preliminary Studies</span> <span className="dots_area">...</span>
          </li>
          <li> 
          <span className="strategic_plan">Project Plannings</span> <span className="dots_area">...</span>
          </li>
          <li>
          <span className="strategic_plan">Tender</span> <span className="dots_area">...</span>
          </li>
          <li>
          <span className="strategic_plan">Realization</span> <span className="dots_area">...</span>
          </li>
          </ul>
        </Accordion.Content> */}

                {/* <Accordion.Title
          active={activeIndex === 3}
          index={3}
          onClick={this.handleClick}
          className="active-title"
        >
          
         Internet wire fitting   <Icon name='angle down' />
        </Accordion.Title>
        <Accordion.Content className="active-title" active={activeIndex === 3}>
        <ul>
          <li className="active-li">
            <span className="strategic_plan">Strategic Planning</span> <span className="dots_area">...</span> </li>
          <li>
          <span className="strategic_plan">Preliminary Studies</span> <span className="dots_area">...</span>
          </li>
          <li> 
          <span className="strategic_plan">Project Plannings</span> <span className="dots_area">...</span>
          </li>
          <li>
          <span className="strategic_plan">Tender</span> <span className="dots_area">...</span>
          </li>
          <li>
          <span className="strategic_plan">Realization</span> <span className="dots_area">...</span>
          </li>
          </ul>
        </Accordion.Content> */}

                {/* <Accordion.Title
          active={activeIndex === 4}
          index={4}
          onClick={this.handleClick}
          className="active-title"
        >
           
         Paint Work  <Icon name='angle down' />
        </Accordion.Title>
        <Accordion.Content className="active-title" active={activeIndex === 4}>
        <ul>
          <li className="active-li">
            <span className="strategic_plan">Strategic Planning</span> <span className="dots_area">...</span> </li>
          <li>
          <span className="strategic_plan">Preliminary Studies</span> <span className="dots_area">...</span>
          </li>
          <li> 
          <span className="strategic_plan">Project Plannings</span> <span className="dots_area">...</span>
          </li>
          <li>
          <span className="strategic_plan">Tender</span> <span className="dots_area">...</span>
          </li>
          <li>
          <span className="strategic_plan">Realization</span> <span className="dots_area">...</span>
          </li>
          </ul>
        </Accordion.Content>
         */}
                {/* <Accordion.Title
          active={activeIndex === 5}
          index={5}
          onClick={this.handleClick}
          className="active-title"
        >
          
         Paint Work  <Icon name='angle down' />
        </Accordion.Title>
        <Accordion.Content className="active-title" active={activeIndex === 5}>
        <ul>
          <li className="active-li">
            <span className="strategic_plan">Strategic Planning</span> <span className="dots_area">...</span> </li>
          <li>
          <span className="strategic_plan">Preliminary Studies</span> <span className="dots_area">...</span>
          </li>
          <li> 
          <span className="strategic_plan">Project Plannings</span> <span className="dots_area">...</span>
          </li>
          <li>
          <span className="strategic_plan">Tender</span> <span className="dots_area">...</span>
          </li>
          <li>
          <span className="strategic_plan">Realization</span> <span className="dots_area">...</span>
          </li>
          </ul>
        </Accordion.Content>
         */}
                {/* <Accordion.Title
          active={activeIndex === 6}
          index={6}
          onClick={this.handleClick}
          className="active-title"
        >
         
         Water storage plant    <Icon name='angle down' />
        </Accordion.Title>
        <Accordion.Content className="active-title" active={activeIndex === 6}>
        <ul>
          <li className="active-li">
            <span className="strategic_plan">Strategic Planning</span> <span className="dots_area">...</span> </li>
          <li>
          <span className="strategic_plan">Preliminary Studies</span> <span className="dots_area">...</span>
          </li>
          <li> 
          <span className="strategic_plan">Project Plannings</span> <span className="dots_area">...</span>
          </li>
          <li>
          <span className="strategic_plan">Tender</span> <span className="dots_area">...</span>
          </li>
          <li>
          <span className="strategic_plan">Realization</span> <span className="dots_area">...</span>
          </li>
          </ul>
         
        </Accordion.Content> */}
              </div>
            )
          })}
        </Accordion>
      </div>
    )
  }
}

export default withTranslation()(AccordionExampleMenu);
