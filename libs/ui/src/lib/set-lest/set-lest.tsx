import React from 'react';

import './set-lest.module.scss';
import { useSetListQuery } from '@cudo/data-access';

/* eslint-disable-next-line */
export interface SetListProps { }

export const SetList = (props: SetListProps) => {
  const { loading, error, data } = useSetListQuery();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  console.log(data);
  return (
    <ul>
      {data.allSets.map(({ id, name, numParts, year }) => (
        <li key={id}>
          {year} - <strong>{name}</strong> ({numParts} parts)
        </li>
      ))}
    </ul>
  );
};

export default SetList;