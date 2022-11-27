import React from 'react'
import UserTableRow from './components/UserTableRow'
import classes from './UserScreen.module.css'
import {useNavigate,useParams} from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getSingleUserFetch, selectSingleUser } from '../githubUsers/userSlice';

const UserScreen = () => {

  
  const navigate=useNavigate()
  const {userName}=useParams()

  const userDetails=useSelector(selectSingleUser)
  const dispatch=useDispatch()


  useEffect(()=>{
    
    dispatch(getSingleUserFetch(userName ?userName :""))

  },[dispatch,userName])


  console.log(userName)
  console.log(userDetails)


  return (
    <div className={classes.container} >
      <div className={classes.userContainer}  >
        <div>
          {/* this is for the image */}
          <img src={userDetails?.avatar_url}  id={classes.userImage} alt='user' />
        </div>
        <div>
          {/* this is for the details  */}
          <UserTableRow rowHeader='User Name' rowValue={userDetails? userDetails.login:''} />
          <UserTableRow rowHeader='Type' rowValue={userDetails? userDetails.type:''} />
          <UserTableRow rowHeader='Public Repos' rowValue={userDetails? userDetails.public_repos.toString():''} />
          <UserTableRow rowHeader='Public Gists' rowValue={userDetails? userDetails.public_gists.toString():''} />
          <UserTableRow rowHeader='Followers' rowValue={userDetails? userDetails.followers.toString():''} />
          <UserTableRow rowHeader='Following' rowValue={userDetails? userDetails.following.toString():''} />
        </div>
      </div>
    </div>
  )
}

export default UserScreen