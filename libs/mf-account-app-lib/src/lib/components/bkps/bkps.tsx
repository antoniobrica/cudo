import React from 'react';
import { GET_BKP, GET_FOLDER } from '../../graphql/graphql';
import { Form, Select } from 'semantic-ui-react';

import { useBkpQuery, useFolderQuery } from '../../services/useRequest';
import { useTranslation } from 'react-i18next';
import { useQuery } from '@apollo/client';
import { useLocation } from 'react-router-dom';


/* eslint-disable-next-line */
export interface BkpsProps {
  parentBKPSelect?,
  bkp?
}

export function Bkps(props: BkpsProps) {
  const [items, setItems] = React.useState([])
  const [BKPID, setBKPID] = React.useState("")
  const location = useLocation()
  const referenceID = location.pathname.split('/')[3]
  // const { loading, error, data } = useBkpQuery(GET_BKP);
  const {loading, error, data} = useQuery(GET_BKP, {
    variables:{referenceID:"dapr",referenceType:"COMPANY",bkpTitle:""}
  })
  const {t} = useTranslation()
  // const { loading: folderL, error: folderE, data: FolderD } = useFolderQuery(GET_FOLDER)
  const { loading: folderL, error: folderE, data: FolderD } = useQuery(GET_FOLDER, {
    variables:{referenceID:"dapr",referenceType:"COMPANY",folderTitle:""}
  })
  React.useEffect(() => {
    if (data) {
      setItems(data.Bkp.map(({ bkpTitle, bkpID }) => ({ key: bkpID, value: bkpTitle, text: bkpID + " - " + bkpTitle })));
    }
  }, [data, FolderD]);
  React.useEffect(() => {
    if (props.bkp) {
     
      setBKPID(props.bkp)
    }
  }, [props.bkp])

  // React.useEffect(()=>{
  //   if(FolderD){
  
  //       const arr = FolderD.Folders.map(({ folderTitle, folderID }) => ({ key: folderID, value: folderTitle, text: folderTitle }))
  //       setItems1(arr);
  //       if(items){
  //       const bkpF= items.concat(arr);
  //       setItems2(bkpF);
  //       }

  //   }

  // }, [FolderD]);

  const onBkp = (event, data) => {
  
    const bkpID = { BKPID: '', BKPIDTitle: '' };
    for (let i = 0; i <= items.length; i++) {
      if (items[i]?.value === data.value) {
        bkpID.BKPID = items[i].key;
        bkpID.BKPIDTitle = data.value;
      }
    }
    setBKPID(data.value)
    props.parentBKPSelect(bkpID);
  }


  return (
    <Form.Field>
      <label>{t("common.select_bkp")}  </label>
      <Select name='bkp' placeholder={t("common.select")} className="small"
        options={items}
        value={BKPID}
        onChange={onBkp}
        clearable
      />

    </Form.Field>
  );
}

export default Bkps;
