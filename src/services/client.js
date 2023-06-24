import axios from "axios";
import { Urls } from "utilities/Urls";

export const client = axios.create({
  baseURL: "https://event-app-production.up.railway.app/",
  headers: {
    "Content-Type": "multipart/form-data",
  },
  responseType: "json",
});

export const getClients = async () => {
  try {
    return await axios.get(`${Urls.BaseUrl}${Urls.GET_CLIENT_ALL}`);
  } catch (error) {}
};
export const getVolunteer = async () => {
  try {
    return await axios.get(`${Urls.BaseUrl}${Urls.GET_VOLUNTEER_ALL}`);
  } catch (error) {}
};
export const delAdmin = async (id,token) => {
  return await axios
     .delete(`${Urls.BaseUrl}api/v1/admin/${id}`,{
      headers:{
        Authorization:"Bearer "+token
      }
     })  
 };
export const delClient = async (id,token) => {
  return await axios
     .delete(`${Urls.BaseUrl}api/v1/client/${id}`,{
      headers:{
        Authorization:"Bearer "+token
      }
     })  
 };
export const delVolunteer = async (id,token) => {
  return await axios
     .delete(`${Urls.BaseUrl}api/v1/volunteer/${id}`,{
      headers:{
        Authorization:"Bearer "+token
      }
     })  
 };
