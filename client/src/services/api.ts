import axios, { AxiosResponse } from "axios";
import { ListData, Task } from "./types";

const BASE_URL = "https://to-do-list-oznv.onrender.com/api/v1";
// const BASE_URL = "http://localhost:4000/api/v1";
export const apiService = { showAllLists, addNewList, updateList, deleteList };

function showAllLists(page: number): Promise<AxiosResponse<ListData[]>> {
  return axios.get(`${BASE_URL}?page=${String(page)}`);
}

function addNewList(body: any): Promise<AxiosResponse<any>> {
  return axios.post(`${BASE_URL}`, body);
}
function updateList(id: string, body: any): Promise<AxiosResponse<Task>> {
  return axios.put(`${BASE_URL}/${id}`, body);
}
function deleteList(id: string): Promise<AxiosResponse<Task>> {
  return axios.delete(`${BASE_URL}/${id}`);
}
