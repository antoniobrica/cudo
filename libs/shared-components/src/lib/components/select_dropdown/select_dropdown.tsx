import React, { useEffect } from 'react';
import './../../../assets/style/index.scss'
import Select from "react-select";
import { Dimmer, Loader, Image, Segment } from 'semantic-ui-react';

export interface selectWithAddNew {
  selectedValue?
  folderOpen?
  options?
  value?
  onBkp?
}


// const options = [
//   { value: "Abe", label: "Abe" },
//   { value: "John", label: "John" },
//   { value: "Dustin", label: "Dustin" },
//   { value: "Rahul", label: "Rahul" },
//   { value: "John", label: "John" },
//   { value: "Dustin", label: "Dustin" },
//   { value: "Rahul", label: "Rahul" },
//   { value: "John", label: "John" },
//   { value: "Dustin", label: "Dustin" },
//   { value: "Rahul", label: "Rahul" },
// ];

// const formatOptionLabel = ({ value, label, addlabel }) => (
//   <div style={{ display: "flex" }}>
//     <div><a>{addlabel}</a></div>
//     <div>{label}</div>
//   </div>
// );

//   const addLinkOption = ({ value, addlabel }) => (
//     <div style={{ display: "flex" }}>
//       <div><a href="">{addlabel}</a></div>
//     </div>
//   );



export function SelectDropdown(props: selectWithAddNew) {
  const [BkpId, setBkpId] = React.useState('Select')

  const options = props?.options?.map(bkp => {
    return {value:bkp, label:bkp.text }
  })

  const onSelectChange = (data) => {
    if(data && data !== 'Select'){
      props.onBkp('',data.value)
      setBkpId(data.value.value)
    }else{
      setBkpId('Select')
    }
  }

  const CustomMenu = ({ innerRef, innerProps, children }) => (
    <div ref={innerRef} {...innerProps} className="customReactSelectMenu">
      <button
        className="btn btn-info btn-sm btn-block"
        onClick={() => props.folderOpen()}
      >Add New Folder</button>
      {children}
    </div>
  )

  return (
    <div className="searchable-select">
      <Select
        value={{value:BkpId,label:BkpId}}
        placeholder='Select'
        // addLinkOption={addLinkOption}
        // formatOptionLabel={formatOptionLabel}
        options={options}
        onChange={onSelectChange}
        components={{ Menu: CustomMenu }}
        isClearable={BkpId !== 'Select'}
      />
    </div>
  );
}




export default SelectDropdown;