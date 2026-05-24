import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type RequestForm = {
  name: string;
  phone: string;
  issue: string;
};

type RequestState = {
  form: RequestForm;
  status: "idle" | "sent";
};

const initialState: RequestState = {
  form: {
    name: "",
    phone: "",
    issue: ""
  },
  status: "idle"
};

const requestSlice = createSlice({
  name: "request",
  initialState,
  reducers: {
    updateField: <T extends keyof RequestForm>(
      state: RequestState,
      action: PayloadAction<{ field: T; value: RequestForm[T] }>
    ) => {
      state.form[action.payload.field] = action.payload.value;
      state.status = "idle";
    },
    submitRequest: (state) => {
      state.status = "sent";
    },
    resetRequest: () => initialState
  }
});

export const { resetRequest, submitRequest, updateField } = requestSlice.actions;
export default requestSlice.reducer;
