import { createSlice } from "@reduxjs/toolkit";

interface LoaderState {
  loading: boolean;
  alert: any;
}

const initialState: LoaderState = {
  loading: false,
  alert: { status: false, variant: "", label: "" },
};

const loaderSlice = createSlice({
  name: "loader",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setAlert: (state, action) => {
      state.alert = action.payload;
    },
  },
});

export const { setLoading, setAlert } = loaderSlice.actions;
export default loaderSlice.reducer;
