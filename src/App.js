import React, { Suspense } from "react";
import "./App.css";

import {
  Switch,
  BrowserRouter as Router,
  Route,
  Redirect,
} from "react-router-dom";

const Login = React.lazy(() =>
  import("./Components/Authentication/Login/Login")
);
const SignUp = React.lazy(() =>
  import("./Components/Authentication/Signup/SignUp")
);

const HomePage = React.lazy(() => import("./Components/HomePage/Home"));

const ForgotPassword = React.lazy(() =>
  import("./Components/Authentication/ForgotPassword/ForgotPassword")
);

function App() {
  return (
    <React.Fragment>
      <Router>
        <Suspense fallback={<div>Loader Component</div>}>
          <Switch>
            <Route component={Login} path="/" exact />
            <Route component={ForgotPassword} path="/forgot-password" exact />
            <Route component={SignUp} path="/sign-up" />
            <Route component={HomePage} path="/home-page" />
            <Redirect to="/" />
          </Switch>
        </Suspense>
      </Router>
    </React.Fragment>
  );
}

export default App;
