/**
 * Custom reusable hook to fetch car data from the backend API 
 */
import axios from "axios";
import type { Car } from "./Car";

interface CarResponse {
    response: Car[];
}

export const fetchCars = async (search: string) => {
    try {
        let response;
        if(search.trim().length === 0)
        {
            console.log("GOT HERE")
            response = await axios.get<CarResponse>('http://localhost:5000/api/cars');
        }
        else
        {
            response = await axios.get<CarResponse>(`http://localhost:5000/api/cars/${search}`)
        }

        return response;
    } catch (error) {
        if(axios.isAxiosError(error)) {
            console.log('Axios error: ', error.message);
            return error.message;
        }
        else {
            console.log('Unexpected error: ', error);
            return 'An unexpected error occurred';
        }
    }
}