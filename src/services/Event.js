import axios from "axios";
import { Urls } from "utilities/Urls";

export const getEvent = async () => {
 return await axios
    .get(Urls.BaseUrl + Urls.GET_EVENTS)
    
};
export const delEvent = async (id) => {
 return await axios
    .delete(`${Urls.BaseUrl}${Urls.GET_EVENTS}/${id}`)
    
};
