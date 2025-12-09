import React, { type ChangeEvent, type JSX, type SyntheticEvent } from 'react'

interface Props {
    id: string;
    onClick: (e: SyntheticEvent) => void;
    handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const SearchRegoID = ({id, onClick, handleChange}: Props): JSX.Element => {
  return (
    <div>
        <input type="number" value={id} onChange={(e) => handleChange(e)} placeholder="Search by car registration number(id).."/>
        <button onClick={(e) => onClick(e)}>Search</button>
    </div>
  )
}

export default SearchRegoID