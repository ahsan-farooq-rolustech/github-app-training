import { useEffect } from 'react';
import './App.css';
import { useSelector, useDispatch } from 'react-redux';
import { getAllUsersFetch, selectAllUsers, selectSingleUser, getSingleUserFetch, selectSearchedUser, getSearchUsersFetch, selectUserFollowers, getFollowersForUserFetch } from './features/githubUsers/userSlice';
import Home from './features/Home/Home';
import {Route,Routes} from 'react-router-dom'



function App() {

/* Using the selector to get the users from the store. */
  const users=useSelector(selectAllUsers)
  const singleUser=useSelector(selectSingleUser)
  const searchedUser=useSelector(selectSearchedUser)
  const followers=useSelector(selectUserFollowers)
/* A hook that allows you to dispatch actions to the Redux store. */
  const dispatch=useDispatch();

/* A hook that allows you to perform side effects in function components. */
  useEffect(() => {
    //* this is the dispatch function to get all the users from github and it is working 
    dispatch(getAllUsersFetch())
    //* this is the dispatch function to get single User from github and it is working
    dispatch(getSingleUserFetch('ahsan'))
    //* this is the dispatch function to get searched user from github and it is working
    dispatch(getSearchUsersFetch('ahsan'))

    dispatch(getFollowersForUserFetch('ahsan'))
  },[dispatch])

  // console.log(users);
  console.log(users);



  return (
    <div className="App">
      {/* <UserTable data={users} height={400} width={'100%'} /> */}
      <Routes>
        <Route  path='/' element={<Home/>}/>
      </Routes>
    </div>
  );
}

export default App;
