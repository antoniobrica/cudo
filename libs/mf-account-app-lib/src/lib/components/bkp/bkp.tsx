import React from 'react';
import { GET_BKP, GET_FOLDER } from '../../graphql/graphql';
import { Form, Select } from 'semantic-ui-react';

import { useBkpQuery, useFolderQuery } from '../../services/useRequest';

import './bkp.module.scss';

/* eslint-disable-next-line */
export interface BkpProps {
  parentBKPSelect,
  bkp
}

export function Bkp(props: BkpProps) {
  const [items, setItems] = React.useState([])
  const [items1, setItems1] = React.useState([])
  const [items2, setItems2] = React.useState([])
  const [BKPID, setBKPID] = React.useState("")

  const { loading, error, data } = useBkpQuery(GET_BKP);
  const { loading: folderL, error: folderE, data: FolderD } = useFolderQuery(GET_FOLDER)
  React.useEffect(() => {
    if (data && FolderD) {
      console.log('FolderD', FolderD);
      const bkps = data.Bkp.map(({ bkpTitle, bkpID }) => ({ key: bkpID, value: bkpTitle, text: bkpID + " - " + bkpTitle }))
      setItems(data.Bkp.map(({ bkpTitle, bkpID }) => ({ key: bkpID, value: bkpTitle, text: bkpID + " - " + bkpTitle })));
      const arr = FolderD.Folders.map(({ folderTitle, folderID }) => ({ key: folderID, value: folderTitle, text: folderTitle }))
      setItems1(arr);
      const bkpF = bkps.concat(arr);
      setItems2(bkpF);
    }
  }, [data, FolderD]);
  React.useEffect(() => {
    if (props.bkp) {
      setBKPID(props.bkp)
    }
  }, [props.bkp])

  // React.useEffect(()=>{
  //   if(FolderD){
  //     console.log('FolderD',FolderD);

  //       const arr = FolderD.Folders.map(({ folderTitle, folderID }) => ({ key: folderID, value: folderTitle, text: folderTitle }))
  //       setItems1(arr);
  //       if(items){
  //       const bkpF= items.concat(arr);
  //       setItems2(bkpF);
  //       }

  //   }

  // }, [FolderD]);

  const onBkp = (event, data) => {
    console.log('data==', data)
    const bkpID = { BKPID: '', BKPIDTitle: '', isFolder: false };
    for (let i = 0; i <= items.length; i++) {
      if (items[i]?.value === data.value) {
        bkpID.BKPID = items[i].key;
        bkpID.BKPIDTitle = data.value;
      }
    }
    const folder = { folderID: '', folderTitle: '', isFolder: true };
    for (let i = 0; i <= items1.length; i++) {
      if (items1[i]?.value === data.value) {
        folder.folderID = items1[i].key;
        folder.folderTitle = data.value;
      }
    }
    setBKPID(data.value)
    let bkpFolder = null;
    let isFolder = false;
    if (bkpID.BKPIDTitle.length > 0) {
      // bkpFolder = bkpID;
      props.parentBKPSelect(bkpID);

    }
    else {
      bkpFolder = folder;
      props.parentBKPSelect(folder);
      isFolder = true;
    }

    // props.parentBKPSelect(bkpFolder);
  }


  return (
    <Form.Field>
      <label>Select BKP   </label>
      <Select name='bkp' placeholder='Select' className="small"
        options={items2}
        value={BKPID}
        onChange={onBkp}
      />

    </Form.Field>
  );
}

export default Bkp;
