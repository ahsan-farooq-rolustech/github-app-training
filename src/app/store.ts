import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import userReducer from "../features/githubUsers/userSlice";
import createSagaMiddleware  from 'redux-saga'
import usersSaga from '../features/githubUsers/usersSaga';


const saga=createSagaMiddleware()

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    user:userReducer,
  },
  middleware:[saga]
});

saga.run(usersSaga)

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
