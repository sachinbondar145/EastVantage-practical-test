import React, { useCallback, useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';

const App = () => {
   const [userDetails, setUserDetails] = useState({fullName: '', email: ''});
   const [loader, setLoader] = useState(false);

  const getUserDetails = useCallback(async () => {
    setLoader(true);
    try {
      const response = await axios.get("https://randomuser.me/api/");
      if (response.data) {
        const user = response.data.results[0];
        const userData = {
          fullName: user.name.title + ' ' + user.name.first + ' ' + user.name.last,
          email: user.email
        };
        
        const userDataString = JSON.stringify(userData);
        localStorage.setItem("userData", userDataString);
        setUserDetails(userData)
      }
    } catch (error) {
      console.log(error, "error");
    }
    setLoader(false);
  }, []);

  useEffect(() => {
    getUserDetails();
  }, []);

  return (
    <div className="App">
      <div className="title">User Details</div>
      { loader ?   
        <div className="circular-progress">
          <CircularProgress />
        </div>
        : 
        <div className="App-header">
          <div className="userfields">
            <div>Name:</div>
            <div>{userDetails.fullName}</div>
          </div>
          <div className="userfields">
            <div>Email:</div>
            <div>{userDetails.email}</div>
          </div>
        </div>
      }
      <Button variant="contained" onClick={getUserDetails}>Refresh</Button>
    </div>
  );
};

export default App;
