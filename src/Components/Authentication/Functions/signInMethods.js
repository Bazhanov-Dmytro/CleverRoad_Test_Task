import { app, provider } from "../../../firebase";

export async function signInWithGoogle() {
  app
    .auth()
    .signInWithPopup(provider)
    .catch((error) => {
      console.log(error);
    });
}

export async function createWithEmailAndPassword(email, password) {
  try {
    await app.auth().createUserWithEmailAndPassword(email, password);
  } catch (e) {
    console.log(e.code);
    console.log(e.message);
  }
}

export async function signInWithEmailAndPassword(email, password) {
  try {
    await app.auth().signInWithEmailAndPassword(email, password);
    return 1;
  } catch (e) {
    console.log(e.code);
    console.log(e.message);
    return -1;
  }
}
