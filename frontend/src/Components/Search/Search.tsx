import { type ChangeEvent, type JSX, type SyntheticEvent } from 'react'

interface Props {
    search: string;
    onClick: (e: SyntheticEvent) => void;
    handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const Search = ({search, onClick, handleChange}: Props): JSX.Element => {
    return (
        <div>
            <input type="text" value={search} onChange={(e) => handleChange(e)} placeholder='Search by make...' />
            <button onClick={(e) => onClick(e)}>Search</button>
        </div>
    )
}

export default Search