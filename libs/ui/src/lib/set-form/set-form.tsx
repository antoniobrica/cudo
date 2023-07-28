import React, { useState } from 'react';

import './set-form.module.scss';
import { useAddSetMutation, SetListDocument } from '@cudo/data-access';

/* eslint-disable-next-line */
export interface SetFormProps {}

interface ISetListData {
  allSets: {
    id: string;
    name: string;
    year: number;
    numParts: number;
  }[];
}

export const SetForm = (props: SetFormProps) => {
  const [name, setName] = useState('');
  const [year, setYear] = useState('');
  const [numParts, setNumParts] = useState(1000);

  const [addSetMutation, mutationResult] = useAddSetMutation({
    variables: { name, year, numParts },
    update(cache, { data: { addSet } }) {
      const { allSets } = cache.readQuery<ISetListData>({ query: SetListDocument });
      cache.writeQuery({
        query: SetListDocument,
        data: { allSets: [...allSets, { ...addSet, id: addSet.id.toString() }] }
        // data: { allSets: allSets.concat([addSet]) },
      });
    },
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    addSetMutation();
    setName('');
    setYear('');
    setNumParts(1000);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name: <input name="name" value={name} onChange={(event) => setName(event.target.value)}></input>
      </label>
      <br />
      <label>
        Year: <input name="year" value={year} onChange={(event) => setYear(event.target.value)}></input>
      </label>
      <br />
      <label>
        Number of Parts:{' '}
        <input name="numParts" value={numParts} onChange={(event) => setNumParts(+event.target.value)}></input>
      </label>
      <br />
      <button>Create new set</button>
    </form>
  );
};

export default SetForm;
