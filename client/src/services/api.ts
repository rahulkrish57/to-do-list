import axios, { AxiosResponse } from "axios";
import { ListData, Task } from "./types";

const BASE_URL = process.env.BASE_URL as string;

export const apiService = { showAllLists, addNewList, updateList, deleteList };

function showAllLists(page: number): Promise<AxiosResponse<ListData[]>> {
  return axios.get(
    `https://to-do-list-oznv.onrender.com/api/v1/?page=${String(page)}`
  );
}

function addNewList(body: any): Promise<AxiosResponse<Task>> {
  return axios.post(`https://to-do-list-oznv.onrender.com/api/v1`, body);
}
function updateList(id: string, body: any): Promise<AxiosResponse<Task>> {
  return axios.put(`https://to-do-list-oznv.onrender.com/api/v1/${id}`, body);
}
function deleteList(id: string): Promise<AxiosResponse<Task>> {
  return axios.delete(`https://to-do-list-oznv.onrender.com/api/v1/${id}`);
}
