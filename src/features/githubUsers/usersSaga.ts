import { put, takeEvery } from "redux-saga/effects";
import axios from "axios";
import { UsersModel } from "../../models/UsersModel";
import { AxiosRequestConfig, AxiosResponse } from "axios";
import {
  getAllUsersFailure,
  getAllUsersSuccess,
  getFollowersForUserFailure,
  getFollowersForUserSuccess,
  getSearchUserFailure,
  getSearchUsersSuccess,
  getSingleUserFailure,
  getSingleUserSuccess,
} from "./userSlice";
import { PayloadAction } from "@reduxjs/toolkit";
import { SearchUsersModel } from "../../models/SearchUserModel";
import { SingleUserModel } from '../../models/SingleUserModel';

/* It's a configuration for the request. */
let headersList = {
  Accept: "application/vnd.github+json",
};

let reqOptions: AxiosRequestConfig = {
  method: "GET",
  headers: headersList,
};

/**
 * It's a function that returns a promise that resolves to an array of users.
 */
const getAllUsers = () =>
  axios.get<Array<UsersModel>>("https://api.github.com/users", reqOptions);

/**
 * GetSingleUser is a function that takes a string and returns a promise that resolves to a UsersModel
 * @param {string} userName - string
 */
const getSingleUser = (userName: string) =>
  axios.get<UsersModel>(`https://api.github.com/users/${userName}`, reqOptions);

/**
 * GetSearchUsers is a function that takes a string as an argument and returns a promise that resolves
 * to an array of SearchUsersModel objects
 * @param {string} query - The search query.
 */
const getSearchUsers = (query: string) =>
  axios.get<SearchUsersModel>(
    `https://api.github.com/search/users?q=${query}`,
    reqOptions
  );

const getUserFollowers = (userName: string) =>
  axios.get<UsersModel>(
    `https://api.github.com/users/${userName}/followers`,
    reqOptions
  );

/* A generator function that yeilds all the users from girhub. */
function* WorkGetAllUsers(): any {
  /* It's a generator function that is used to get all users from the API. */
  try {
    const resposne: AxiosResponse<Array<UsersModel>, any> = yield getAllUsers();
    yield put(getAllUsersSuccess(resposne.data));
  } catch (error) {
    yield put(getAllUsersFailure());
  }
}

/* A generator function that yeilds a single user from girhub. */
function* workGetSingleUser(action: PayloadAction<string>): any {
  console.log(action.payload);
  try {
    const response: AxiosResponse<SingleUserModel, any> = yield getSingleUser(
      action.payload
    );
    yield put(getSingleUserSuccess(response.data));
  } catch (error) {
    yield put(getSingleUserFailure());
  }
}

/* A generator function that yeilds searched user from girhub. */
function* workGetSearchedUsers(action: PayloadAction<string>): any {
  try {
    const response: AxiosResponse<SearchUsersModel, any> = yield getSearchUsers(
      action.payload
    );
    yield put(getSearchUsersSuccess(response.data));
  } catch (error) {
    yield put(getSearchUserFailure());
  }
}

function* workGetUserFollowers(action: PayloadAction<string>): any {
  try {
    const response: AxiosResponse<Array<UsersModel>> = yield getUserFollowers(
      action.payload
    );
    yield put(getFollowersForUserSuccess(response.data));
  } catch (error) {
    yield put(getFollowersForUserFailure());
  }
}

/* A watcher function. */
function* usersSaga() {
  yield takeEvery("usersSlice/getAllUsersFetch", WorkGetAllUsers);
  yield takeEvery("usersSlice/getSingleUserFetch", workGetSingleUser);
  yield takeEvery("usersSlice/getSearchUsersFetch", workGetSearchedUsers);
  yield takeEvery("usersSlice/getFollowersForUserFetch", workGetUserFollowers);
}

export default usersSaga;
