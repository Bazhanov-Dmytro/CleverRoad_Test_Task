import {
  signInWithGoogle,
  signInWithEmailAndPassword,
} from "./Functions/signInMethods";
import { useHistory } from "react-router-dom";
import { useState } from "react";

function SignIn(props) {
  const history = useHistory();

  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await signInWithEmailAndPassword(email, pass);
    if (response === 1) history.push("/products");
    else {
      alert("Wrong credentials provided.");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1>Sign In</h1>
        <input
          id="email"
          type="email"
          value={email}
          placeholder="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          id="password1"
          type="password"
          placeholder="password"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
        />
        <input type="submit" />
        <button
          className="createButton socialMediaButton"
          onClick={() =>
            signInWithGoogle().then((r) => history.push("/products"))
          }
        >
          Google Sign In
        </button>
      </form>
    </div>
  );
}

export default SignIn;
