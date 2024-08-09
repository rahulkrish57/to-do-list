import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Task } from "../services/types";

interface ListState {
  tasks: Task[];
  currentPage: number;
  totalPages: number;
}
const initialState: ListState = {
  tasks: [],
  currentPage: 1,
  totalPages: 3,
};

const listSlice = createSlice({
  name: "list",
  initialState,
  reducers: {
    setTasks: (state, action: PayloadAction<Task[]>) => {
      state.tasks = action.payload;
    },
    addTask: (state, action: PayloadAction<Task>) => {
      state.tasks = [action.payload, ...state.tasks];
    },
    updateTask: (state, action: PayloadAction<Task>) => {
      const index = state.tasks.findIndex(
        (task) => task._id === action.payload._id
      );
      if (index !== -1) {
        state.tasks[index] = action.payload;
      }
    },
    deleteTask: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.filter((task) => task._id !== action.payload);
    },
    updateTaskId: (
      state,
      action: PayloadAction<{ tempId: string; newId: string }>
    ) => {
      const index = state.tasks.findIndex(
        (task) => task._id === action.payload.tempId
      );
      if (index !== -1) {
        state.tasks[index]._id = action.payload.newId;
      }
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setTotalPages: (state, action: PayloadAction<number>) => {
      state.totalPages = action.payload;
    },
  },
});

export const { setTasks, addTask, updateTask, deleteTask, updateTaskId, setCurrentPage, setTotalPages} =
  listSlice.actions;
export default listSlice.reducer;
