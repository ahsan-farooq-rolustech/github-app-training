import React, { useEffect, useState } from "react";
import classes from "./Home.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsersFetch, getSearchUsersFetch, selectAllUsers, selectSearchedUser } from "../githubUsers/userSlice";
import UserTable from "../../components/userTable/UserTable";

const Home = () => {
  const [searchBoxValue, setSearchBoxValue] = useState("");

  const user = useSelector(selectAllUsers);
  const searchedUsers=useSelector(selectSearchedUser)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllUsersFetch());
  }, [dispatch]);


  return (
    <div className={classes.mainScreen}>
      <div className={classes.container}>
        <form onSubmit={(event)=>{
          event.preventDefault()
          dispatch(getSearchUsersFetch(searchBoxValue))
        }}>
          <input
            type="text"
            name="search box"
            value={searchBoxValue}
            onChange={(event) => {
              setSearchBoxValue(event.target.value);
            }}
          />
          <button type="submit">Search</button>
        </form>
      </div>

      <h1>Users</h1>

      <div className={classes.tableScreen}>
        <UserTable data={searchBoxValue===''? user:searchedUsers} />
      </div>
    </div>
  );
};

export default Home;
