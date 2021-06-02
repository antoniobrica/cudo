import React from 'react';
import { Button, Checkbox, Modal, Input, Form, Grid, Select } from 'semantic-ui-react';
// import SampleModal from './sample-modal';
export interface IAddNewFolderProps {
  open?,
  cancel?,
  folderData?
}
export function AddNewFolder(props: IAddNewFolderProps) {
  const countryOptions = [
    { key: 'af', value: 'af', text: 'Afghanistan' },
    { key: 'ax', value: 'ax', text: 'Aland Islands' },

  ]


  const [open, setOpen] = React.useState(false);
  const [folderName, setfolderName] = React.useState("");

  React.useEffect(() => {
    if (props.open) {
      setOpen(props.open);
    }
  }, [props.open])
  const cancel = () => {
    setOpen(false);
    props.cancel(false);
  }
  const onFolderName = (e) => {
    const fname = e.target.value;
    console.log('fname', fname);
    setfolderName(fname)
  }

  const onSubmit = () => {
    props.folderData(folderName);
    props.cancel(false);
  }

  return (
    <div id="navbar">
      <Modal className="modal_media modal_center modal_media_1"
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        trigger={<Button size='mini' className="grey-btn"> Add Folder</Button>}
      >
        <Modal.Header><h3>Add new folder </h3></Modal.Header>
        <Modal.Content body>
          <div>
            <Form>
              <Grid columns={1}>
                <Grid.Row>
                  <Grid.Column>
                    <Form.Field>
                      <label>Folder name</label>
                      <Input placeholder='Enter folder name here...' size='small' className="full-width" type="text"
                        value={folderName}
                        onChange={onFolderName}
                      />
                    </Form.Field>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Form>
          </div>
        </Modal.Content>
        <Modal.Actions>
          <Button
            content="Submit"
            onClick={onSubmit}
            positive
            size='mini' className="grey-btn"
          />
          <Button size='mini' className="icon-border" onClick={cancel}>
            X  Cancel
        </Button>
        </Modal.Actions>
      </Modal>
    </div>

  )
}

export default AddNewFolder
