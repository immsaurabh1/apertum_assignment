import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { Switch, Route, Link, useHistory } from "react-router-dom"
import NavComponent from './components/Layout/NavComponent'
import SignInComponent from './components/Route/SignInComponent'
import UserListComponent from './components/Route/UserListComponent'
import { withCookies, Cookies } from 'react-cookie';

function App(props) {
  const history = useHistory();
  const [authDataLoaded, setAuthDataLoaded] = useState(false)
  const [token, setToken] = useState("")
  const getCurrentUserAuth = async () => {
    const { cookies } = props;
    const userData = cookies && cookies.get("apertum-logged-in")
    if (userData) {
      setToken(userData)
      setAuthDataLoaded(true);
      history.push("/users/list")
    }
    else {
      setAuthDataLoaded(true);
      history.push("/login")
    }





  }
  useEffect(() => {
    getCurrentUserAuth()
  }, [])
  return (
    <div className="App">
      <Route
        path={["*"]}
        render={(renderProps) => (
          <header className="App-header">
            <NavComponent />
          </header>
        )}
      />

      <div className="App-body">
        {authDataLoaded ? <Switch>
          <Route
            exact
            path={["/login"]}
            render={renderProps => (
              <SignInComponent />
            )}
          />
          <Route
            exact
            path={["/users/list"]}
            render={renderProps => (
              <UserListComponent {...renderProps} token={token} />
            )}
          />
          {/* <Route
            exact
            path={["/rules/edit"]}
            render={renderProps => (
              <AddRuleComponent {...renderProps} />
            )}
          /> */}
        </Switch> : null}

      </div>
    </div>
  );
}

export default withCookies(App);
