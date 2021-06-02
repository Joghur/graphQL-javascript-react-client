import { auth } from '../utils/firebase';

export function signup(email, password) {
  return auth().createUserWithEmailAndPassword(email, password);
}

export function signin(email, password) {
  return auth().signInWithEmailAndPassword(email, password);
}

export function logout() {
  return auth().signOut();
}

export const loginFacebook = () => {
  return handleLogin(new auth.FacebookAuthProvider());
};

export const loginGoogle = () => {
  return handleLogin(new auth.GoogleAuthProvider());
};

const handleLogin = async provider => {
  const result = await auth().signInWithPopup(provider);
  // The signed-in user info.
  const user = result.user;
  return user;
};
