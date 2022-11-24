import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UsersModel } from "../../models/Users";
import { RootState } from "../../app/store";

/* Defining the state of the reducer. */
export interface UsersState {
  allUsers: Array<UsersModel>;
  isLoading: boolean;
}

const initialState: UsersState = {
  allUsers: [],
  isLoading: false,
};

/* Creating a slice of the state. */
export const usersSlice = createSlice({
  name: "usersSlice",
  initialState,
  reducers: {
    getAllUsersFetch: (state) => {
      state.isLoading = true;
    },
    getAllUsersSuccess: (state, action: PayloadAction<Array<UsersModel>>) => {
      state.allUsers = action.payload;
      state.isLoading = false;
    },
    getAllUsersFailure: (state) => {
      state.isLoading = false;
    },
  },
});


/* Exporting the actions from the slice. */
export const {getAllUsersFailure,getAllUsersFetch,getAllUsersSuccess} =usersSlice.actions;

/**
 * It takes the state of the application and returns the allUsers property of the user slice of the
 * state
 * @param {RootState} state - The entire state of the Redux store.
 */
export const selectAllUsers = (state:RootState) => state.user.allUsers


/* Exporting the reducer from the slice. */
export default usersSlice.reducer