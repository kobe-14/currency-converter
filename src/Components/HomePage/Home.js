import React, { useEffect, useState, Suspense } from "react";
import {
  Switch,
  BrowserRouter as Router,
  Route,
  Redirect,
  NavLink,
} from "react-router-dom";

import "../CurrencyConverter/CurrencyConverter.css";

import { Dropdown, Icon } from "semantic-ui-react";
import { useHistory } from "react-router-dom";
import "./Home.css";

const CurrencyConverter = React.lazy(() =>
  import("../CurrencyConverter/CurrencyConverter")
);
const ExchangeRates = React.lazy(() => import("../HomePage/ExchangeRates"));

const Home = () => {
  const history = useHistory();

  //--------------------------State Variables-----------------------------
  const [user, setUser] = useState("");

  //--------------------------Side Effects--------------------------------
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      return history.replace("/");
    } else {
      setUser(user);
    }
  }, []);

  //--------------------------Handlers---------------------------------------
  /**
   * @description Logout Handler
   */
  const logout = () => {
    localStorage.removeItem("user");
    history.replace("/");
  };

  //----------------------------------JSX---------------------------------------------
  return (
    <React.Fragment>
      <Router>
        <div className="nav-header">
          <div className="logo">LOGO</div>
          <div className="user-info">
            <NavLink
              style={{ color: "#fff", marginRight: "2rem" }}
              to="/home-page"
              activeClassName="active-route"
            >
              Exchange Rates
            </NavLink>
            <Icon name="user" />
            <Dropdown text={user} pointing="top right">
              <Dropdown.Menu>
                <Dropdown.Item
                  onClick={logout}
                  icon="sign-out"
                  text="Log Out"
                />
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
        <Suspense fallback={<div>Loader Component</div>}>
          <Switch>
            <Route component={ExchangeRates} path="/home-page" exact />
            <Route
              component={CurrencyConverter}
              path="/home-page/currency-converter/:base"
            />
            <Redirect to="/home-page" />
          </Switch>
        </Suspense>
      </Router>
    </React.Fragment>
  );
};

export default Home;
