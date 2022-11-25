import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UsersModel } from '../../models/UsersModel';
import { RootState } from "../../app/store";
import { SearchUsersModel } from "../../models/SearchUserModel";

/* Defining the state of the reducer. */
export interface UsersState {
  allUsers: Array<UsersModel>;
  user: UsersModel | null;
  searchedUser: SearchUsersModel | null;
  followers:Array<UsersModel>|null;
  isLoading: boolean;
}

const initialState: UsersState = {
  allUsers: [],
  user: null,
  searchedUser: null,
  followers: [],
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
   
    getSingleUserFetch: (state, action: PayloadAction<string>) => {
      state.isLoading = true;
      console.log(action.payload);
    },
   
    getSingleUserSuccess: (state, action: PayloadAction<UsersModel>) => {
      state.user = action.payload;
      state.isLoading = false;
    },
   
    getSingleUserFailure: (state) => {
      state.isLoading = false;
    },

    getSearchUsersFetch: (state, action: PayloadAction<string>) => {
      state.isLoading = true;
    },

    getSearchUsersSuccess: (state, action: PayloadAction<SearchUsersModel>) => {
      state.isLoading = false;
      state.searchedUser = action.payload;
    },
    
    getSearchUserFailure: (state) => {
      state.isLoading = false;
    },

    getFollowersForUserFetch:(state,action:PayloadAction<string>)=>{
      state.isLoading = true;
    },

    getFollowersForUserSuccess:(state,action:PayloadAction<Array<UsersModel>>)=>{
      state.isLoading = false;
      state.followers = action.payload
    },

    getFollowersForUserFailure:(state) => {
      state.isLoading = false;
    }
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

  /* Exporting the search user actions from the slice. */
  getSearchUserFailure,
  getSearchUsersFetch,
  getSearchUsersSuccess,

  /* Exporting the search user actions from the slice. */
  getFollowersForUserFetch,
  getFollowersForUserFailure,
  getFollowersForUserSuccess,
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

/**
 * It takes the state object and returns the user.followers property
 * @param {RootState} state - RootState - this is the state of the entire application.
 */
export const selectUserFollowers = (state: RootState) => state.user.followers;

/* Exporting the reducer from the slice. */
export default usersSlice.reducer;
