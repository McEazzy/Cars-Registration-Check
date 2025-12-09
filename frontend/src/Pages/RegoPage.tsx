import { useEffect, useState, type ChangeEvent, type SyntheticEvent } from 'react'
import { useSignalR } from '../DataFetch/ReceiveSignalR';
import RegoTable from '../Components/Tables/RegoTable';
import type { Car } from '../DataFetch/Car';
import SearchRegoID from '../Components/Search/SearchRegoID';
import { lookCarByID } from '../DataFetch/LookCarByID';
import { useParams } from 'react-router-dom';

type Props = {}

const RegoPage = (props: Props) => {
    
    let {ticker} = useParams();
    const [search, setSearch] = useState<string>("");
    const [car, setCar] = useState<Car | undefined>();
    const [error, setError] = useState<string | null>(null);
    const [loadingHub, setLoadingHub] = useState<boolean>(true);
    
    // A callback to re-initiate the GET request within useEffect() once SignalR connection succesfully established
    const handleConnEstablished = () => {
        setLoadingHub(false);
    }
    
    //establish a connection with SignalR Hub from backend
    const connection = useSignalR("http://localhost:5000/regoHub", handleConnEstablished);
    

    // when there'an updated info from backend via signalR, re-render corresponding values
    useEffect(() => {
        if (connection) {
            const handler = (car: Car) =>{
                setCar(car);
            }

            connection.on("CarRegoChecked", handler);

            return () => {
                connection.off("CarRegoChecked", handler);
            }
        }
    }, [connection]);

    //when re-routed from clicking on existing car record from homepage
    useEffect(() =>{
        if(ticker !== undefined)
        {
            setSearch(ticker);
            const sendID = async () => {
                
                const response = await lookCarByID(+ticker);

                if(typeof response === 'string') setError(response);
            }

            sendID();
        }
    }, [ticker, loadingHub]); // rerun when URL param changes

    const onClick = async (e: SyntheticEvent) => {
        if (search === "") 
        {
            setError("No ID has been given");
        } else {
            const response = await lookCarByID(+search); // Use of "+" operator to attempt covert string to a number

            if(typeof response === 'string') setError(response);
        }
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    }

    return (
        <div>
            <SearchRegoID id={search} onClick={onClick} handleChange={handleChange}></SearchRegoID>
            <p>The table below displays current car's registration status</p>
            {error && <div> "Error found": {error}</div>}
            {!error && car && <RegoTable car={car}/>}
        </div>
    )
}

export default RegoPage