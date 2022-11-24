import React, { useEffect } from 'react';
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import './App.css';
import { useSelector, useDispatch } from 'react-redux';
import { getAllUsersFetch, selectAllUsers, selectSingleUser,getSingleUserFetch } from './features/githubUsers/userSlice';

function App() {

/* Using the selector to get the users from the store. */
  const users=useSelector(selectAllUsers)
  const singleUser=useSelector(selectSingleUser)
/* A hook that allows you to dispatch actions to the Redux store. */
  const dispatch=useDispatch();

/* A hook that allows you to perform side effects in function components. */
  useEffect(() => {
    //* this is the API to get all the users from github and it is working 
    dispatch(getAllUsersFetch())
    //* this is the API to get singleUser from github and it is working
    dispatch(getSingleUserFetch('ahsan'))
    
  },[dispatch])

  // console.log(users);
  console.log(singleUser);



  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Counter />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <span>
          <span>Learn </span>
          <a
            className="App-link"
            href="https://reactjs.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            React
          </a>
          <span>, </span>
          <a
            className="App-link"
            href="https://redux.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Redux
          </a>
          <span>, </span>
          <a
            className="App-link"
            href="https://redux-toolkit.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Redux Toolkit
          </a>
          ,<span> and </span>
          <a
            className="App-link"
            href="https://react-redux.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            React Redux
          </a>
        </span>
      </header>
    </div>
  );
}

export default App;
