import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from './context/AuthProvider';
import classes from './styles/Account.module.css';

const Account = () => {
  const { currentUser, logOut } = useContext(AuthContext);

  return (
    <div className={classes.account}>
      {
        currentUser ?
          (
            <>
              <span className="material-icons-outlined" title="Account">
                account_circle
              </span>
              <span>{currentUser.displayName}</span>
              <span onClick={logOut} className="material-icons-outlined" title="Logout"> logout </span>
            </>
          )
          :
          (
            <>
              <Link to='/signup'>Signup</Link>
              <Link to='/login'>Login</Link>
            </>
          )
      }
    </div>
  );
};

export default Account;