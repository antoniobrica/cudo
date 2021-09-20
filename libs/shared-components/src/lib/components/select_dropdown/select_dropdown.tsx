// import React, { useEffect } from 'react';
// import './../../../assets/style/index.scss'
// import Select from "react-select";
// import { Dimmer, Loader, Image, Segment } from 'semantic-ui-react';


// // const options = [
// //   { value: "Abe", label: "Abe" },
// //   { value: "John", label: "John" },
// //   { value: "Dustin", label: "Dustin" },
// //   { value: "Rahul", label: "Rahul" },
// //   { value: "John", label: "John" },
// //   { value: "Dustin", label: "Dustin" },
// //   { value: "Rahul", label: "Rahul" },
// //   { value: "John", label: "John" },
// //   { value: "Dustin", label: "Dustin" },
// //   { value: "Rahul", label: "Rahul" },
// // ];

// // const formatOptionLabel = ({ value, label, addlabel }) => (
// //   <div style={{ display: "flex" }}>
// //     <div><a>{addlabel}</a></div>
// //     <div>{label}</div>
// //   </div>
// // );

// //   const addLinkOption = ({ value, addlabel }) => (
// //     <div style={{ display: "flex" }}>
// //       <div><a href="">{addlabel}</a></div>
// //     </div>
// //   );



// export function SelectDropdown(props: selectWithAddNew) {
//   const [BkpId, setBkpId] = React.useState('Select')

//   const options = props?.options?.map(bkp => {
//     return {value:bkp, label:bkp.text }
//   })

//   const onSelectChange = (data) => {
//     if(data && data !== 'Select'){
//       props.onBkp('',data.value)
//       setBkpId(data.value.value)
//     }else{
//       setBkpId('Select')
//     }
//   }

//   const CustomMenu = ({ innerRef, innerProps, children }) => (
//     <div ref={innerRef} {...innerProps} className="customReactSelectMenu">
//       <button
//         className="btn btn-info btn-sm btn-block"
//         onClick={() => props.folderOpen()}
//       >Add New Folder</button>
//       {children}
//     </div>
//   )

//   return (
//     <div>
//       <Select
//         value={{value:BkpId,label:BkpId}}
//         placeholder='Select'
//         // addLinkOption={addLinkOption}
//         // formatOptionLabel={formatOptionLabel}
//         options={options}
//         onChange={onSelectChange}
//         components={{ Menu: CustomMenu }}
//         isClearable={BkpId !== 'Select'}
//       />
//     </div>
//   );
// }




// export default SelectDropdown;
import React, { useEffect, useState } from "react";
import { Button, Input } from "semantic-ui-react";
import styled from "styled-components";

export interface selectWithAddNew {
  selectedValue?
  folderOpen?
  options?
  value?
  onBkp?
  setSearchValue?
}

const Main = styled("div")`
  font-family: sans-serif;
  background: #f0f0f0;
  // height: 100vh;
`;

const DropDownContainer = styled("div")`
  width: 10.5em;
  margin: 0 auto;
`;

const DropDownHeader = styled("div")`
  margin-bottom: 0.8em;
  padding: 0.4em 2em 0.4em 1em;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.15);
  font-weight: 500;
  font-size: 1.3rem;
  color: #3faffa;
`;

const DropDownListContainer = styled("div")`
  position: absolute;
  z-index: 100;
  width: 10.5em;
`;

const DropDownList = styled("ul")`
  padding: 0;
  margin: 0;
  padding-left: 1em;
  background: #ffffff;
  border: 2px solid #e5e5e5;
  box-sizing: border-box;
  color: #3faffa;
  font-size: 1.3rem;
  font-weight: 500;
  &:first-child {
    padding-top: 0.8em;
  }
`;

const ListItem = styled("li")`
  list-style: none;
  margin-bottom: 0.8em;
  &:hover {
    color: #fd9e46;
  }
`;

export function SelectDropdown(props: selectWithAddNew) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [BkpId, setBkpId] = React.useState('Select')
  const toggling = () => {
    setIsOpen(!isOpen);
    props.setSearchValue('')
  }

  const onOptionClicked = value => () => {
    setSelectedOption(value);
    setIsOpen(false);
    console.log(selectedOption);
  };

  const onSearchChange = (e) => {
    props.setSearchValue(e.target.value)
  }

  // const options = props?.options?.map(bkp => {
  //   return { value: bkp, label: bkp.text }
  // })

  return (
    <Main>
      <DropDownContainer>
        <DropDownHeader onClick={toggling}>
          {selectedOption || "Select"}
        </DropDownHeader>
        {isOpen && (
          <DropDownListContainer>
            <Button onClick={() => props.folderOpen()} >Add new folder</Button>
            <Input icon='search' onChange={onSearchChange} placeholder='Search...' />
            <DropDownList>
              {props?.options?.map(bkp => (
                <ListItem onClick={onOptionClicked(bkp.text)} key={Math.random()}>
                  {bkp.text}
                </ListItem>
              ))}
            </DropDownList>
          </DropDownListContainer>
        )}
      </DropDownContainer>
    </Main>
  );
}

export default SelectDropdown;
