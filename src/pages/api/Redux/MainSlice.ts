import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";

type typeInitial = {
  email: string;
  password: string;
  closer: boolean;
};

const initialState: typeInitial = {
  email: "",
  password: "",
  closer: false,
};

const persistedUser =
  typeof window !== "undefined" && localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user") as string)
    : null;

const MSlice = createSlice({
  name: "mainSlice",
  initialState: persistedUser || initialState,
  reducers: {
    HandleInput: (
      state,
      action: PayloadAction<{ email: string; password: string }>
    ) => {
      state.email = action.payload.email;
      state.password = action.payload.password;

       if (typeof window !== "undefined") {
        localStorage.setItem("user", JSON.stringify(state));
      }
    },

    OnClose: (state) => {
      state.closer = !state.closer;
    },
  },
});

export const store = configureStore({
  reducer: {
    MainR: MSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export const { HandleInput, OnClose } = MSlice.actions;
export default MSlice.reducer;
