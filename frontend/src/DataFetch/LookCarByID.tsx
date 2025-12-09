
import axios from "axios";

export const lookCarByID = async (id: number) => {
    try{
        const response = await axios.get<any>(`http://localhost:5000/api/cars/rego/${id}`);

        return response;
    } catch (error) {
        if(axios.isAxiosError(error)){
            console.log("Send ID search to server error: ", error.message);
            return error.message;
        }
        else {
            console.log("Unexpected error: ", error);
            return "An unexpected error occured";
        }
    }
}