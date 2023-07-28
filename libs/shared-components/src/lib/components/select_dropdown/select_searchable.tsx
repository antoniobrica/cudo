import React, { useState } from 'react';
import Select from "react-select";
import './../../../assets/style/index.scss'
import styled from '@emotion/styled';
// import { Heading } from './components/Heading';


export interface selectWithSearch {
  selectedValue?

}

export function SelectSearchableDropdown(props: selectWithSearch) {

  const [values, setValues] = useState([])
  const [search, setSearch] = useState("")
  const [option, setOption] = useState([])

  const keepSelectedInList = true

  const addItem = (option) => {
    setOption(option)
  }


  const onSelectChange = (data) => {
    console.log('---select--value--', data.value)
    props.selectedValue(data.value)
  }

  const options = [
    { value: "addLink", label: "Add Link" },
    { value: "Abe", label: "Abe", disabled:false },
    { value: "John", label: "John", disabled:false },
    { value: "Dustin", label: "Dustin", disabled:false },
    { value: "Dustin1", label: "Dustin1", disabled:false },
    { value: "Dustin12", label: "Dustin12", disabled:false },
    { value: "Dustin3", label: "Dustin3", disabled:false },
    { value: "Dustin41", label: "Dustin41", disabled:false }
  ];

  // const options = () => {
  //   list.map((item) => ({
  //     label: item.label,
  //     value: item.value
  //   }));
  // }
  const customContentRenderer = ({ props, state }) => (
    <div style={{ cursor: 'pointer' }}>
      {state.values.length} of {options.length} selected
    </div>
  );

  const customDropdownRenderer = ({ props, state, methods }) => {
    const regexp = new RegExp(state.search, 'i');

    return (
      <div>
        <SearchAndToggle color={props.color}>
          <Buttons>
            <div>Search and select:</div>
            {methods.areAllSelected() ? (
              <Button className="clear" onClick={methods.clearAll}>
                Clear all
              </Button>
            ) : (
              <React.Fragment>
                <Button onClick={() => methods.selectAll(
                  [
                    options[0],
                    options[1],
                    options[3]
                  ]
                )}>Select 1st, 2nd and 4th</Button>
                <Button onClick={methods.selectAll}>Select all</Button>
              </React.Fragment>
            )}
          </Buttons>
          <input
            type="text"
            value={state.search}
            onChange={methods.setSearch}
            placeholder="Type anything"
          />
        </SearchAndToggle>
        <Items>
          {options
            .filter((item) => regexp.test(item[props.searchBy] || item[props.labelField]))
            .map((option) => {
              if (!props.keepSelectedInList && methods.isSelected(option)) {
                return null;
              }

              return (
                <Item
                  // disabled={option.disabled}
                  key={option[props.valueField]}
                  onClick={option.disabled ? null : () => addItem(option)}>
                  <input
                    type="checkbox"
                    onChange={() => (option.disabled ? undefined : addItem(option))}
                    checked={state.values.indexOf(option) !== -1}
                  />
                  <ItemLabel>{option[props.labelField]}</ItemLabel>
                </Item>
              );
            })}
        </Items>
      </div>
    );
  };


  return (
    <div>
      {/* <Heading
          title={this.props.title}
          source="https://github.com/sanusart/react-dropdown-select/tree/master/docs/src/examples/CustomContentAndDropdown.js"
        /> */}

      <StyledSelect
        placeholder="Select"
        multi
        contentRenderer={customContentRenderer}
        dropdownRenderer={customDropdownRenderer}
        // onChange={(value) =>
        //   console.log(
        //     `%c > onChange ${this.props.title} `,
        //     'background: #555; color: tomato',
        //     value
        //   )
        // }
        onChange={(value) => onSelectChange(value)}
        options={options}
        values={[]}
      />
    </div>
  );

}

const Title = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
`;

const StyledSelect = styled(Select)`
  .react-dropdown-select-dropdown {
    overflow: initial;
  }
`;

const SearchAndToggle = styled.div`
  display: flex;
  flex-direction: column;
  input {
    margin: 10px 10px 0;
    line-height: 30px;
    padding: 0px 20px;
    border: 1px solid #ccc;
    border-radius: 3px;
    :focus {
      outline: none;
      border: 1px solid deepskyblue;
    }
  }
`;

const Items = styled.div`
  overflow: auto;
  min-height: 10px;
  max-height: 200px;
`;

const Item = styled.div`
  display: flex;
  margin: 10px;
  align-items: baseline;
 
`;

// const Item = styled.div`
//   display: flex;
//   margin: 10px;
//   align-items: baseline;
// ${({ disabled }) => disabled && 'text-decoration: line-through;'}
  
// `;

const ItemLabel = styled.div`
  margin: 5px 10px;
`;

const Buttons = styled.div`
  display: flex;
  justify-content: space-between;
  & div {
    margin: 10px 0 0 10px;
    font-weight: 600;
  }
`;

const Button = styled.button`
  background: none;
  border: 1px solid #555;
  color: #555;
  border-radius: 3px;
  margin: 10px 10px 0;
  padding: 3px 5px;
  font-size: 10px;
  text-transform: uppercase;
  cursor: pointer;
  outline: none;
  &.clear {
    color: tomato;
    border: 1px solid tomato;
  }
  :hover {
    border: 1px solid deepskyblue;
    color: deepskyblue;
  }
`;

SelectSearchableDropdown.propTypes = {};

export default SelectSearchableDropdown;