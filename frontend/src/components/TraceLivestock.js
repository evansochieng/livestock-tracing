import React from 'react';

const TraceLivestock = ({livestock}) => {
  return (
    <div>
      <h1>Mapping of animals at risk and those that are not!</h1>

      <div>{livestock.map((animal, id) => {
        return <p>{`Animal ${id} owner: ${animal.owner}`}</p>
      })}</div>
    </div>
  );
}

export default TraceLivestock;