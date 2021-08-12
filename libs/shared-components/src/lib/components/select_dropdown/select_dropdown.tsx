import React, { useEffect } from 'react';
import './../../../assets/style/index.scss'
import Select from "react-select";
import { Dimmer, Loader, Image, Segment } from 'semantic-ui-react';

export interface selectWithAddNew {
  selectedValue?
}


const options = [
  { value: "addLink", addlabel: "Add Link" },
  { value: "Abe", label: "Abe" },
  { value: "John", label: "John" },
  { value: "Dustin", label: "Dustin" }
];

const formatOptionLabel = ({ value, label, addlabel }) => (
  <div style={{ display: "flex" }}>
    <div><a >{addlabel}</a></div>
    <div>{label}</div>
  </div>
);

//   const addLinkOption = ({ value, addlabel }) => (
//     <div style={{ display: "flex" }}>
//       <div><a href="">{addlabel}</a></div>
//     </div>
//   );



export function SelectDropdown(props: selectWithAddNew) {

  const onSelectChange = (data) => {
    console.log('---select--value--', data.value)
    props.selectedValue(data.value)
  }

  return (
    <div>
      <Select
        defaultValue={options[0]}
        // addLinkOption={addLinkOption}
        formatOptionLabel={formatOptionLabel}
        options={options}
        onChange={(value) => onSelectChange(value)}
      />
    </div>
  );
}




export default SelectDropdown;