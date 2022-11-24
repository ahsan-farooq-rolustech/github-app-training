import { call, CallEffect, put, takeEvery } from "redux-saga/effects";
import axios from "axios";
import { UsersModel } from "../../models/Users";
import { AxiosRequestConfig, AxiosResponse } from "axios";
import {
  getAllUsersFailure,
  getAllUsersSuccess,
  getSingleUserFailure,
  getSingleUserSuccess,
} from "./userSlice";
import { PayloadAction } from "@reduxjs/toolkit";

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

const getSingleUser = (userName: string) =>
  axios.get<UsersModel>(`https://api.github.com/users/${userName}`, reqOptions);

/* A generator function. */
function* WorkGetAllUsers(): any {
  /* It's a generator function that is used to get all users from the API. */
  try {
    const resposne: AxiosResponse<Array<UsersModel>, any> = yield getAllUsers();
    yield put(getAllUsersSuccess(resposne.data));
  } catch (error) {
    yield put(getAllUsersFailure());
  }
}

function* workGetSingleUser(action: PayloadAction<string>): any {
  console.log(action.payload);
  try {
    const response: AxiosResponse<UsersModel, any> = yield getSingleUser(
      action.payload
    );
    yield put(getSingleUserSuccess(response.data));
  } catch (error) {
    yield put(getSingleUserFailure());
  }
}

/* A generator function. */
function* usersSaga() {
  yield takeEvery("usersSlice/getAllUsersFetch", WorkGetAllUsers);
  yield takeEvery("usersSlice/getSingleUserFetch", workGetSingleUser);
}

export default usersSaga;
