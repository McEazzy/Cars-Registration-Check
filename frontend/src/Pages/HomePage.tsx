import { useState, type SyntheticEvent, type ChangeEvent } from 'react'
import Table from '../Components/Tables/Table'; 
import Search from '../Components/Search/Search'
import { fetchCars } from '../DataFetch/FetchCars';

interface Props {}

const HomePage = (props: Props) => {
    const [search, setSearch] = useState<string>("");
    const [cars, setCars] = useState<any[]>([]);
    const [error, setError] = useState<string | null>(null);

    const onClick = async (e: SyntheticEvent) => {
        const response = await fetchCars(search);

        if (typeof response === 'string') {
            setError(response);
        } else if (Array.isArray(response.data)) {
            setCars(response.data);
        }
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    };
  
    return (
        <div className="App">
            <h1>Welcome</h1>
            <p className="read-the-docs">
                Below is the list of cars and their respective registration expiry date.
            </p>
            <Search search={search} onClick={onClick} handleChange={handleChange}/>
            {error && <div> "Error: {error} "</div>}
            {!error && <Table cars={cars} />}
        </div>
    )
}

export default HomePage