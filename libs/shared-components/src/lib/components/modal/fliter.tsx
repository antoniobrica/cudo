import React from 'react';
import { Button, Header, Modal, Input, Form, Grid, Select, TextArea } from 'semantic-ui-react';
// import SampleModal from './sample-modal';
import img from 'libs/shared-components/src/filter.png';

import { useTranslation } from 'react-i18next';
export function FilterPopup() {
  const countryOptions = [
    { key: 'af', value: 'af', text: 'Afghanistan' },
    { key: 'ax', value: 'ax', text: 'Aland Islands' },
  ];

  const [open, setOpen] = React.useState(false);
  const { t } = useTranslation();

  return (
    <div>
      <Modal
        style={{ width: '450px' }}
        className="modal_media right-side--fixed-modal filter-modal"
        closeIcon
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        trigger={
          // <Button size="mini" className="grey-btn">
          //   Filter
          // </Button>
          <img src={img} className="filter-icon mr-10 " />
        }
        closeOnDimmerClick={false}
      >
        <Modal.Header className="headertop">
          <label>{t('project_tab_menu.task.filter')} </label>
        </Modal.Header>
        <Modal.Content body>
          <div>
            <Form>
              <Grid columns={1}>
                <Grid.Row>
                  <Grid.Column>
                    <Form.Field>
                      <label>{t('project_tab_menu.task.assign_to')}</label>
                      <Select clearable placeholder={t('common.select')} className="small" options={countryOptions} />
                    </Form.Field>
                  </Grid.Column>
                </Grid.Row>
              </Grid>

              <Grid columns={1}>
                <Grid.Row>
                  <Grid.Column>
                    <Form.Field>
                      <label>{t('common.followers')} </label>
                      <Select clearable placeholder={t('common.select')} className="small" options={countryOptions} />
                    </Form.Field>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
              <Grid columns={1}>
                <Grid.Row>
                  <Grid.Column>
                    <Form.Field>
                      <label>{t('common.status')}</label>
                      <Select clearable placeholder={t('common.select')} className="small" options={countryOptions} />
                    </Form.Field>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
              <Grid columns={2}>
                <Grid.Row>
                  <Grid.Column>
                    <Form.Field>
                      <label>{t('common.start_date')}</label>
                      <Input placeholder="Default" size="small" className="full-width" type="date" />
                    </Form.Field>
                  </Grid.Column>
                  <Grid.Column>
                    <Form.Field>
                      <label>{t('common.end_date')}</label>
                      <Input placeholder="Default" size="small" className="full-width" type="date" />
                    </Form.Field>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
              <Grid columns={1}>
                <Grid.Row>
                  <Grid.Column>
                    <Form.Field>
                      <label>{t('common.type')}</label>
                      <Select clearable placeholder={t('common.select')} className="small" options={countryOptions} />
                    </Form.Field>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Form>
          </div>
        </Modal.Content>
        <Modal.Actions>
          <Button
            content={t('common.apply')}
            onClick={() => setOpen(false)}
            positive
            size="small"
            className="primary"
          />
          <Button size="small" className="icon-border" onClick={() => setOpen(false)}>
            <i className="ms-Icon ms-font-xl ms-Icon--CalculatorMultiply"></i> {t('common.cancel')}
          </Button>
        </Modal.Actions>
      </Modal>
    </div>
  );
}

export default FilterPopup;
