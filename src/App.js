import { app } from "./firebase";
import { Route, Switch, useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import Products from "./Components/ProductList/Products.jsx";
import Authentication from "./Components/Authentication/Authentication.jsx";
import "./Styles/app.scss";
import { setEmail } from "./Redux/userSlice";
import { useDispatch, useSelector } from "react-redux";

function App() {
  let history = useHistory();
  const user = useSelector((state) => state.user.email);
  const [link, setLink] = useState(); // signIn or signOut button

  const dispatch = useDispatch();
  useEffect(() => {
    const signOut = async () => {
      app.auth().signOut();
      dispatch(setEmail(null));
    };

    app.auth().onAuthStateChanged((user) => {
      if (!user && !history.location.pathname.includes("/authentication")) {
        history.push("/authentication");
      }
      if (user !== null) {
        dispatch(setEmail(user.email));
        setLink(<button onClick={signOut}>SingOut</button>);
      } else {
        dispatch(setEmail(""));
        setLink("");
      }
    });
  }, [dispatch, history, user]);
  return (
    <div className="App">
      <header>
        {user}
        {link}
      </header>
      <Switch>
        <Route path="/authentication">
          <Authentication />
        </Route>
        <Route path="/products">
          <Products />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
