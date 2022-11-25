import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UsersModel } from "../../models/UsersModel";
import { RootState } from "../../app/store";
import { SearchUsersModel } from "../../models/SearchUserModel";

/* Defining the state of the reducer. */
export interface UsersState {
  allUsers: Array<UsersModel>;
  user: UsersModel | null;
  searchedUser: SearchUsersModel | null;
  isLoading: boolean;
}

const initialState: UsersState = {
  allUsers: [],
  user: null,
  searchedUser: null,
  isLoading: false,
};

/* Creating a slice of the state. */
export const usersSlice = createSlice({
  name: "usersSlice",
  initialState,
  reducers: {
    /* A reducer that is used to set the isLoading property of the state to true. */
    getAllUsersFetch: (state) => {
      state.isLoading = true;
    },
    /* A reducer that is used to set the isLoading property of the state to false and set the allUsers
property of the state to the payload of the action. */
    getAllUsersSuccess: (state, action: PayloadAction<Array<UsersModel>>) => {
      state.allUsers = action.payload;
      state.isLoading = false;
    },
    /* A reducer that is used to set the isLoading property of the state to false. */
    getAllUsersFailure: (state) => {
      state.isLoading = false;
    },
    /* A reducer that is used to set the isLoading property of the state to true. */
    getSingleUserFetch: (state, action: PayloadAction<string>) => {
      state.isLoading = true;
      console.log(action.payload);
    },
    /* A reducer that is used to set the isLoading property of the state to false and set the user property
of the state to the payload of the action. */
    getSingleUserSuccess: (state, action: PayloadAction<UsersModel>) => {
      state.user = action.payload;
      state.isLoading = false;
    },
    /* A reducer that is used to set the isLoading property of the state to false. */
    getSingleUserFailure: (state) => {
      state.isLoading = false;
    },
    /* A reducer that is used to set the isLoading property of the state to true. */
    getSearchUsersFetch: (state, action: PayloadAction<string>) => {
      state.isLoading = true;
    },
    /* A reducer that is used to set the isLoading property of the state to false and set the searchedUser
property of the state to the payload of the action. */
    getSearchUsersSuccess: (state, action: PayloadAction<SearchUsersModel>) => {
      state.isLoading = false;
      state.searchedUser = action.payload;
    },
    /* A reducer that is used to set the isLoading property of the state to false. */
    getSearchUserFailure: (state) => {
      state.isLoading = false;
    },
  },
});

/* Exporting the actions from the slice. */
export const {
  /* Exporting the All user actions from the slice. */
  getAllUsersFailure,
  getAllUsersFetch,
  getAllUsersSuccess,

  /* Exporting the single user actions from the slice. */
  getSingleUserFetch,
  getSingleUserSuccess,
  getSingleUserFailure,

  /* Exporting the searched user actions from the slice. */
  getSearchUserFailure,
  getSearchUsersFetch,
  getSearchUsersSuccess,
} = usersSlice.actions;

/**
 * It takes the state of the application and returns the allUsers property of the user slice of the
 * state
 * @param {RootState} state - The entire state of the Redux store.
 */
export const selectAllUsers = (state: RootState) => state.user.allUsers;

/**
 * It takes the state object and returns the user object from the user reducer
 * @param {RootState} state - RootState - this is the state of the entire application.
 */
export const selectSingleUser = (state: RootState) => state.user.user;

/**
 * It takes the state and returns the searchedUser property of the user slice of the state
 * @param {RootState} state - RootState - this is the state of the entire application.
 */
export const selectSearchedUser = (state: RootState) => state.user.searchedUser;

/* Exporting the reducer from the slice. */
export default usersSlice.reducer;
