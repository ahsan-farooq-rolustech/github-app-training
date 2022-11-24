import {call, CallEffect, put, takeEvery} from 'redux-saga/effects'
import axios from "axios";
import { UsersModel } from "../../models/Users";
import { AxiosRequestConfig, AxiosResponse } from 'axios';
import { getAllUsersSuccess } from "./userSlice";


let headersList = {
  Accept: "application/vnd.github+json",
};

let reqOptions:AxiosRequestConfig = {
  
  method: "GET",
  headers: headersList,
};



const getAllUsers = () => axios.get<Array<UsersModel>>("https://api.github.com/users",reqOptions);


function* WorkGetAllUsers():any{
    const resposne:AxiosResponse<Array<UsersModel>,any> = yield getAllUsers();
    yield put(getAllUsersSuccess(resposne.data))
}

function* usersSaga(){
  yield takeEvery('usersSlice/getAllUsersFetch',WorkGetAllUsers)
}

export default usersSaga