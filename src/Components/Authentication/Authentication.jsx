import { Link, Switch, Route, useRouteMatch } from "react-router-dom";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import "../../Styles/forms.scss";

function Authentication(props) {
  const { path, url } = useRouteMatch();

  return (
    <div>
      <Switch>
        <Route exact path={`${path}/signIn`}>
          <SignIn></SignIn>
        </Route>
        <Route exact path={`${path}/signUp`}>
          <SignUp></SignUp>
        </Route>
      </Switch>
      <div className="links">
        <Link className="" to={`${url}/signIn`}>
          Sign In
        </Link>
        <Link to={`${url}/signUp`}>Sign Up</Link>
      </div>
    </div>
  );
}

export default Authentication;
