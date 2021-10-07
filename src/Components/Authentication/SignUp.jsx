import {
  signInWithGoogle,
  createWithEmailAndPassword,
} from "./Functions/signInMethods";
import { useHistory } from "react-router-dom";
import { useState } from "react";

function SignUp(props) {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [pass1, setPass1] = useState("");
  const [pass2, setPass2] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (pass1 === pass2 && email.includes("@")) {
      await createWithEmailAndPassword(email, pass1);
      history.push("/products");
    } else {
      console.log("Invalid date in input fields.");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <h1>Sign Up</h1>
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
          value={pass1}
          onChange={(e) => setPass1(e.target.value)}
        />
        <input
          id="password2"
          type="password"
          placeholder="confirm password"
          value={pass2}
          onChange={(e) => setPass2(e.target.value)}
        />
        <input type="submit" />
        <button
          className="createButton socialMediaButton"
          onClick={(e) => {
            e.preventDefault();
            signInWithGoogle().then((r) => history.push("/products"));
          }}
        >
          Google Sign In
        </button>
      </form>
    </>
  );
}

export default SignUp;
