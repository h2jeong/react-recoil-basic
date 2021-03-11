import React from "react";
import { Link, useHistory } from "react-router-dom";
import { useRecoilState, useSetRecoilState } from "recoil";
import { commonNotification } from "../../store/notifications";
import { logoutSet } from "../../store/queries";
import { userAuthState } from "../../store/users";

const Header = () => {
  const [auth, setAuth] = useRecoilState(userAuthState);
  const setNotification = useSetRecoilState(commonNotification);
  let history = useHistory();

  const onLogout = () => {
      setAuth({
          isAuthenticated: false,
          user: null
      })

      setNotification({
          message: 'Logged out successfully.',
          isVisible: true
      })

      logoutSet();

      history.push('/login')
  };

  return (
    <header>
      <ul>
        <li>
          <Link to="/">HOME</Link>
        </li>
        <li>
          <Link to="/about">ABOUT</Link>
        </li>
        {auth.isAuthenticated ? (
          <>
            <li>
              <Link to="/dashboard">DASHBOARD</Link>
            </li>
            <li>
              <Link to="/list">NOTES</Link>
            </li>
            <li>
              <button onClick={onLogout}>Logout</button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/register">REGISGER</Link>
            </li>
            <li>
              <Link to="/login">LOGIN</Link>
            </li>
          </>
        )}
      </ul>
    </header>
  );
};

export default Header;
